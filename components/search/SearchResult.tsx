import { SendEventOnView } from "../../components/Analytics.tsx";
import { Layout as CardLayout } from "../../components/product/ProductCard.tsx";

import Filters from "../../components/search/Filters.tsx";
import Icon from "../../components/ui/Icon.tsx";
import SearchControls from "../../components/search/Controls.tsx";
import { useId } from "../../sdk/useId.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import type { ProductListingPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductGallery, { Columns } from "../product/ProductGallery.tsx";
import { Section } from "deco/mod.ts";
import { use } from "https://esm.sh/marked@9.1.1";
import { useSection } from "deco/hooks/useSection.ts";

export type Format = "Show More" | "Pagination";

export interface Layout {
  /**
   * @description Use drawer for mobile like behavior on desktop. Aside for rendering the filters alongside the products
   */
  variant?: "aside" | "horizontal";
  /**
   * @description Number of products per line on grid
   */
  columns?: Columns;
  /**
   * @description Format of the pagination
   */
  format?: Format;
}

export interface Props {
  title?: string;
  /** Defines static values for Range Price Filter */
  rangePrice?: {
    /** @default 1 */ 
    minPrice?: number,
    /** @default 500000 */ 
    maxPrice?: number,
  },
  page: ProductListingPage | null;
  layout?: Layout;
  cardLayout?: CardLayout;

  /** @description 0 for ?page=0 as your first page */
  startingPage?: 0 | 1;

  sections?: Section[];
}

function NotFound() {
  return (
    <div class="w-full flex justify-center items-center py-10">
      <span>Not Found!</span>
    </div>
  );
}

