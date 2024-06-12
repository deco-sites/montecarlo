import Button from "../../components/ui/Button.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Slider from "../../components/ui/Slider.tsx";
import SliderJS from "../../islands/SliderJS.tsx";
import { useId } from "../../sdk/useId.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import { useUI } from "../../sdk/useUI.ts";
import Image from "apps/website/components/Image.tsx";
import {
  SendEventOnClick,
  SendEventOnView,
} from "../../components/Analytics.tsx";

export interface ImageItem {
  /** @title Store Name */
  label?: string;
  /** @description desktop otimized image */
  desktop: ImageWidget;
  /** @description mobile otimized image */
  mobile: ImageWidget;
  /** @description Image's alt text */
  alt?: string;
  /** @description Link to redirect */
  href: string;
}

export interface Props {
  images?: ImageItem[];
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

function BannerItemMobile({
  image,
  lcp,
}: {
  image: ImageItem;
  lcp?: boolean;
}) {
  const { mobile, alt } = image;

  const id = useId();

  return (
    <div class="flex flex-row w-full lg:max-h-[90vh] lg:min-h-[600px]">
      <a class="w-full h-full relative" href={image.href} target="_blank" rel="noopener noreferrer" id={id + "mobile"}>
        <SendEventOnClick
          id={id + "mobile"}
          event={{
            name: "select_item",
            params: {
              item_list_id: id + "mobile",
              item_list_name: image.label,
              items: [],
            },
          }}
        />
        {image.label !== ""
          ? (
            <div class="absolute left-0 bottom-0 w-full h-fit pb-16 pt-16 px-10 bg-gradient-to-b from-transparent to-[rgba(0,0,0,0.4)]">
              <div class="flex flex-col items-center justify-center gap-2 text-white">
                <Icon
                  size={24}
                  stroke-width={1}
                  id="StorePin"
                >
                </Icon>
                <span class="font-poppins text-base">
                  {image.label}
                </span>
              </div>
            </div>
          )
          : null}
        <Image
          class="object-cover w-full h-full"
          loading={lcp ? "eager" : "lazy"}
          decoding="async"
          sizes="(max-width: 640px) 100vw"
          preload={lcp}
          src={mobile}
          alt={alt}
          width={350}
          height={450}
          fetchPriority={lcp ? "high" : "auto"}
        />
        <SendEventOnView
          id={id + "mobile"}
          event={{
            name: "view_item_list",
            params: {
              item_list_id: id + "mobile",
              item_list_name: image.label,
              items: [],
            },
          }}
        />
      </a>
    </div>
  );
}

function BannerItem({
  image,
  lcp,
}: {
  image: ImageItem;
  lcp?: boolean;
}) {

  const id = useId();

  return (
    <div class="flex flex-row w-full">
      <a class="w-full h-full relative" href={image.href} target="_blank" rel="noopener noreferrer" id={id + "desktop"}>
        <SendEventOnClick
          id={id + "desktop"}
          event={{
            name: "select_item",
            params: {
              item_list_id: id + "desktop",
              item_list_name: image.label,
              items: [],
            },
          }}
        />
        {image.label !== ""
          ? (
            <div class="absolute left-0 bottom-0 w-full h-fit pb-16 pt-10 px-10 bg-gradient-to-b from-transparent to-[rgba(0,0,0,0.4)]">
              <div class="flex items-center gap-2 text-white">
                <Icon
                  size={24}
                  stroke-width={1}
                  id="StorePin"
                >
                </Icon>
                <span class="font-poppins text-base">
                  {image.label}
                </span>
              </div>
            </div>
          )
          : null}
        
        <Picture preload={lcp} class="w-full h-full">
          <Source
            media="(max-width: 1366px)"
            fetchPriority={lcp ? "high" : "auto"}
            src={image.desktop}
            width={1263}
            height={492}
          />
          <Source
            media="(min-width: 1367px)"
            fetchPriority={lcp ? "high" : "auto"}
            src={image.desktop}
            width={1495}
            height={583}
          />
          <img
            class="object-cover w-full"
            loading={lcp ? "eager" : "lazy"}
            src={image.desktop}
            alt={image.alt}
          />
        </Picture>
        <SendEventOnView
          id={id + "desktop"}
          event={{
            name: "view_item_list",
            params: {
              item_list_id: id + "desktop",
              item_list_name: image.label,
              items: [],
            },
          }}
        />
      </a>
    </div>
  );
}

function Dots({
  images,
  interval = 0,
}: {
  images: ImageItem[];
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
                  class={`w-12 h-1 lg:w-[71px] ${
                    !interval
                      ? "bg-white group-disabled:bg-primary"
                      : "group-disabled:animate-progress bg-gradient-to-r from-primary from-[length:var(--dot-progress)] to-white to-[length:var(--dot-progress)]"
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
          <Icon
            class="text-[#FFC72C]"
            size={40}
            id="arrowLeft"
            strokeWidth={3}
          />
        </Slider.PrevButton>
      </div>
      <div class="flex items-center justify-center z-10 col-start-3 row-start-2">
        <Slider.NextButton class=" bg-transparent border-none hover:bg-transparent text-primary">
          <Icon
            class="text-[#FFC72C]"
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
      array.push(img);
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
              />
            </Slider.Item>
          ))
          : images?.map((image, index) => {
            return (
              <Slider.Item index={index} class="carousel-item w-full ">
                <BannerItem
                  image={image}
                  lcp={index === 0 && preload}
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
