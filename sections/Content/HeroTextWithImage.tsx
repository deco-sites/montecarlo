import type { ImageWidget } from "apps/admin/widgets.ts";
import type { HTMLWidget } from "apps/admin/widgets.ts";

interface StyleProps {
    textAlign?: "left" | "center" | "right";
    /** @format color-input */
    backgroundColor?: string;
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
}

export interface Props {
  title?: string;
  description?: string;
  image: {
    mobile: ImageWidget;
    desktop: ImageWidget;
  };
  placement: "left" | "right";
  style: StyleProps;
  CTA?: {
    alignment?: "left" | "center" | "right";
    buttons?: CTAProps[];
  };
}

const PLACEMENT = {
  left: "lg:order-1",
  right: "lg:order-0",
};

export default function HeroTextWithImage(props: Props) {
  const {title, description, image, placement, style, CTA} = props;

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
          loading="eager"
        />
        <img
          class="w-full h-full object-cover max-h-[704px] hidden md:block"
          src={image.desktop}
          alt={title}
          decoding="async"
          loading="eager"
        />
      </div>
      <div class="w-full h-full flex-1 flex flex-col items-center justify-end lg:justify-center order-0">
        <div class="flex flex-col p-5 py-14 max-w-[380px] gap-3">
          <h1 class={`text-4xl lg:text-[3.438rem] block text-left leading-12 font-beausiteGrand text-${style.textAlign}`}>
            {title}
          </h1>
          {
            description &&
            <p class={`text-xl leading-9 font-poppins text-${style.textAlign}`}>{description}</p>
          }
          <div
            class={`
                flex border border-white w-fit mt-5
                ${
                  (CTA?.alignment === "left" && "justify-start") ||
                  (CTA?.alignment === "center" && "justify-center") ||
                  (CTA?.alignment === "right" && "justify-end")
                }
            `}
          >
            {CTA?.buttons?.map((cta, index) => (
              <a
                key={index}
                href={cta.href}
                class={`btn text-xl py-2.5 px-3.5 w-fit rounded-none border-transparent self-center hover:opacity-80 font-light`}
                style={{
                  backgroundColor: cta.backgroundColor,
                  color: cta.fontColor,
                }}
              >
                {cta.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
