import type { ImageWidget } from "apps/admin/widgets.ts";
import { useId } from "../../sdk/useId.ts";

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
  /**
   * @description tamanho mínimo Mobile é 360x208 (ou use 720x416 para melhorar a qualidade) e tamanho mínimo Desktop é 717x286 (ou use 1434x572 para melhorar a qualidade)
   */
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

export default function HeroTextWithImage(props: Props) {
  const { title, description, image, placement, style, CTA } = props;
  const id = useId();

  return (
    <div
      class={`
      relative grid grid-cols-1 sm:grid-cols-2 items-center font-poppins mb-6 md:mb-10
      text-${style.textAlign}
    `}
      id={id}
      style={{ backgroundColor: style.backgroundColor, color: style.fontColor }}
    >
      {placement == "left"
        ? (
          <div class={`h-full order-1 sm:order-none`}>
            <img
              class="w-full object-cover block sm:hidden"
              src={image.mobile}
              alt={title}
              decoding="async"
              loading="eager"
            />
            <img
              class="w-full h-full object-cover max-h-[420px] hidden sm:block"
              src={image.desktop}
              alt={title}
              decoding="async"
              loading="eager"
            />
          </div>
        )
        : (
          <div class={`h-full order-1 sm:order-1`}>
            <img
              class="w-full object-cover block sm:hidden"
              src={image.mobile}
              alt={title}
              decoding="async"
              loading="eager"
            />
            <img
              class="w-full h-full object-cover max-h-[420px] hidden sm:block"
              src={image.desktop}
              alt={title}
              decoding="async"
              loading="eager"
            />
          </div>
        )}

      <div class="w-full h-full flex-1 flex flex-col px-10 md:items-center justify-end lg:justify-center order-none">
        <div class="flex flex-col py-10  gap-4">
          <h1
            class={`font-medium text-2xl md:text-3xl lg:text-[2.5rem] block text-left lg:leading-12 text-${style.textAlign} md:max-w-[350px] lg:max-w-[380px]`}
          >
            {title}
          </h1>
          {description !== "" &&
            (
              <p
                class={`text-xl leading-9 font-poppins text-${style.textAlign} max-w-xs`}
              >
                {description}
              </p>
            )}

          {CTA?.buttons && CTA?.buttons?.length > 0
            ? (
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
            )
            : null}
        </div>
      </div>
    </div>
  );
}
