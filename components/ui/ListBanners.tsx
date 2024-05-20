import { ImageWidget } from "apps/admin/widgets.ts";

import Title from "./../product/Shelf/Title.tsx";
import SubTitle from "./../product/Shelf/SubTitle.tsx";

import Slider from "../../components/ui/Slider.tsx";
import { clx } from "../../sdk/clx.ts";
import Image from "apps/website/components/Image.tsx";

/**@titleBy title */
export interface Card {
  /**@description Image size 246px x 246px */
  image: ImageWidget;
  altText?: string;
  title: string;
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
  title: "Diga sim à aliança perfeita",
  subTitle: "<p>Encontre todo brilho que a ocasião merece</p>",
};

function CardImage({ card, index }: { card: Card; index: number }) {
  return (
    <a
      href={card.linkToRedirect}
      title={"Ir para a página de " + card.title}
      class="w-full hover:opacity-80"
    >
      <div
        class={`lg:w-full `}
      >
        <Image
          class="w-full h object-cover aspect-square min-w-[246px] lg:min-w-full"
          src={card.image}
          alt={card.altText}
          width={246}
          height={246}
          loading={card.preload ? "eager" : "lazy"}
          fetchPriority={card.preload ? "high" : "low"}
        />
        <div class="text-center mt-2">
          <h3 class="text-base font-medium">{card.title}</h3>
        </div>
      </div>
    </a>
  );
}

function VerticalCardsGrid(props: Props) {
  const { title, subTitle, cards } = { ...DEFAULTPROPS, ...props };

  return (
    <div class=" lg:container xl:max-w-[1408px] flex lg:justify-center flex-col gap-5 lg:gap-10 py-9">
      <div class="flex flex-col w-full gap-1 items-center">
        <h2 class=" font-semibold text-xl lg:text-3xl">{title}</h2>
        {subTitle && (
          <p
            class=" text-center font-medium  text-sm lg:text-base"
            dangerouslySetInnerHTML={{ __html: subTitle }}
          >
          </p>
        )}
      </div>
      <Slider class="row-start-2 carousel carousel-item row-end-5 snap-mandatory snap-start gap-9 sm:gap-2 px-14 lg:px-0 lg:justify-center">
        {cards.map((card, index) => (
          <Slider.Item
            index={index}
            class={"carousel-item sm:max-w-1/2 lg:w-[calc(25%-0.5rem)] lg:max-w-none lg:snap-start md:w-1/3 snap-center "}
          >
            <CardImage card={card} index={index} />
          </Slider.Item>
        ))}
      </Slider>
    </div>
  );
}

export default VerticalCardsGrid;
