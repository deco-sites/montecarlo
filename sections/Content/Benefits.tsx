import type { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";

import Carousel, {
  Props as CarouselProps,
} from "../../components/layout/Carousel.tsx";

interface Benefit {
  label?: string;
  icon: ImageWidget;
  iconAlt?: string;
  description?: string;
}

export interface Props {
  title?: {
    desktop?: HTMLWidget;
    mobile?: HTMLWidget;
  };
  description?: HTMLWidget;
  benefits?: Array<Benefit>;
  slider?: CarouselProps;
}

export default function Benefits({
  title = {
    desktop: "Lorem ipsum dolor sit amet",
    mobile: "Lorem ipsum dolor sit amet",
  },
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  benefits = [
    {
      label: "Lorem ipsum",
      icon: "https://placehold.co/20x20",
      iconAlt: "",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      label: "Lorem ipsum",
      icon: "https://placehold.co/20x20",
      description:
        "Lorem ipsum dolor sit amet, coA cada compra, ganhe 15% de bônus no próximo pedidonsectetur adipiscing elit.",
    },
  ],
  slider,
}: Props) {
  const listOfBenefits = benefits.map((benefit, index) => {
    return (
      <div class="flex flex-col h-full max-w-[127px]">
        <div class="
            relative flex justify-center items-center mb-4 min-h-[100px]
            before:absolute before:w-[70px] before:h-[70px] before:border-2 before:border-black before:rotate-45
          ">
          <img
            height={20}
            width="auto"
            src={benefit.icon}
            alt={benefit.iconAlt}
            decoding="async"
            loading="lazy"
          />
        </div>
        <div class="flex flex-col gap-1 text-center font-poppins">
          <p class="text-sm font-medium">{benefit.label}</p>
          <p class="text-xs font-light">{benefit.description}</p>
        </div>
      </div>
    );
  });

  return (
    <div class="bg-perola-intermediario flex flex-col mx-auto py-12 gap-5 lg:gap-16">
      <div class="flex flex-col gap-3 container px-5">
        {title?.mobile && (
          <h2
            class="text-sm font-poppins block lg:hidden"
            dangerouslySetInnerHTML={{ __html: title.mobile }}
          />
        )}
        {title?.desktop && (
          <h2
            class="text-2xl font-poppins hidden lg:block"
            dangerouslySetInnerHTML={{ __html: title.desktop }}
          />
        )}
        {description && (
          <span
            class="text-sm lg:text-lg font-poppins"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}
      </div>
      <div class="hidden lg:flex container flex-row flex-wrap gap-10 justify-evenly items-start max-w-[1080px]">
        {listOfBenefits}
      </div>
      <div class="block lg:hidden mx-5">
        <Carousel {...slider} children={listOfBenefits} />
      </div>
    </div>
  );
}
