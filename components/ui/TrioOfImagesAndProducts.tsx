import Icon from "../../components/ui/Icon.tsx";
import Slider from "../../components/ui/Slider.tsx";
import SliderJS from "../../islands/SliderJS.tsx";
import { useId } from "../../sdk/useId.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { Product } from "apps/commerce/types.ts";
import ProductCardInline from "../product/ProductCardInline.tsx";

/**
 * @titleBy title
 */
interface CardImage {
  title?: string;
  /**
   * @format area
   */
  description?: string;
  imageMobile: ImageWidget;
  imageDesktop: ImageWidget;
  products: Product[] | null;
  alt?: string;
  button?: string;
  href?: string;
  preload?: boolean;
}

export interface Props {
  title?: string;
  /**
   * @title Sub Title
   * @format html
   */
  subTitle?: string;
  /**
   * @description max 3 cards
   */
  cards: CardImage[];
  arrowsMobile: boolean;
}

function Buttons() {
  return (
    <>
      <div class="flex items-center justify-center z-10 col-start-1 row-start-2 lg:hidden">
        <Slider.PrevButton class="bg-transparent">
          <Icon
            class="text-base-100"
            size={40}
            id="arrowLeft"
            strokeWidth={1}
          />
        </Slider.PrevButton>
      </div>
      <div class="flex items-center justify-center z-10 col-start-3 row-start-2 lg:hidden">
        <Slider.NextButton class="bg-transparent">
          <Icon
            class="text-base-100"
            size={40}
            id="arrowRight"
            strokeWidth={1}
          />
        </Slider.NextButton>
      </div>
    </>
  );
}

function Card({ image }: { image: CardImage }) {
  const {
    imageMobile,
    imageDesktop,
    title,
    description,
    button,
    alt,
    href,
    preload,
    products,
  } = image;

  return (
    <div class="w-full flex flex-col px-2 lg:p-0 items-center gap-4 group ">
      <div class="relative flex justify-center items-center w-full h-full">
        <Picture preload={preload} class="w-full h-full">
          <Source
            media="(max-width: 767px)"
            fetchPriority={preload ? "high" : "auto"}
            src={imageMobile}
            width={334}
            height={460}
          />
          <Source
            media="(min-width: 768px)"
            fetchPriority={preload ? "high" : "auto"}
            src={imageDesktop}
            width={464}
            height={568}
          />
          <img
            class="object-cover w-full h-full"
            loading={preload ? "eager" : "lazy"}
            src={imageMobile}
            width={334}
            height={460}
            alt={alt}
          />
        </Picture>
        <div class="group-hover:flex hidden absolute top-0 left-0 w-full h-full bg-[#F5F3E7] opacity-95">
          <div class="flex flex-col px-6 xl:px-14 pt-14 pb-32 max-w-full">
            <div class="flex flex-col overflow-y-scroll gap-3 customScrollVertical">
              {products?.map((product) => (
                <ProductCardInline product={product} />
              ))}
            </div>
          </div>
        </div>
        {button && (
          <a
            class="absolute bottom-9 py-4 px-6 bg-primary text-black"
            href={href || ""}
          >
            {button}
          </a>
        )}
      </div>
      <div class="flex flex-col gap-1">
        {title && (
          <h4 class="text-center font-medium text-lg text-black lg:text-xl">
            {title}
          </h4>
        )}
        {description && (
          <p class="text-center text-sm max-w-[240px] lg:max-w-full text-black">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

export default function TrioOfImagesAndProducts(
  { title, subTitle, cards, arrowsMobile }: Props,
) {
  const id = useId();

  return (
    <div class="flex w-full flex-col py-8 items-center lg:py-8">
      <div class="flex flex-col w-full gap-1">
        {title && <h3 class=" font-semibold text-xl lg:text-3xl">{title}</h3>}
        {subTitle && (
          <p class=" font-medium  text-sm lg:text-base">{subTitle}</p>
        )}
      </div>
      <div
        id={id}
        class="grid grid-cols-[48px_1fr_48px] lg:grid-cols-[120px_1fr_120px] grid-rows-[1fr_48px_1fr_64px] h-auto max-w-[1408px]"
      >
        <Slider class="carousel carousel-center w-full col-span-full row-span-full gap-2 lg:justify-center">
          {cards?.map((image, index) => {
            return (
              <Slider.Item
                index={index}
                class="carousel-item w-full lg:w-[calc(33.3333%-0.5rem)]"
              >
                <Card
                  image={image}
                />
              </Slider.Item>
            );
          })}
        </Slider>

        {arrowsMobile && <Buttons />}

        <SliderJS rootId={id} infinite />
      </div>
    </div>
  );
}
