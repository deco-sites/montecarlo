import { ImageWidget } from "apps/admin/widgets.ts";
import { useId } from "../../sdk/useId.ts";
import {
  SendEventOnClick,
  SendEventOnView,
} from "../../components/Analytics.tsx";

import Title from "./../product/Shelf/Title.tsx";
import SubTitle from "./../product/Shelf/SubTitle.tsx";

import Slider from "../../components/ui/Slider.tsx";
import { clx } from "../../sdk/clx.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "deco-sites/montecarlo/components/ui/Icon.tsx";
import SliderJS from "deco-sites/montecarlo/islands/SliderJS.tsx";

/**@titleBy title */
export interface Card {
  /**@description Image size 246px x 246px  */
  image: ImageWidget;
  altText?: string;
  title?: string;
  linkToRedirect: string;
  preload?: boolean;
}

export interface Props {
  title?: string;
  /**
   * @format html
   * @title Content
   */
  subTitle?: string;
  cards: Card[];
  /**
   * @default 4
   * @description default 4 itens
   */
  sliderItemsDesktop?: 4 | 5 | 6 | 7;
  /**
   * @default 1
   * @description default 1 itens
   */
  sliderItemsMobile?: 1 | 3.5;
  /**
   * @default noSlide
   * @description default noSlide
   */
  variant?: "noSlide" | "Slider";
  /**
   * @default 1:1
   * @description default 1:1
   */
  aspectRatio?: "1:1" | "1:2";
}

const DEFAULTPROPS = {
  cards: [
    {
      image:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4616/9f1f5212-943f-4356-bed4-41f25115ccb0",
      title: "Pedras Peciosas",
      altText: "Pedras Peciosas",
      linkToRedirect: "#",
    },
    {
      image:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4616/9f1f5212-943f-4356-bed4-41f25115ccb0",
      title: "Pedras Peciosas",
      altText: "Pedras Peciosas",
      linkToRedirect: "#",
    },
    {
      image:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4616/9f1f5212-943f-4356-bed4-41f25115ccb0",
      title: "Pedras Peciosas",
      altText: "Pedras Peciosas",
      linkToRedirect: "#",
    },
    {
      image:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4616/9f1f5212-943f-4356-bed4-41f25115ccb0",
      title: "Pedras Peciosas",
      altText: "Pedras Peciosas",
      linkToRedirect: "#",
    },
  ],
  variant: "noSlide",
};

const WIDTH = {
  "1:1": 246,
  "1:2": 102,
};

const HEIGHT = {
  "1:1": 246,
  "1:2": 37,
};

function CardImage(
  { card, index, aspectRatio }: {
    card: Card;
    index: number;
    aspectRatio: "1:1" | "1:2";
  },
) {
  const id = useId();
  return (
    <a
      href={card.linkToRedirect}
      title={"Ir para a página de " + card.title}
      class="w-full hover:opacity-80"
      id={id}
    >
      <div
        class={`lg:w-full justify-center items-center flex flex-col `}
      >
        <Image
          class={` h-auto aspect-square ${
            aspectRatio == "1:1"
              ? "min-w-[246px] object-cover w-full"
              : "w-[102px] object-contain"
          } `}
          src={card.image}
          alt={card.altText}
          width={WIDTH[aspectRatio]}
          height={HEIGHT[aspectRatio]}
          loading={card.preload ? "eager" : "lazy"}
          fetchPriority={card.preload ? "high" : "low"}
        />
        <div class="text-center mt-2">
          <h3 class="text-base font-medium">{card.title}</h3>
        </div>
      </div>
      <SendEventOnView
        id={id}
        event={{
          name: "view_promotion",
          params: {
            view_promotion: card.altText,
            creative_name: card.altText,
            creative_slot: card.altText,
            promotion_id: id,
            promotion_name: card.altText,
            items: [],
          },
        }}
      />
      <SendEventOnClick
        id={id}
        event={{
          name: "select_promotion",
          params: {
            creative_name: card.altText,
            creative_slot: id + index,
            promotion_id: card.linkToRedirect,
            promotion_name: card.altText,
            items: [],
          },
        }}
      />
    </a>
  );
}

