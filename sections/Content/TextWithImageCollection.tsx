import type { ImageWidget } from "apps/admin/widgets.ts";
import type { HTMLWidget } from "apps/admin/widgets.ts";

export interface Props {
  title?: HTMLWidget;
  description?: HTMLWidget;
  image?: {
    mobile?: ImageWidget;
    desktop?: ImageWidget;
  };
  placement: "left" | "right";
  style: {
    textAlign?: "left" | "center" | "right";
    backgroundColor?: string;
    secondaryBackgroundColor?: string;
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

export default function TextWithImageCollection({
  title = "Lorem ipsum",
  description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ultrices ornare ultrices. Vestibulum gravida ligula nec ex scelerisque, sed tristique neque porttitor. ",
  image = {
    mobile: "https://placehold.co/380x380",
    desktop: "https://placehold.co/704x704",
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
        `}
        >
          <img
            class="w-full object-cover block md:hidden"
            src={image.mobile}
            alt={title}
            decoding="async"
            loading="lazy"
          />
          <img
            class="w-full object-cover max-h-[704px] hidden md:block"
            src={image.desktop}
            alt={title}
            decoding="async"
            loading="lazy"
          />
        </div>
      </div>
      <div
        class="w-full h-full flex-1 flex flex-col items-center justify-center order-0"
        style={{
          backgroundColor: style.backgroundColor,
          color: style.fontColor,
        }}
      >
        <div class="flex flex-col p-5 py-20 max-w-[340px] gap-10">
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
              href={CTA.href}
              class={`
                btn text-sm py-2.5 px-3.5 w-fit rounded-none border-transparent
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
        </div>
      </div>
    </div>
  );
}
