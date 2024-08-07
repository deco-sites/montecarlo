import { Picture, Source } from "apps/website/components/Picture.tsx";
import {
  SendEventOnClick,
  SendEventOnView,
} from "../../components/Analytics.tsx";
import { useId } from "../../sdk/useId.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  /** @format rich-text */
  title?: string;
  /** @format rich-text */
  titleMobile?: string;
  /** @format rich-text */
  description?: string;
  /**
   * @description size Image mobile 375x418 and size Image desktop 632x704
   */
  image?: {
    mobile?: ImageWidget;
    desktop?: ImageWidget;
  };
  placement: "left" | "right";
  style: {
    textAlign?: "left" | "center" | "right";
    backgroundColor?: string;
    fontColor?: string;
  };
  CTA?: {
    label?: string;
    href?: string;
    backgroundColor?: string;
    fontColor?: string;
    alignment?: "left" | "center" | "right";
  };
}

const PLACEMENT = {
  left: "lg:order-1",
  right: "lg:order-0",
};

export default function TextWithImage({
  title = "Lorem ipsum",
  titleMobile = "Lorem ipsum dolor",
  description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ultrices ornare ultrices. Vestibulum gravida ligula nec ex scelerisque, sed tristique neque porttitor. ",
  image = {
    mobile: "https://placehold.co/350x390",
    desktop: "https://placehold.co/704x704",
  },
  placement = "left",
  style = {
    textAlign: "left",
    backgroundColor: "#CAC7B6",
    fontColor: "#000",
  },
  CTA = {
    label: "Saiba mais",
    href: "#saiba-mais",
    backgroundColor: "#FFC72C",
    fontColor: "#000",
    alignment: "center",
  },
}: Props) {
  const id = useId();
  return (
    <div
      class={`
      relative grid grid-cols-1 lg:grid-cols-2 items-center font-poppins
      text-${style.textAlign}
    `}
      style={{ backgroundColor: style.backgroundColor, color: style.fontColor }}
    >
      <div class={`h-full ${PLACEMENT[placement]}`} id={id}>
        <Picture>
          <Source
            media="(max-width: 1023px)"
            src={image.mobile || ""}
            width={375}
            height={418}
            class="w-full object-cover"
          />
          <Source
            media="(min-width: 1024px)"
            src={image.desktop || ""}
            width={632}
            height={704}
            class="w-full object-cover"
          />
          <img
            class="w-full lg:h-full object-cover lg:max-h-[704px]"
            loading={"lazy"}
            src={image.desktop || ""}
            alt={title}
            title={title}
          />
        </Picture>
        <SendEventOnView
          id={id}
          event={{
            name: "view_promotion",
            params: {
              creative_name: title,
              creative_slot: "0",
              promotion_id: CTA?.href,
              promotion_name: CTA?.label,
            },
          }}
        />
      </div>
      <div class="absolute lg:relative w-full h-full flex-1 flex flex-col items-center justify-end lg:justify-center order-0 bg-gradient-to-b from-transparent to-[rgba(0,0,0,0.4)] lg:to-transparent">
        <div class="flex flex-col p-5 py-14 max-w-[430px] gap-3">
          <h2
            class="text-2xl block lg:hidden text-center text-white"
            dangerouslySetInnerHTML={{ __html: titleMobile || "" }}
          />
          <h2
            class="text-4xl hidden lg:block"
            dangerouslySetInnerHTML={{ __html: title || "" }}
          />
          <span
            class="text-xl hidden lg:block"
            dangerouslySetInnerHTML={{ __html: description || "" }}
          />
          {CTA?.href && (
            <a
              href={CTA.href}
              class={`
                btn text-sm mt-5 py-2.5 px-3.5 w-fit rounded-none border-transparent self-center hover:opacity-80
                ${CTA.alignment === "left" && "lg:self-start"}
                ${CTA.alignment === "center" && "lg:self-center"}
                ${CTA.alignment === "right" && "lg:self-end"}
              `}
              style={{
                backgroundColor: CTA.backgroundColor,
                color: CTA.fontColor,
              }}
            >
              <SendEventOnClick
                id={id}
                event={{
                  name: "select_promotion",
                  params: {
                    creative_name: title,
                    creative_slot: "0",
                    promotion_id: CTA?.href,
                    promotion_name: CTA?.label,
                  },
                }}
              />
              {CTA.label}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
