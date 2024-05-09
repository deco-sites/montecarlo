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

  const eventItem = mapProductToAnalyticsItem({
    product,
  });

  return (
    <div id={id} class="w-full py-8 flex flex-col lg:grid grid-cols-[15%_auto_auto_346px] justify-items-end grid-rows-1 mx-auto gap-4 lg:gap-8 max-w-[1408px]">
      <div class="flex flex-col gap-6 lg:flex-row lg:justify-center col-span-3 row-end-1">
        <ImageGallerySlider
          page={page}
        />
      </div>
      <ProductInfo
        page={page}
        extraInformations={extraInformations}
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
