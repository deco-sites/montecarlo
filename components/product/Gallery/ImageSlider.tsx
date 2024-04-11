import { ProductDetailsPage } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "../../../components/ui/Icon.tsx";
import Slider from "../../../components/ui/Slider.tsx";
import ProductImageZoom from "../../../islands/ProductImageZoom.tsx";
import SliderDotsJS from "../../../islands/SliderDotsJS.tsx";
import { useId } from "../../../sdk/useId.ts";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;

  layout?: {
    width: number;
    height: number;
  };
}

/**
 * @title Product Image Slider
 * @description Creates a three columned grid on destkop, one for the dots preview, one for the image slider and the other for product info
 * On mobile, there's one single column with 3 rows. Note that the orders are different from desktop to mobile, that's why
 * we rearrange each cell with col-start- directives
 */
export default function GallerySlider(props: Props) {
  const id = useId();

  if (!props.page) {
    throw new Error("Missing Product Details Page Info");
  }

  const {
    page: { product: { image: images = [] } },
    layout,
  } = props;

  const { width, height } = layout || { width: 300, height: 300 };

  const aspectRatio = `${width} / ${height}`;

  return (
    <div
      id={id}
      class={`grid grid-flow-row sm:grid-flow-col grid-cols-4 grid-rows-3 gap-1 h-[99%] `}
    >
      {/* Image Slider */}
      <div class="relative order-1 sm:order-2 col-span-4 row-span-4">
        <Slider class="carousel carousel-center w-full gap-8">
          {images.map((img, index) => (
            <Slider.Item
              index={index}
              class="carousel-item w-full"
            >
              <Image
                class="w-full"
                sizes="(max-width: 640px) 100vw, 40vw"
                style={{ aspectRatio }}
                src={img.url!}
                alt={img.alternateName}
                width={width}
                height={height}
                // Preload LCP image for better web vitals
                preload={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
              />
            </Slider.Item>
          ))}
        </Slider>

        <Slider.PrevButton
          class="no-animation absolute left-2 top-1/2 btn border-none btn-outline hover:bg-transparent"
          disabled
        >
          <Icon
            class="text-black"
            size={40}
            id="arrowLeft"
            strokeWidth={1}
          />
        </Slider.PrevButton>

        <Slider.NextButton
          class="no-animation absolute right-2 top-1/2 btn border-none btn-outline hover:bg-transparent"
          disabled={images.length < 2}
        >
          <Icon
            class="text-black"
            size={40}
            id="arrowRight"
            strokeWidth={1}
          />
        </Slider.NextButton>
        <ul class="carousel justify-center col-span-full gap-3 lg:gap-5 z-10 row-start-4 absolute left-0 right-0 bottom-0 mx-auto top-auto">
          {images?.map((_, index) => (
            <li class="carousel-item">
              <Slider.DotLine index={index}>
                <div class="py-5">
                  <div class=" w-8 h-1 group-disabled:bg-primary bg-white" />
                </div>
              </Slider.DotLine>
            </li>
          ))}
        </ul>
      </div>

      {/* Dots */}
      <div class="order-2 sm:order-1 row-span-3 col-start-1 col-end-1 w-full relative h-full">
        <ul
          class="carousel carousel-center px-4 sm:px-0 sm:flex-col  gap-1 snap-y absolute top-0 left-0 right-0 bottom-0"
          data-slider-dots
        >
          {images.map((img, index) => (
            <li class="carousel-item w-full snap-start">
              <Slider.Dot index={index}>
                <Image
                  style={{ aspectRatio }}
                  class="group-disabled:border-black border rounded w-full"
                  width={100}
                  height={100}
                  src={img.url!}
                  alt={img.alternateName}
                />
              </Slider.Dot>
            </li>
          ))}
        </ul>
      </div>
      <SliderDotsJS rootId={id} />
    </div>
  );
}
