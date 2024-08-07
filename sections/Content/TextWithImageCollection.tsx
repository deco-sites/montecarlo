import type { Props as BannerProductDotInfoProps } from "../../components/product/BannerProductDotInfo/index.tsx";
import BannerProductDotInfo from "../../islands/BannerProductDotInfo.tsx";

import {
  SendEventOnClick,
  SendEventOnView,
} from "../../components/Analytics.tsx";

interface StyleProps {
  textAlign?: "left" | "center" | "right";
  /** @format color-input */
  backgroundColor?: string;
  /** @format color-input */
  secondaryBackgroundColor?: string;
  /** @format color-input */
  fontColor?: string;
}

interface CTAProps {
  label?: string;
  href?: string;
  /** @format color-input */
  backgroundColor?: string;
  /** @format color-input */
  fontColor?: string;
  alignment?: "left" | "center" | "right";
}

export interface Props {
  /** @format rich-text */
  title?: string;
  /** @format rich-text */
  description?: string;
  banner?: BannerProductDotInfoProps;
  placement: "left" | "right";
  style: StyleProps;
  CTA?: CTAProps;
  promotion: string;
}

const PLACEMENT = {
  left: "lg:order-1",
  right: "lg:order-0",
};

export default function TextWithImageCollection({
  title = "Lorem ipsum",
  promotion = "ColecaoAllure",
  description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ultrices ornare ultrices. Vestibulum gravida ligula nec ex scelerisque, sed tristique neque porttitor. ",
  banner = {
    image: { source: "https://placehold.co/704x704", alt: "alt da image" },
  },
  placement = "left",
  style = {
    textAlign: "left",
    backgroundColor: "#FFC72C",
    secondaryBackgroundColor: "#FFF",
    fontColor: "#000",
  },
  CTA = {
    label: "Explore",
    href: "#explore",
    backgroundColor: "#FFF",
    fontColor: "#000",
    alignment: "left",
  },
}: Props) {
  return (
    <div
      class={`
      grid grid-cols-1 lg:grid-cols-2 items-center font-poppins
       text-${style.textAlign}
    `}
    >
      <div
        class={`${PLACEMENT[placement]}`}
        style={{ backgroundColor: style.secondaryBackgroundColor }}
      >
        <div
          class={`
          p-2.5 lg:p-12 md:p-2.5 pb-0 md:pb-0 lg:pr-0
          lg:flex ${
            placement === "left" ? "lg:justify-start" : "lg:justify-end"
          }
        `}
        >
          <BannerProductDotInfo {...banner} />
        </div>
      </div>
      <div
        class="w-full h-full flex-1 flex flex-col items-center justify-center order-0"
        style={{
          backgroundColor: style.backgroundColor,
          color: style.fontColor,
        }}
      >
        <div
          class="flex flex-col p-5 py-20 max-w-[340px] gap-10"
          id={promotion + "div"}
        >
          <h3
            class="text-5xl"
            dangerouslySetInnerHTML={{ __html: title || "" }}
          />
          <span
            class="text-xl"
            dangerouslySetInnerHTML={{ __html: description || "" }}
          />
          {CTA?.href && (
            <a
              id={promotion}
              href={CTA.href}
              class={`
                btn text-sm py-2.5 px-3.5 w-fit rounded-none border-transparent hover:opacity-80
                ${CTA.alignment === "left" && "self-start"}
                ${CTA.alignment === "center" && "self-center"}
                ${CTA.alignment === "right" && "self-end"}
              `}
              style={{
                backgroundColor: CTA.backgroundColor,
                color: CTA.fontColor,
              }}
            >
              {CTA.label}
            </a>
          )}
          <SendEventOnClick
            id={promotion}
            event={{
              name: "select_promotion" as const,
              params: {
                crative_name: banner.image.alt,
                creative_slot: "TextWithImageCollection",
                promotion_id: promotion,
                promotion_name: promotion,
                items: [],
              },
            }}
          />
          <SendEventOnView
            id={promotion + "div"}
            event={{
              name: "view_promotion",
              params: {
                crative_name: banner.image.alt,
                creative_slot: "TextWithImageCollection",
                promotion_id: promotion,
                promotion_name: promotion,
                items: [],
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