function Result({
  page,
  layout,
  cardLayout,
  startingPage = 0,
  url: _url,
  title,
  rangePrice
}: Omit<Props, "page"> & {
  page: ProductListingPage;
  url: string;
}) {
  const { products, filters, breadcrumb, pageInfo, sortOptions } = page;
  const perPage = pageInfo?.recordPerPage || products.length;
  const url = new URL(_url);

  const { format = "Show More" } = layout ?? {};

  const id = useId();

  const zeroIndexedOffsetPage = pageInfo.currentPage - startingPage;
  const offset = zeroIndexedOffsetPage * perPage;

  const isPartial = url.searchParams.get("partial") === "true";
  const isFirstPage = !pageInfo.previousPage;

  let minPrice = rangePrice?.minPrice || 1;
  let maxPrice = rangePrice?.maxPrice || 500000;

  !rangePrice?.minPrice && !rangePrice?.maxPrice && products.forEach((product) => {
    product?.offers?.offers.forEach((offer) => {
      const price = offer.price;

      if (price < minPrice) {
        minPrice = price;
      }
      if (price > maxPrice) {
        maxPrice = price;
      }
    });
  });

  products.length > 1
    ? (
      filters.push({
        "@type": "FilterRange",
        key: "price",
        label: "Faixa de Preço",
        values: {
          min: minPrice,
          max: maxPrice,
        },
      })
    )
    : null;

  return (
    <div
      id="resultTeste"
      class="relative w-full h-full"
    >
      <div
        class={`lg:container xl:max-w-[1512px] m-auto px-4 md:px-10 lg:px-14 ${
          isFirstPage ? "py-10" : "pt-0"
        } ${pageInfo?.nextPage ? "pb-0" : ""}`}
      >
        {(isFirstPage || !isPartial) && (
          <SearchControls
            sortOptions={products?.length > 1 ? sortOptions : []}
            filters={filters}
            breadcrumb={breadcrumb}
            // displayFilter={layout?.variant === "drawer"}
            layout={layout?.variant}
            title={title}
            url={url.href}
            columns={layout?.columns?.mobile || 2}
          />
        )}

        <div class="flex flex-row">
          {/* {filters.length > 0 && */}
          {layout?.variant === "aside" && filters.length > 0 &&
            (isFirstPage || !isPartial) && (
            <aside class="hidden md:block w-min min-w-[250px] max-w-[300px] pr-4 pb-6">
              <ul class={`flex flex-col gap-6 pt-4 md:pl-0`}>
                <Filters
                  filters={filters}
                  layout={layout.variant}
                  url={url.href}
                />
              </ul>
            </aside>
          )}
          <div
            class={`flex-grow  relative  bg-white`}
            id={id}
          >
            <ProductGallery
              products={products}
              offset={offset}
              layout={{ card: cardLayout, columns: layout?.columns, format }}
              // layout={{ card: cardLayout, columns: {mobile: 2, desktop: 3}, format }}
              pageInfo={pageInfo}
              url={url}
            />

            { 
              products.length == 0 && (
                <div class="sm:flex items-start  gap-8 justify-between max-w-[770px] mx-auto">
                  <div class="sm:max-w-[330px]">
                    <p class="text-[#333435] text-4xl font-light mt-6 sm:mt-0 mb-3">{'Desculpe!'}</p>
                    <p class="text-base sm:text-lg text-[#8c8d8e] font-normal mb-1">{'Não encontramos o que você está buscando.'}</p>

                    <a class="w-full sm:max-w-[302px] h-14 bg-[#333435] hover:bg-[#686969] text-white flex items-center justify-center text-base font-bold cursor-pointer mt-4 mb-6" href="/">{'Voltar'}</a>
                  </div>

                  <div class="sm:max-w-[330px]">
                    <p class="text-base sm:text-lg text-[#8c8d8e] font-normal mb-1 leading-8 sm:leading-9">{'Verifique os termos digitados'}<br></br>{'Tente utilizar uma única palavra'}<br></br>{'Utilize termos genéricos na busca'}<br></br>{'Procure utilizar sinônimos ao termo desejado.'}</p>
                  </div>
                </div>
              )
            }
          </div>
        </div>

        {format == "Pagination" && (
          <div class="flex justify-center my-4">
            <div class="join">
              <a
                aria-label="previous page link"
                rel="prev"
                href={pageInfo.previousPage ?? "#"}
                class="btn btn-ghost join-item"
              >
                <Icon id="ChevronLeft" size={24} strokeWidth={2} />
              </a>
              <span class="btn btn-ghost join-item">
                Page {zeroIndexedOffsetPage + 1}
              </span>
              <a
                aria-label="next page link"
                rel="next"
                href={pageInfo.nextPage ?? "#"}
                class="btn btn-ghost join-item"
              >
                <Icon id="ChevronRight" size={24} strokeWidth={2} />
              </a>
            </div>
          </div>
        )}
        <div
          id="spinner"
          class="htmx-indicator w-full min-h-screen flex justify-center items-center absolute top-0 bottom-0 left-0 right-0 bg-[#0000003d]"
        >
          <span
            id="loading-searchResult"
            class="loading loading-spinner loading-lg"
          >
          </span>
        </div>
      </div>
      <SendEventOnView
        id={id}
        event={{
          name: "view_item_list",
          params: {
            // TODO: get category name from search or cms setting
            item_list_name: breadcrumb.itemListElement?.at(-1)?.name,
            item_list_id: breadcrumb.itemListElement?.at(-1)?.item,
            items: page.products?.map((product, index) =>
              mapProductToAnalyticsItem({
                ...(useOffer(product.offers)),
                index: offset + index,
                product,
                breadcrumbList: page.breadcrumb,
              })
            ),
          },
        }}
      />
    </div>
  );
}

function SearchResult(
  { page, ...props }: ReturnType<typeof loader>,
) {
  if (!page) {
    return <NotFound />;
  }

  return (
    <>
      <Result {...props} page={page} />
    </>
  );
}

export const loader = (props: Props, req: Request) => {
  return {
    ...props,
    url: req.url,
  };
};

export default SearchResult;