const ITEMSSLIDE = {
  4: "lg:w-[calc(25%-0.5rem)]",
  5: "lg:w-[calc(20%-0.5rem)]",
  6: "lg:w-[calc(16.66%-0.5rem)]",
  7: "lg:w-[calc(14.28%-0.5rem)]",
};

const ITEMSSLIDEMOBILE = {
  1: "w-full",
  3.5: "w-[calc(30%-2.25rem)]",
};

function VerticalCardsGrid(props: Props) {
  const {
    title,
    subTitle,
    cards,
    variant,
    sliderItemsDesktop,
    sliderItemsMobile,
    aspectRatio,
  } = { ...DEFAULTPROPS, ...props };
  const id = useId();

  return (
    <div
      class={`  ${
        variant === "noSlide"
          ? "xl:max-w-[1512px] lg:container lg:px-14 "
          : "w-full lg:px-0"
      } flex lg:justify-center flex-col gap-5 lg:gap-10 py-9`}
    >
      {title !== "" || subTitle !== ""
        ? (
          <div class="flex flex-col w-full gap-1 items-center">
            {title !== "" ? <Title text={title} /> : null}
            {subTitle !== "" ? <SubTitle text={subTitle} /> : null}
          </div>
        )
        : null}
      {variant == "noSlide"
        ? (
          <Slider class="row-start-2 carousel carousel-item row-end-5 snap-mandatory snap-start gap-9 sm:gap-2 px-14 lg:px-0 lg:justify-center">
            {cards.map((card, index) => (
              <Slider.Item
                index={index}
                class={`carousel-item sm:max-w-1/2 lg:max-w-none lg:snap-center md:w-1/3 snap-center ${
                  ITEMSSLIDEMOBILE[
                    sliderItemsMobile as keyof typeof sliderItemsMobile || 1
                  ]
                } ${
                  ITEMSSLIDE[
                    sliderItemsDesktop as keyof typeof sliderItemsDesktop || 4
                  ]
                }`}
              >
                <CardImage
                  card={card}
                  index={index}
                  aspectRatio={aspectRatio || "1:1"}
                />
              </Slider.Item>
            ))}
          </Slider>
        )
        : variant == "Slider"
        ? (
          <div
            id={id}
            class={`grid lg:grid-cols-[48px_1fr_48px] ${
              aspectRatio == "1:2"
                ? " grid-rows-[1fr_30%]"
                : " grid-rows-[1fr_40%]"
            } px-0`}
          >
            <Slider
              class={`row-start-2 carousel carousel-item row-end-5 snap-mandatory snap-start gap-9 sm:gap-2 lg:px-0 ${
                sliderItemsMobile == 1 ? "px-14" : "px-0"
              }`}
            >
              {cards.map((card, index) => (
                <Slider.Item
                  index={index}
                  class={`carousel-item sm:max-w-1/2 lg:max-w-none lg:snap-center md:w-1/3 snap-start ${
                    ITEMSSLIDEMOBILE[
                      sliderItemsMobile as keyof typeof sliderItemsMobile || 1
                    ]
                  } ${
                    ITEMSSLIDE[
                      sliderItemsDesktop as keyof typeof sliderItemsDesktop || 4
                    ]
                  }`}
                >
                  <CardImage
                    card={card}
                    index={index}
                    aspectRatio={aspectRatio || "1:1"}
                  />
                </Slider.Item>
              ))}
            </Slider>
            <>
              <div class="relative z-10 col-start-1 row-start-3 hidden lg:block">
                <Slider.PrevButton class="absolute w-12 h-12 flex justify-center items-center">
                  <Icon size={40} id="arrowLeft" strokeWidth={3} />
                </Slider.PrevButton>
              </div>
              <div class="relative z-10 col-start-3 row-start-3 hidden lg:block">
                <Slider.NextButton class="absolute w-12 h-12 flex justify-center items-center">
                  <Icon size={40} id="arrowRight" strokeWidth={3} />
                </Slider.NextButton>
              </div>
            </>
            <SliderJS rootId={id} />
          </div>
        )
        : null}
    </div>
  );
}

export default VerticalCardsGrid;
