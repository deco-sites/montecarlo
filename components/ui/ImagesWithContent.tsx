import { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";
import { useUI } from "deco-sites/montecarlo/sdk/useUI.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  primaryImage: {
    srcDesktop: ImageWidget;
    srcMobile: ImageWidget;
    alt: string;
    variant: "variant1" | "variant2" | "variant3" | "variant4";
    preload: boolean;
    showMobile?: boolean;
  };
  secondImage: {
    srcDesktop: ImageWidget;
    srcMobile: ImageWidget;
    alt: string;
    variant: "variant1" | "variant2" | "variant3" | "variant4";
    preload: boolean;
    showMobile?: boolean;
  };
  title: string;
  subTitle: string;
  content: HTMLWidget;
  /** @format color-input */
  background: string;
  layout: "variant1" | "variant2";
}

const GRIDLAYOUT = {
  "variant1":
    "lg:col-start-1 lg:row-start-1 lg:col-end-3 lg:row-end-1 flex object-cover",
  "variant2":
    "lg:col-start-2 lg:row-start-3 lg:col-end-3 lg:row-end-2 flex object-cover",
  "variant3":
    "lg:col-start-2 lg:row-start-2 lg:col-end-3 lg:row-end-2 flex object-cover",
  "variant4":
    "lg:col-start-1 lg:row-start-1 lg:col-end-2 lg:row-end-2 flex object-cover",
};

const GRIDCONTAINER = {
  "variant1": "lg:grid-rows-[70%_30%]",
  "variant2": "lg:grid-rows-[30%_70%]",
};

export default function ImagesWithContent(props: Props) {
  const {
    primaryImage,
    secondImage,
    title,
    subTitle,
    content,
    background,
    layout,
  } = props;
  const { isMobile } = useUI();

  return (
    <div style={{ background: background }} class="flex flex-col lg:flex-row">
      <div class="flex flex-col lg:flex-row max-w-[1512px] mx-auto">
        <div
          class={`grid grid-cols-1 lg:grid-cols-2 ${
            GRIDCONTAINER[layout]
          } lg:w-2/4`}
        >
          {isMobile.value && primaryImage.showMobile
            ? (
              <Image
                src={primaryImage.srcDesktop}
                alt={primaryImage.alt}
                preload={primaryImage.preload}
                fetchPriority={primaryImage.preload ? "high" : "low"}
                width={350}
                height={275}
                class="w-full h-auto "
              />
            )
            : !isMobile.value &&
              (
                <Image
                  src={primaryImage.srcDesktop}
                  alt={primaryImage.alt}
                  preload={primaryImage.preload}
                  fetchPriority={primaryImage.preload ? "high" : "low"}
                  width={756}
                  height={636}
                  class={`w-full h-full ${GRIDLAYOUT[primaryImage.variant]}`}
                />
              )}
          {isMobile.value && secondImage.showMobile
            ? (
              <Image
                src={secondImage.srcDesktop}
                alt={secondImage.alt}
                preload={secondImage.preload}
                fetchPriority={secondImage.preload ? "high" : "low"}
                width={350}
                height={275}
                class="w-full h-auto"
              />
            )
            : !isMobile.value && (
              <Image
                src={secondImage.srcDesktop}
                alt={secondImage.alt}
                preload={secondImage.preload}
                fetchPriority={secondImage.preload ? "high" : "low"}
                width={756}
                height={636}
                class={`w-full h-full ${GRIDLAYOUT[secondImage.variant]}`}
              />
            )}
        </div>
        <div class="pt-16 xl:pt-28 pl-14 xl:pl-24 pr-6 pb-16 xl:pb-28 text-black lg:w-2/4 xl:max-w-[560px]">
          <h2 class="font-beausiteGrand text-4xl mb-8 xl:text-[3.3rem] xl:leading-12 xl:mb-9">
            {title}
          </h2>
          <h4 class="text-xl font-medium mb-6 xl:text-2xl xl:mb-5">
            {subTitle}
          </h4>
          <span
            class="text-xl xl:text-lg"
            dangerouslySetInnerHTML={{ __html: content }}
          >
          </span>
        </div>
      </div>
    </div>
  );
}
