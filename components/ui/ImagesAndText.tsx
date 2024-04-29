import {
  SendEventOnClick,
  SendEventOnView,
} from "../../components/Analytics.tsx";
import { useId } from "../../sdk/useId.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import ButtonLink from "./ButtonLink.tsx";

/**
 * @titleBy title
 */
interface CardImage {
  imageMobile: ImageWidget;
  imageDesktop: ImageWidget;
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
  id: string;
  index: string;
}

export interface Props {
  cardsImage: CardImage[];
}

function CardImage(
  { imageMobile, imageDesktop, alt, title, content, button, id, index }:
    CardImage,
) {
  console.log("button", button);

  return (
    <div class="w-full lg:w-2/4 flex flex-col bg-[#F5F3E7]">
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
      <Picture>
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
            creative_name={title}
            creative_slot={index}
            promotion_id={button?.href}
            promotion_name={button?.label}
            id={id}
          />
        )}
      </div>
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
          id={id}
          index={index.toString()}
        />
      ))}
    </div>
  );
}
