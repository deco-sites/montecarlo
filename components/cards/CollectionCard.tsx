import { usePartialSection } from "deco/hooks/usePartialSection.ts";
import { useUI } from "../../sdk/useUI.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";

import { Picture } from "apps/website/components/Picture.tsx";
import Title from "../product/Shelf/Title.tsx";
import SubTitle from "../product/Shelf/SubTitle.tsx";
import { useSection } from "deco/hooks/useSection.ts";

const DEFAULT_PROPS = {
  title: "Coleções de Joias em Ouro 18k e Prata 925",
  subTitle: "Presenteie com os lançamentos da coleção Sunset",
  cards: [
    {
      background: {
        image:
          "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4616/19bf1e22-7312-423b-a34c-a65b163e101f",
        altText: "Três anéis um na frente do outro",
      },
      hover: {
        text:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dapibus nisi at.",
      },
      title: "Coleção",
      link: "/",
      preload: true,
    },
    {
      background: {
        image:
          "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4616/19bf1e22-7312-423b-a34c-a65b163e101f",
        altText: "Três anéis um na frente do outro",
      },
      hover: {
        text:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dapibus nisi at.",
      },
      title: "Coleção",
      link: "/",
      preload: true,
    },
    {
      background: {
        image:
          "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4616/19bf1e22-7312-423b-a34c-a65b163e101f",
        altText: "Três anéis um na frente do outro",
      },
      hover: {
        text:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dapibus nisi at.",
      },
      title: "Coleção",
      link: "/",
      preload: true,
    },
    {
      background: {
        image:
          "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4616/19bf1e22-7312-423b-a34c-a65b163e101f",
        altText: "Três anéis um na frente do outro",
      },
      hover: {
        text:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dapibus nisi at.",
      },
      title: "Coleção",
      link: "/",
      preload: true,
    },
    {
      background: {
        image:
          "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4616/19bf1e22-7312-423b-a34c-a65b163e101f",
        altText: "Três anéis um na frente do outro",
      },
      hover: {
        text:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dapibus nisi at.",
      },
      title: "Coleção",
      link: "/",
      preload: true,
    },
    {
      background: {
        image:
          "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4616/19bf1e22-7312-423b-a34c-a65b163e101f",
        altText: "Três anéis um na frente do outro",
      },
      hover: {
        text:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dapibus nisi at.",
      },
      title: "Coleção",
      link: "/",
      preload: true,
    },
    {
      background: {
        image:
          "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4616/19bf1e22-7312-423b-a34c-a65b163e101f",
        altText: "Três anéis um na frente do outro",
      },
      hover: {
        text:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dapibus nisi at.",
      },
      title: "Coleção",
      link: "/",
      preload: true,
    },
    {
      background: {
        image:
          "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4616/19bf1e22-7312-423b-a34c-a65b163e101f",
        altText: "Três anéis um na frente do outro",
      },
      hover: {
        text:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dapibus nisi at.",
      },
      title: "Coleção",
      link: "/",
      preload: true,
    },
    {
      background: {
        image:
          "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4616/19bf1e22-7312-423b-a34c-a65b163e101f",
        altText: "Três anéis um na frente do outro",
      },
      hover: {
        text:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dapibus nisi at.",
      },
      title: "Coleção",
      link: "/",
      preload: true,
    },
    {
      background: {
        image:
          "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4616/19bf1e22-7312-423b-a34c-a65b163e101f",
        altText: "Três anéis um na frente do outro",
      },
      hover: {
        text:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dapibus nisi at.",
      },
      title: "Coleção",
      link: "/",
      preload: true,
    },
    {
      background: {
        image:
          "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4616/19bf1e22-7312-423b-a34c-a65b163e101f",
        altText: "Três anéis um na frente do outro",
      },
      hover: {
        text:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dapibus nisi at.",
      },
      title: "Coleção",
      link: "/",
      preload: true,
    },
    {
      background: {
        image:
          "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4616/19bf1e22-7312-423b-a34c-a65b163e101f",
        altText: "Três anéis um na frente do outro",
      },
      hover: {
        text:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dapibus nisi at.",
      },
      title: "Coleção",
      link: "/",
      preload: true,
    },
    {
      background: {
        image:
          "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4616/19bf1e22-7312-423b-a34c-a65b163e101f",
        altText: "Três anéis um na frente do outro",
      },
      hover: {
        text:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dapibus nisi at.",
      },
      title: "Coleção",
      link: "/",
      preload: true,
    },
    {
      background: {
        image:
          "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4616/19bf1e22-7312-423b-a34c-a65b163e101f",
        altText: "Três anéis um na frente do outro",
      },
      hover: {
        text:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dapibus nisi at.",
      },
      title: "Coleção",
      link: "/",
      preload: true,
    },
    {
      background: {
        image:
          "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4616/19bf1e22-7312-423b-a34c-a65b163e101f",
        altText: "Três anéis um na frente do outro",
      },
      hover: {
        text:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dapibus nisi at.",
      },
      title: "Coleção",
      link: "/",
      preload: true,
    },
    {
      background: {
        image:
          "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4616/19bf1e22-7312-423b-a34c-a65b163e101f",
        altText: "Três anéis um na frente do outro",
      },
      hover: {
        text:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dapibus nisi at.",
      },
      title: "Coleção",
      link: "/",
      preload: true,
    },
  ],
  lengthToShowMobile: 6,
  lengthToShowDesktop: 12,
  cta: "ver mais coleções",
};

