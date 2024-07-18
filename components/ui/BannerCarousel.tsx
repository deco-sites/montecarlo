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
import { useUI } from "../../sdk/useUI.ts";
import Image from "apps/website/components/Image.tsx";
import action from "apps/algolia/actions/setup.ts";

/**
 * @titleBy alt
 */
export interface Banner {
  banner: ImageItem[];
}

interface FontSize {
  /**
   * @format button-group
   * @options deco-sites/montecarlo/loaders/icons.ts
   */
  fontSize?: "Small" | "Normal" | "Large";
}

export interface ImageItem {
  /** @description desktop-optimized single image size 1263x493 or two 632x493 images or three 421x528 images*/
  desktop: ImageWidget;
  /** @description mobile otimized image 350×449 */
  mobile: ImageWidget;
  /** @description Image's alt text */
  alt: string;
  /** @description Action when user clicks on the image */
  promotion: string;
  /** @description DL action */
  action?: {
    /** @description when user clicks on the image, go to this link */
    href?: string;
    /** @description Image text title */
    title?: string;
    fontSize?: FontSize;
    /** @description Button label */
    label?: string;
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
  /**
   * @title Height Image
   */
  heightMobile?: number;
  heightDesktop?: number;
}

const PROPS_FONT_SIZE = {
  Small: "text-[1.5rem] lg:text-[2.5rem]",
  Normal: "text-[2.5rem] lg:text-[3.8rem]",
  Large: "text-[3.5rem] lg:text-[6.3rem]",
};

function Action(action: {
  title?: string;
  label?: string;
  href?: string;
  fontSize?: FontSize;
}) {
  return (
    <div class="absolute bottom-0 left-0 right-0 sm:right-auto w-full items-center flex flex-col justify-end gap-4 px-8 py-20">
      {action.title && (
        <span
          class={`${PROPS_FONT_SIZE[action.fontSize?.fontSize || "Normal"]
            } font-light text-primary text-center font-beausiteGrand`}
        >
          {action.title}
        </span>
      )}
      {action.label && (
        <Button
          class="bg-primary text-sm py-4 px-6 w-fit hover:bg-primary border-none hover:opacity-80"
          aria-label={action.label}
        >
          {action?.label}
        </Button>
      )}
    </div>
  );
}

function BannerItemMobile({
  image,
  lcp,
  id,
  height
}: {
  image: ImageItem;
  lcp?: boolean;
  id: string;
  height?: number
}) {
  const { mobile, alt, action, promotion } = image;

  return (
    <div class="flex flex-row w-full relative" id={id + "div"}>
      <a
        id={id}
        href={action?.href ?? "#"}
        aria-label={action?.label}
        class="absolute overflow-y-hidden w-full h-full"
      >
        {action && <Action {...action} />}
      </a>
      <Image
        class="object-cover w-full h-full"
        loading={lcp ? "eager" : "lazy"}
        decoding="async"
        sizes="(max-width: 640px) 100vw"
        preload={lcp}
        src={mobile}
        alt={alt}
        width={350}
        height={height || 450}
        fetchPriority={lcp ? "high" : "auto"}
      />
      <SendEventOnClick
        id={id}
        event={{
          name: "select_promotion",
          params: {
            creative_name: alt,
            creative_slot: id,
            promotion_id: action?.href,
            promotion_name: promotion,
            items: [],
          },
        }}
      />
      <SendEventOnView
        id={id + "div"}
        event={{
          name: "view_promotion",
          params: {
            view_promotion: promotion,
            crative_name: alt,
            creative_slot: alt,
            promotion_id: id,
            promotion_name: promotion,
            items: [],
          },
        }}
      />
    </div>
  );
}

function BannerItem({
  image,
  lcp,
  id,
  height,
}: {
  image: Banner;
  lcp?: boolean;
  id: string;
  height?: number
}) {
  return (
    <div class="flex flex-row w-full relative">
      {image.banner.map((primaryImage) => (
        <div class="flex flex-row w-full relative">
          <a
            id={id}
            href={primaryImage.action?.href ?? "#"}
            aria-label={primaryImage.action?.label}
            class="absolute overflow-y-hidden w-full h-full"
          >
            {primaryImage.action && <Action {...primaryImage.action} />}
          </a>
          <Picture preload={lcp} class="w-full h-full">
            <Source
              media="(max-width: 1366px)"
              fetchPriority={lcp ? "high" : "auto"}
              src={primaryImage.desktop}
              width={image.banner.length > 1 ? 631 : 1263}
              height={height || 492}
            />
            <Source
              media="(min-width: 1367px)"
              fetchPriority={lcp ? "high" : "auto"}
              src={primaryImage.desktop}
              width={image.banner.length > 1 ? 748 : 1495}
              height={height || 564}
            />
            <img
              class="object-cover h-full w-full"
              loading={lcp ? "eager" : "lazy"}
              src={primaryImage.desktop}
              alt={primaryImage.alt}
              style={{ minHeight: height || 564 }}
            />
          </Picture>
          <SendEventOnClick
            id={id}
            event={{
              name: "select_promotion",
              params: {
                creative_name: primaryImage.alt,
                creative_slot: id,
                promotion_id: primaryImage.action?.href,
                promotion_name: primaryImage.promotion,
                items: [],
              },
            }}
          />
          <SendEventOnView
            id={id}
            event={{
              name: "view_promotion",
              params: {
                view_promotion: primaryImage.promotion,
                crative_name: primaryImage.alt,
                creative_slot: "banner-carousel",
                promotion_id: id,
                promotion_name: primaryImage.promotion,
                items: [],
              },
            }}
          />
        </div>
      ))}
    </div>
  );
}

function Dots({
  images,
  interval = 0,
}: {
  images: Banner[] | ImageItem[];
  interval?: number;
}) {
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
      <ul class="carousel justify-center col-span-full gap-3 lg:gap-5 z-10 row-start-4">
        {images?.map((_, index) => (
          <li class="carousel-item">
            <Slider.Dot index={index}>
              <div class="py-5">
                <div
                  class={`w-12 h-1 lg:w-[71px] ${!interval
                    ? "bg-[rgba(255,255,255,0.4)] group-disabled:bg-primary"
                    : "group-disabled:animate-progress bg-gradient-to-r from-primary from-[length:var(--dot-progress)] to-[rgba(255,255,255,0.4)] to-[length:var(--dot-progress)]"
                    }`}
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
          <Icon class="text-white" size={40} id="arrowLeft" strokeWidth={3} />
        </Slider.PrevButton>
      </div>
      <div class="flex items-center justify-center z-10 col-start-3 row-start-2">
        <Slider.NextButton class=" bg-transparent border-none hover:bg-transparent text-primary">
          <Icon class="text-white" size={40} id="arrowRight" strokeWidth={3} />
        </Slider.NextButton>
      </div>
    </>
  );
}

function BannerCarousel(props: Props) {
  const id = useId();
  const { images, preload, interval, heightDesktop, heightMobile } = props;
  const { isMobile } = useUI();

  if (!images || images.length === 0) {
    return null;
  }

  function arrayImagesMobile() {
    const array: Array<ImageItem> = [];
    images?.map((img) => {
      if (img?.banner) {
        img.banner.map((item) => {
          array.push(item);
        });
      }
    });
    return array;
  }

  const arrayImage = isMobile.value && arrayImagesMobile();

  return (
    <div
      id={id}
      class="grid h-auto grid-cols-[48px_1fr_48px] sm:grid-cols-[60px_1fr_60px] grid-rows-[1fr_48px_1fr_64px] sm:min-h-min"
    >
      <Slider class="carousel carousel-center w-full col-span-full row-span-full gap-6">
        {isMobile.value && arrayImage
          ? arrayImage?.map((image, index) => (
            <Slider.Item index={index} class="carousel-item w-full ">
              <BannerItemMobile
                image={image}
                lcp={index === 0 && preload}
                id={`${id}::${index}`}
                height={heightMobile}
              />
            </Slider.Item>
          ))
          : images?.map((image, index) => {
            return (
              <Slider.Item index={index} class="carousel-item w-full ">
                <BannerItem
                  image={image}
                  lcp={index === 0 && preload}
                  id={`${id}::${index}`}
                  height={heightDesktop}
                />
              </Slider.Item>
            );
          })}
      </Slider>

      {props.arrows && <Buttons />}

      {props.dots && <Dots images={arrayImage || images} interval={interval} />}

      <SliderJS rootId={id} interval={interval && interval * 1e3} infinite />
    </div>
  );
}

export default BannerCarousel;
