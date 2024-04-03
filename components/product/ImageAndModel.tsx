import Icon from "../../components/ui/Icon.tsx";
import Slider from "../../components/ui/Slider.tsx";
import SliderJS from "../../islands/SliderJS.tsx";
import { useId } from "../../sdk/useId.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";

/**
 * @titleBy altProduct
 */
interface CardImage {
  title?: string;
  /**
   * @format area
   */
  description?: string;
  imageProductMobile: ImageWidget;
  imageProductDesktop: ImageWidget;
  altProduct?: string;
  imageModelMobile: ImageWidget;
  imageModelDesktop: ImageWidget;
  altModel?: string;
  button?: string;
  href: string;
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
}

function Card({ image }: { image: CardImage }) {
  const {
    imageProductMobile,
    imageProductDesktop,
    altModel,
    imageModelMobile,
    imageModelDesktop,
    altProduct,
    title,
    description,
    button,
    href,
    preload,
  } = image;

  return (
    <div class="w-full flex flex-col px-2 lg:p-0 items-center gap-4 lg:w-[calc(33.33%-0.5rem)]">
      <div class="relative flex justify-center items-center w-full h-full ">
        <div class="flex w-full h-full flex-row lg:flex-col">
          <Picture preload={preload} class="w-2/4 lg:w-full h-full">
            <Source
              media="(max-width: 767px)"
              fetchPriority={preload ? "high" : "auto"}
              src={imageProductMobile}
              width={167}
              height={167}
            />
            <Source
              media="(min-width: 768px)"
              fetchPriority={preload ? "high" : "auto"}
              src={imageProductDesktop}
              width={464}
              height={310}
            />
            <img
              class="object-cover w-full h-full"
              loading={preload ? "eager" : "lazy"}
              src={imageProductMobile}
              width={334}
              height={460}
              alt={altProduct}
            />
          </Picture>
          <Picture preload={preload} class="w-2/4 lg:w-full h-full">
            <Source
              media="(max-width: 767px)"
              fetchPriority={preload ? "high" : "auto"}
              src={imageModelMobile}
              width={167}
              height={167}
            />
            <Source
              media="(min-width: 768px)"
              fetchPriority={preload ? "high" : "auto"}
              src={imageModelDesktop}
              width={464}
              height={310}
            />
            <img
              class="object-cover w-full h-full"
              loading={preload ? "eager" : "lazy"}
              src={imageModelMobile}
              width={334}
              height={460}
              alt={altModel}
            />
          </Picture>
        </div>
        {button && (
          <a
            class="absolute bottom-9 py-4 px-6 bg-primary text-black hidden lg:flex"
            href={href}
          >
            {button}
          </a>
        )}
      </div>
      {(title || description) &&
        (
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
        )}
    </div>
  );
}

export default function TrioOfImages(
  { title, subTitle, cards }: Props,
) {
  return (
    <div class="flex w-full flex-col py-8 items-center lg:py-8 gap-5 lg:gap-10">
      <div class="flex flex-col w-full gap-1 items-center">
        {title && <h2 class=" font-semibold text-xl lg:text-3xl">{title}</h2>}
        {subTitle && (
          <span
            dangerouslySetInnerHTML={{ __html: subTitle }}
            class=" font-medium  text-sm lg:text-base"
          >
          </span>
        )}
      </div>
      <div class="flex flex-col w-full h-full gap-2 lg:flex-row lg:justify-center max-w-[1408px]">
        {cards?.map((image, index) => (
          <Card
            image={image}
          />
        ))}
      </div>
    </div>
  );
}
