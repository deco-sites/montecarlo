import { ProductDetailsPage } from "apps/commerce/types.ts";
import ImageGallerySlider from "../../components/product/Gallery/ImageSlider.tsx";
import ProductInfo, {
  ExtraInformation,
} from "../../components/product/ProductInfo.tsx";
import NotFound from "../../sections/Product/NotFound.tsx";
import { useId } from "../../sdk/useId.ts";
import {
  SendEventOnClick,
  SendEventOnView,
} from "../../components/Analytics.tsx";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Breadcrumb from "deco-sites/montecarlo/components/ui/Breadcrumb.tsx";
import { useDevice } from "deco/hooks/useDevice.ts";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
  extraInformations: ExtraInformation;
}

export default function ProductDetails({ page, extraInformations }: Props) {
  if (!page?.seo) {
    return <NotFound />;
  }

  const { breadcrumbList, product } = page;
  const id = useId();
  const breadcrumb = {
    ...breadcrumbList,
    itemListElement: breadcrumbList?.itemListElement.slice(0, -1),
    numberOfItems: breadcrumbList.numberOfItems - 1,
  };

  const eventItem = mapProductToAnalyticsItem({
    product,
  });

  const device = useDevice();
  const isMobileSection = device != "desktop";

  return (
    <div class=" w-full h-full relative">
      <div
        id={id}
        class="w-full pt-3 pb-8 flex flex-col lg:grid grid-cols-[15%_auto_auto_346px] justify-items-end grid-rows-1 mx-auto gap-4 lg:gap-8 max-w-[1512px] lg:px-14 lg:pt-8 lg:border-t-perola-intermediario lg:border-t"
      >
        <Breadcrumb
          itemListElement={breadcrumb.itemListElement}
          class="flex lg:hidden px-2"
        />

        <div class="flex flex-col gap-6 lg:flex-row lg:justify-center col-span-3 row-end-1">
          <ImageGallerySlider
            page={page}
            isMobile={isMobileSection}
          />
        </div>
        <ProductInfo
          page={page}
          extraInformations={extraInformations}
          isMobile={isMobileSection}
        />
        <SendEventOnView
          id={id}
          event={{
            name: "view_item",
            params: {
              currency: "BRL",
              value: product.offers?.highPrice,
              items: [eventItem],
            },
          }}
        />
      </div>
      <div
        id="spinner-pdp"
        class="htmx-indicator w-full min-h-screen flex justify-center items-center absolute top-0 bottom-0 left-0 right-0 bg-[#0000003d]"
      >
        <span
          id="loading-searchResult"
          class="loading loading-spinner loading-lg"
        >
        </span>
      </div>
    </div>
  );
}

export function LoadingFallback() {
  return (
    <div
      style={{ height: "710px" }}
      class="w-full flex justify-center items-center"
    >
      <span class="loading loading-spinner" />
    </div>
  );
}
