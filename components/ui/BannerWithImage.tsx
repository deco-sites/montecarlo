import { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import ButtonLink from "deco-sites/montecarlo/components/ui/ButtonLink.tsx";
import Image from "apps/website/components/Image.tsx";
import {
  SendEventOnClick,
  SendEventOnView,
} from "../../components/Analytics.tsx";
import { useId } from "../../sdk/useId.ts";

export interface Props {
  title: HTMLWidget;
  /**
   * @titleb Content
   */
  content?: HTMLWidget;
  button: {
    label?: string;
    href?: string;
  };
  /** @format color-input */
  backgroundColor?: string;
  /**@description Desktop: 756px x 750px, Mobile: 350px x 350px*/
  image: {
    imgDesktop: ImageWidget;
    imgMobile: ImageWidget;
    alt: string;
    preload?: boolean;
  };
  orderDesktop?: "Imagem a Direita" | "Imagem a Esquerda";
  orderMobile?: "Imagem a Cima" | "Imagem a Baixo";
}

const DEFAULTPROPS: Props = {
  image: {
    alt: "modelo ",
    imgMobile:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4616/8288e6ad-dc2b-44e5-8c85-61f9e7f213a3",
    imgDesktop:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4616/74d224a2-d33f-47d7-abf5-9e3c4dcb3c36",
  },
  title: "<p>Madrinhas exuberantes e cheias de personalidade&nbsp;</p>",
  button: {
    href: "#",
    label: "Confira no blog Monte Carlo ",
  },
  content:
    "<p>Uma seleção especial de inspirações com joias poderosas para madrinhas de todos os estilos.</p>",
  orderMobile: "Imagem a Cima",
  orderDesktop: "Imagem a Direita",
  backgroundColor: "#F5F3E7",
};

const ORDER = {
  "Imagem a Direita": "md:flex-row ",
  "Imagem a Esquerda": "md:flex-row-reverse ",
};
const ORDERMOBILE = {
  "Imagem a Cima": "flex-col ",
  "Imagem a Baixo": "flex-col-reverse ",
};

export default function BannerWithImage(props: Props) {
  const {
    title,
    content,
    button,
    backgroundColor,
    image,
    orderDesktop,
    orderMobile,
  } = { ...DEFAULTPROPS, ...props };

  const id = useId();

  return (
    <div
      id={id}
      class="w-full lg:my-9 my-4"
      style={{ background: backgroundColor }}
    >
      <div
        class={`flex w-full max-w-[1512px] mx-auto  ${
          ORDER[orderDesktop || "Imagem a Direita"]
        }  ${ORDERMOBILE[orderMobile || "Imagem a Cima"]}`}
      >
        <Picture preload={image.preload} class="md:w-2/4">
          <Source
            media="(max-width:767px)"
            fetchPriority={image.preload ? "high" : "low"}
            loading={image.preload ? "eager" : "lazy"}
            src={image.imgMobile}
            width={350}
            height={350}
          />
          <Source
            media="(min-width:768px)"
            fetchPriority={image.preload ? "high" : "low"}
            loading={image.preload ? "eager" : "lazy"}
            src={image.imgDesktop}
            width={756}
            height={750}
          />
          <img
            class="object-cover w-full h-full aspect-square"
            loading={image.preload ? "eager" : "lazy"}
            src={image.imgMobile}
            width={350}
            height={350}
            alt={image.alt}
          >
          </img>
        </Picture>
        <div class="md:w-2/4 flex flex-col justify-center items-center px-12 md:px-16 md:py-12 lg:px-20 py-11 gap-3 xl:px-36 xl:gap-5 ">
          <span
            class="text-2xl md:text-3xl xl:text-5xl xl:leading-tight :"
            dangerouslySetInnerHTML={{ __html: title }}
          >
          </span>
          {content && (
            <span
              class="text-base md:text-lg xl:text-2xl xl:leading-10"
              dangerouslySetInnerHTML={{ __html: content }}
            >
            </span>
          )}
          {button.label && button.href && (
            <ButtonLink
              label={button.label}
              href={button.href}
              classCustom="mt-3 self-start xl:mt-4"
            />
          )}
        </div>
      </div>
      <SendEventOnView
        id={id}
        event={{
          name: "view_promotion",
          params: {
            creative_name: title.replace('<p>','').replace('</p>',''),
            creative_slot: id,
            promotion_id: id,
            promotion_name: title.replace('<p>','').replace('</p>',''),
            items: [],
          },
        }}
      />
    </div>
  );
}
