import {
  SendEventOnClick,
  SendEventOnView,
} from "../../components/Analytics.tsx";
import Button from "../../components/ui/Button.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Slider from "../../components/ui/Slider.tsx";
import SliderJS from "../../islands/SliderJS.tsx";
import { useId } from "../../sdk/useId.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import Image from "apps/website/components/Image.tsx";
import { useUI } from "../../sdk/useUI.ts";

/**
 * @titleBy alt
 */
export interface Banner {
  primaryImage: ImageItem;
  secondImage?: ImageItem;
}

interface FontSize {
  /**
   * @format button-group
   * @options deco-sites/montecarlo/loaders/icons.ts
   */
  fontSize?: "Small" | "Normal" | "Large";
}

export interface ImageItem {
  /** @description desktop otimized image */
  desktop: ImageWidget;
  /** @description mobile otimized image */
  mobile: ImageWidget;
  /** @description Image's alt text */
  alt: string;
  action?: {
    /** @description when user clicks on the image, go to this link */
    href: string;
    /** @description Image text title */
    title: string;
    fontSize?: FontSize;
    /** @description Button label */
    label: string;
  };
}

export interface Props {
  images?: Banner[];
  /**
   * @description Check this option when this banner is the biggest image on the screen for image optimizations
   */
  preload?: boolean;
  /**
   * @title Show arrows
   * @description show arrows to navigate through the images
   */
  arrows?: boolean;
  /**
   * @title Show dots
   * @description show dots to navigate through the images
   */
  dots?: boolean;
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

const PROPS_FONT_SIZE = {
  "Small": "text-[1.5rem] lg:text-[2.5rem]",
  "Normal": "text-[2.5rem] lg:text-[3.8rem]",
  "Large": "text-[3.5rem] lg:text-[6.3rem]",
};

function Action(
  action: { title: string; label: string; href: string; fontSize?: FontSize },
) {
  console.log("action", action.fontSize?.fontSize);

  return (
    <div class="absolute bottom-0 left-0 right-0 sm:right-auto w-full items-center flex flex-col justify-end gap-4 px-8 py-20">
      <span
        class={`${
          PROPS_FONT_SIZE[action.fontSize?.fontSize || "Normal"]
        } font-light text-primary text-center`}
      >
        {action.title}
      </span>
      <Button
        class="bg-primary text-sm font-black py-4 px-6 w-fit hover:bg-primary border-none"
        aria-label={action.label}
      >
        {action.label}
      </Button>
    </div>
  );
}

function BannerItemMobile(
  { image, lcp, id }: { image: ImageItem; lcp?: boolean; id: string },
) {
  const {
    mobile,
    alt,
    action,
  } = image;

  return (
    <div class="flex flex-row w-full ">
      <a
        id={id}
        href={action?.href ?? "#"}
        aria-label={action?.label}
        class="relative overflow-y-hidden w-full"
      >
        {action &&
          <Action {...action} />}
        <Picture preload={lcp}>
          <Source
            media="(max-width: 767px)"
            fetchPriority={lcp ? "high" : "auto"}
            src={mobile}
            width={430}
            height={590}
          />
          <img
            class="object-cover w-full h-full"
            loading={lcp ? "eager" : "lazy"}
            src={mobile}
            alt={alt}
          />
        </Picture>
      </a>
    </div>
  );
}

function BannerItem(
  { image, lcp, id }: { image: Banner; lcp?: boolean; id: string },
) {
  const {
    primaryImage,
    secondImage,
  } = image;

  console.log("item", image);

  return (
    <div class="flex flex-row w-full">
      <a
        id={id}
        href={primaryImage.action?.href ?? "#"}
        aria-label={primaryImage.action?.label}
        class="relative overflow-y-hidden w-full"
      >
        {primaryImage.action && <Action {...primaryImage.action} />}
        <Picture preload={lcp}>
          <Source
            media="(max-width: 767px)"
            fetchPriority={lcp ? "high" : "auto"}
            src={primaryImage.mobile}
            width={430}
            height={590}
          />
          <Source
            media="(min-width: 768px)"
            fetchPriority={lcp ? "high" : "auto"}
            src={primaryImage.desktop}
            width={1440}
            height={600}
          />
          <img
            class="object-cover w-full h-full"
            loading={lcp ? "eager" : "lazy"}
            src={primaryImage.desktop}
            alt={primaryImage.alt}
          />
        </Picture>
      </a>
      {secondImage &&
        (
          <a
            id={id}
            href={secondImage.action?.href ?? "#"}
            aria-label={secondImage.action?.label}
            class="relative overflow-y-hidden w-full"
          >
            {secondImage.action && <Action {...secondImage.action} />}
            <Picture preload={lcp}>
              <Source
                media="(max-width: 767px)"
                fetchPriority={lcp ? "high" : "auto"}
                src={secondImage.mobile}
                width={430}
                height={590}
              />
              <Source
                media="(min-width: 768px)"
                fetchPriority={lcp ? "high" : "auto"}
                src={secondImage.desktop}
                width={1440}
                height={600}
              />
              <img
                class="object-cover w-full h-full"
                loading={lcp ? "eager" : "lazy"}
                src={secondImage.desktop}
                alt={secondImage.alt}
              />
            </Picture>
          </a>
        )}
    </div>
  );
}

function Dots(
  { images, interval = 0 }: {
    images: Banner[] | ImageItem[];
    interval?: number;
  },
) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @property --dot-progress {
            syntax: '<percentage>';
            inherits: false;
            initial-value: 0%;
          }
          `,
        }}
      />
      <ul class="carousel justify-center col-span-full gap-6 z-10 row-start-4">
        {images?.map((_, index) => (
          <li class="carousel-item">
            <Slider.Dot index={index}>
              <div class="py-5">
                <div
                  class="w-16 sm:w-20 h-0.5 rounded group-disabled:animate-progress bg-gradient-to-r from-primary from-[length:var(--dot-progress)] to-[rgba(255,255,255,0.4)] to-[length:var(--dot-progress)]"
                  style={{ animationDuration: `${interval}s` }}
                />
              </div>
            </Slider.Dot>
          </li>
        ))}
      </ul>
    </>
  );
}

function Buttons() {
  return (
    <>
      <div class="flex items-center justify-center z-10 col-start-1 row-start-2">
        <Slider.PrevButton class=" bg-transparent border-none hover:bg-transparent text-primary">
          <Icon
            class="text-primary"
            size={40}
            id="arrowLeft"
            strokeWidth={3}
          />
        </Slider.PrevButton>
      </div>
      <div class="flex items-center justify-center z-10 col-start-3 row-start-2">
        <Slider.NextButton class=" bg-transparent border-none hover:bg-transparent text-primary">
          <Icon
            class="text-primary"
            size={40}
            id="arrowRight"
            strokeWidth={3}
          />
        </Slider.NextButton>
      </div>
    </>
  );
}

function BannerCarousel(props: Props) {
  const id = useId();
  const { images, preload, interval } = props;
  const { isMobile } = useUI();

  if (!images || images.length === 0) {
    return null;
  }

  function arrayImagesMobile() {
    const array: Array<ImageItem> = [];
    images?.map((img) => {
      array.push(img.primaryImage);
      if (img.secondImage) {
        array.push(img.secondImage);
      }
    });
    return array;
  }

  const arrayImage = isMobile.value && arrayImagesMobile();

  console.log("array", arrayImage, images);

  return (
    <div
      id={id}
      class="grid h-[72vh] grid-cols-[48px_1fr_48px] sm:grid-cols-[60px_1fr_60px] grid-rows-[1fr_48px_1fr_64px] sm:min-h-min"
    >
      <Slider class="carousel carousel-center w-full col-span-full row-span-full gap-6">
        {isMobile.value && arrayImage
          ? arrayImage?.map((image, index) => (
            <Slider.Item index={index} class="carousel-item w-full ">
              <BannerItemMobile
                image={image}
                lcp={index === 0 && preload}
                id={`${id}::${index}`}
              />
            </Slider.Item>
          ))
          : images?.map((image, index) => (
            <Slider.Item index={index} class="carousel-item w-full ">
              <BannerItem
                image={image}
                lcp={index === 0 && preload}
                id={`${id}::${index}`}
              />
            </Slider.Item>
          ))}
      </Slider>

      {props.arrows && <Buttons />}

      {props.dots && <Dots images={arrayImage || images} interval={interval} />}

      <SliderJS rootId={id} interval={interval && interval * 1e3} infinite />
    </div>
  );
}

export default BannerCarousel;
