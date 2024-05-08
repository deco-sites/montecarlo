import type { ImageWidget } from "apps/admin/widgets.ts";
import type { HTMLWidget } from "apps/admin/widgets.ts";

export interface Props {
  title?: HTMLWidget;
  titleMobile?: HTMLWidget;
  description?: HTMLWidget;
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
  return (
    <div
      class={`
      relative grid grid-cols-1 lg:grid-cols-2 items-center font-poppins
      text-${style.textAlign}
    `}
      style={{ backgroundColor: style.backgroundColor, color: style.fontColor }}
    >
      <div class={`h-full ${PLACEMENT[placement]}`}>
        <img
          class="w-full object-cover block md:hidden"
          src={image.mobile}
          alt={title}
          decoding="async"
          loading="lazy"
        />
        <img
          class="w-full h-full object-cover max-h-[704px] hidden md:block"
          src={image.desktop}
          alt={title}
          decoding="async"
          loading="lazy"
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
              {CTA.label}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
