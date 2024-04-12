import { ProductDetailsPage } from "apps/commerce/types.ts";
import ImageGallerySlider from "../../components/product/Gallery/ImageSlider.tsx";
import ProductInfo from "../../components/product/ProductInfo.tsx";
import NotFound from "../../sections/Product/NotFound.tsx";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
}

export default function ProductDetails({ page }: Props) {
  if (!page?.seo) {
    return <NotFound />;
  }

  return (
    <div class="w-full py-8 flex flex-col lg:grid grid-cols-[auto_auto_auto_336px] grid-rows-1 mx-auto gap-8 container">
      <div class="flex flex-col gap-6 lg:flex-row lg:justify-center col-span-3 row-end-1">
        <ImageGallerySlider
          page={page}
        />
      </div>
      <div class="col-start-4 row-span-2">
        <ProductInfo
          page={page}
        />
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
