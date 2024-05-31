import { Head } from "$fresh/runtime.ts";
import { PageInfo, Product } from "apps/commerce/types.ts";
import { usePartialSection } from "deco/hooks/usePartialSection.ts";
import ShelfProductCard, {
  Layout as CardLayout,
} from "../../components/product/ShelfProductCard.tsx";
import { Format } from "../../components/search/SearchResult.tsx";
import Spinner from "../../components/ui/Spinner.tsx";
import ShowMore from "../../islands/ShowMore.tsx";
import { usePlatform } from "../../sdk/usePlatform.tsx";

export interface Columns {
  mobile?: 1 | 2;
  desktop?: 2 | 3 | 4 | 5;
}

export interface Props {
  products: Product[] | null;
  pageInfo: PageInfo;
  offset: number;
  layout?: {
    card?: CardLayout;
    columns?: Columns;
    format?: Format;
  };
  url: URL;
}

const MOBILE_COLUMNS = {
  1: "grid-cols-1",
  2: "grid-cols-2",
};

const DESKTOP_COLUMNS = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
  5: "sm:grid-cols-5",
};

function ProductGallery(
  { products, pageInfo, layout, offset, url }: Props,
) {
  const platform = usePlatform();
  const mobile = MOBILE_COLUMNS[layout?.columns?.mobile ?? 2];
  const desktop = DESKTOP_COLUMNS[layout?.columns?.desktop ?? 4];

  const nextPage = pageInfo.nextPage
    ? new URL(pageInfo.nextPage, url.href)
    : null;
  const partialUrl = nextPage ? new URL(nextPage.href) : null;
  if (pageInfo.nextPage && nextPage) {
    partialUrl?.searchParams.set("partial", "true");
  }

  return (
    <div
      class={`grid ${mobile} gap-4 items-center ${desktop}`}
    >
      {layout?.format == "Show More" && (
        <Head>
          {pageInfo.nextPage && <link rel="next" href={pageInfo.nextPage} />}
          {pageInfo.previousPage && (
            <link rel="prev" href={pageInfo.previousPage} />
          )}
        </Head>
      )}

      {products?.map((product, index) => (
        <ShelfProductCard
          key={`product-card-${product.productID}`}
          product={product}
          preload={index === 0}
          index={offset + index}
          layout={layout?.card}
          platform={platform}
        />
      ))}

      {(layout && layout?.format === "Show More") && (
        <>
          <ShowMore
            pageInfo={pageInfo}
          >
            {partialUrl && (
              <div class="hover:opacity-80">
                <div class="mt-2">
                  <Spinner size={24} />
                </div>
                <button
                  id={`show-more-button-${pageInfo.currentPage}`}
                  class="btn cursor-pointer hidden w-0 h-0 absolute font-poppins text-sm bg-[#FFC72C] font-normal rounded-none hover:bg-[#FFC72C]"
                  {...usePartialSection({
                    href: partialUrl.href,
                    mode: "append",
                  })}
                >
                  Carregar mais Produtos
                </button>
              </div>
            )}
          </ShowMore>
        </>
      )}
    </div>
  );
}

export default ProductGallery;