/**
 * @titleBy title
 */
interface Card {
  title: string;
  background: {
    image: ImageWidget;
    altText: string;
  };
  /**
   * @title Link para a coleção
   * @description Por exemplo: "https://www.montecarlo.com.br/exemplo"
   */
  link: string;
  /**
   * @description Texto que será exibido no fundo amarelo quando o usuário estiver interagindo com o card
   */
  hover: {
    text: string;
  };
  preload: boolean;
}

export interface Props {
  title: string;
  subTitle: string;
  cards: Card[];
  lengthToShowMobile: number;
  lengthToShowDesktop: number;
  cta: string;
}

export default function GridCollectionCard(props: Props) {
  const { title, subTitle, cards, cta } = { ...DEFAULT_PROPS, ...props };
  const { isMobile } = useUI();

  const mobileCountController = isMobile.value &&
    cards.length > props.lengthToShowMobile;
  const desktopCountController = !isMobile.value &&
    cards.length > props.lengthToShowDesktop;

  return (
    <div
      className={"max-w-[1512px] px-1 md:px-10 lg:px-14 mx-auto text-center"}
    >
      <Title text={title} />
      <SubTitle text={subTitle} />
      <div
        className={"grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-6 lg:mt-10"}
      >
        {cards.map((card, index) => {
          if (isMobile.value) {
            if (index < props.lengthToShowMobile) {
              return (
                <Card
                  background={card.background}
                  title={card.title}
                  link={card.link}
                  hover={card.hover}
                  preload={card.preload}
                />
              );
            }
          } else {
            if (index < props.lengthToShowDesktop) {
              return (
                <Card
                  background={card.background}
                  title={card.title}
                  link={card.link}
                  hover={card.hover}
                  preload={card.preload}
                />
              );
            }
          }
        })}
      </div>
      {mobileCountController && (
        <button
          className={"mx-auto mt-12 md:mt-10 bg-[#FFC72C] h-10 px-8 md:px-12 text-xl md:text-lg font-normal text-black flex items-center justify-center"}
          {...usePartialSection({
            props: { lengthToShowMobile: props.lengthToShowMobile * 2 },
          })}
        >
          {cta}
        </button>
      )}
      {desktopCountController && (
        <button
          className={"mx-auto mt-12 md:mt-10 bg-[#FFC72C] h-10 px-8 md:px-12 text-xl md:text-lg font-normal text-black flex items-center justify-center"}
          hx-get={useSection({
            props: { lengthToShowDesktop: props.lengthToShowDesktop * 2 },
          })}
          hx-swap="outerHTML"
          hx-target="closest section"
        >
          {cta}
        </button>
      )}
    </div>
  );
}

function Card({ background, title, link, hover, preload }: Card) {
  return (
    <div>
      <div className={"min-h-[168px] relative group"}>
        <a href={link} title={"Ir para a coleção " + title}>
          <div>
            <Picture className={"z-0"}>
              <img
                class={"w-full"}
                src={background.image}
                alt={background.altText}
                loading={preload ? "eager" : "lazy"}
              />
            </Picture>
          </div>
          <div
            className={"bg-[rgb(255,199,44)]/0 w-full h-full top-0 absolute group-hover:bg-[rgb(255,199,44)]/85"}
          >
            <h4
              className={"hidden group-hover:flex px-3 font-normal text-sm leading-[18px] text-black h-full items-center justify-center text-center"}
            >
              {hover.text}
            </h4>
          </div>
        </a>
      </div>
      <h2
        className={"pb-[6px] text-center font-medium text-sm lg:textarea-md lg:text-base px-4"}
      >
        {title}
      </h2>
    </div>
  );
}
