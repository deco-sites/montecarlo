import type { ImageWidget } from "apps/admin/widgets.ts";
import { SendEventOnView } from "../../components/Analytics.tsx";
import { useId } from "../../sdk/useId.ts";
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
  const { title, description, image, placement, style, CTA } = props;
  const id = useId();

  return (
    <div
      class={`
      relative grid grid-cols-1 lg:grid-cols-2 items-center font-poppins mb-8
      text-${style.textAlign}
    `}
      id={id}
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

      <div class="w-full h-full flex-1 flex flex-col px-10 md:items-center justify-end lg:justify-center order-0">
        <div class="flex flex-col p-5 py-14 gap-4">
          <h1
            class={`text-4xl md:text-5xl lg:text-[3.438rem] block text-left lg:leading-12 font-beausiteGrand text-${style.textAlign} max-w-[250px] md:max-w-[350px] lg:max-w-[380px]`}
          >
            {title}
          </h1>
          {description &&
            (
              <p
                class={`text-xl leading-9 font-poppins text-${style.textAlign} max-w-xs`}
              >
                {description}
              </p>
            )}
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
      <SendEventOnView
        id={id}
        event={{
          name: "view_promotion",
          params: {
            view_promotion: title,
            creative_name: title,
            creative_slot: title,
            promotion_id: id,
            promotion_name: title,
            items: [],
          },
        }}
      />
    </div>
  );
}
