import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import ButtonLink from "./ButtonLink.tsx";
import { Colors } from "deco-sites/montecarlo/constants.tsx";
import {
  SendEventOnClick,
  SendEventOnView,
} from "../../components/Analytics.tsx";
import { useId } from "../../sdk/useId.ts";

/**
 * @titleBy title
 */
interface CardImage {
  imageMobile: ImageWidget;
  imageDesktop: ImageWidget;
  preload?: boolean;
  alt: string;
  title: string;
  /**
   * @format html
   */
  content: string;
  button?: {
    label?: string;
    href?: string;
  };
  /** @format color-input */
  backgrond?: string;
  variant?: "Variant 1" | "Variant 2";
  id: string;
  index: string;
}

export interface Props {
  cardsImage: CardImage[];
}

function CardImage(
  {
    imageMobile,
    imageDesktop,
    alt,
    title,
    content,
    button,
    backgrond,
    preload,
    variant = "Variant 1",
    id,
    index,
  }: CardImage,
) {
  console.log("button", button);

  return (
    <div
      class="w-full lg:w-2/4 flex flex-col "
      style={{ background: backgrond }}
    >
      {variant == "Variant 1"
        ? (
          <>
            <Picture preload={preload}>
              <Source
                src={imageMobile}
                width={350}
                height={350}
                media="(max-width: 1023px)"
                fetchPriority="low"
                loading={"lazy"}
              />
              <Source
                src={imageDesktop}
                width={700}
                height={342}
                media="(min-width: 1024px)"
                fetchPriority="low"
                decoding="async"
                loading={"lazy"}
              />
              <img
                class="w-full h-full"
                src={imageDesktop}
                alt={alt}
                loading="lazy"
              />
            </Picture>
            <div class="flex flex-col w-full items-center gap-6 lg:py-11 py-6 lg:px-20 px-8">
              <div class="flex flex-col w-full gap-1">
                {title && (
                  <h2 class=" font-semibold text-center text-xl lg:text-3xl">
                    {title}
                  </h2>
                )}
                {content && (
                  <span
                    dangerouslySetInnerHTML={{ __html: content }}
                    class=" text-center text-sm lg:text-base font-semibold"
                  >
                  </span>
                )}
              </div>
              {button?.label && (
                <ButtonLink
                  href={button?.href || ""}
                  classCustom={"text-black text-sm"}
                  label={button?.label}
                />
              )}
            </div>
          </>
        )
        : variant == "Variant 2"
        ? (
          <>
            <div class="relative w-full h-full">
              <Picture preload={preload}>
                <Source
                  src={imageMobile}
                  width={350}
                  height={350}
                  media="(max-width: 1023px)"
                  fetchPriority="low"
                  loading={"lazy"}
                />
                <Source
                  src={imageDesktop}
                  width={700}
                  height={342}
                  media="(min-width: 1024px)"
                  fetchPriority="low"
                  decoding="async"
                  loading={"lazy"}
                />
                <img
                  class="w-full h-full"
                  src={imageDesktop}
                  alt={alt}
                  loading="lazy"
                />
              </Picture>
              <div class="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-b to-[#00000087] via-transparent from-transparent flex justify-center items-end">
                {title && (
                  <h2 class=" text-center text-4xl lg:text-5xl mb-7 font-beausiteGrand text-primary">
                    {title}
                  </h2>
                )}
              </div>
            </div>
            <div class="flex flex-col w-full items-center gap-6 lg:pt-7 lg:pb-4 py-6 lg:px-8 px-10">
              {content && (
                <span
                  dangerouslySetInnerHTML={{ __html: content }}
                  class=" text-center text-sm xl:text-base font-medium"
                >
                </span>
              )}
            </div>
            {button?.label && (
              <ButtonLink
                href={button?.href || ""}
                classCustom={"text-black text-sm mx-auto"}
                label={button?.label}
              />
            )}
          </>
        )
        : (
          <>
          </>
        )}
      <SendEventOnView
        id={id}
        event={{
          name: "view_promotion",
          params: {
            creative_name: title,
            creative_slot: index,
            promotion_id: button?.href,
            promotion_name: button?.label,
          },
        }}
      />
    </div>
  );
}

export default function ImagesAndText({ cardsImage }: Props) {
  const id = useId();
  return (
    <div class="flex flex-col lg:flex-row w-full h-full py-8 gap-2 px-1 max-w-[1408px] mx-auto">
      {cardsImage.map((card, index) => (
        <CardImage
          imageMobile={card.imageMobile}
          imageDesktop={card.imageDesktop}
          alt={card.alt}
          title={card.title}
          content={card.content}
          button={card.button}
          variant={card.variant}
          backgrond={card.backgrond}
          preload={card.preload}
          id={id}
          index={index.toString()}
        />
      ))}
    </div>
  );
}
