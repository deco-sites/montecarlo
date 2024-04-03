import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";

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
}

export interface Props {
  cardsImage: CardImage[];
}

function CardImage(
  { imageMobile, imageDesktop, alt, title, content, button }: CardImage,
) {
  console.log("button", button);

  return (
    <div class="w-full lg:w-2/4 flex flex-col bg-[#F5F3E7]">
      <Picture>
        <Source
          src={imageMobile}
          width={350}
          height={350}
          media="(max-width: 1023px)"
        />
        <Source
          src={imageDesktop}
          width={700}
          height={342}
          media="(min-width: 1024px)"
        />
        <img class="w-full h-full" src={imageDesktop} alt={alt} />
      </Picture>
      <div class="flex flex-col w-full items-center gap-6 lg:py-11 py-6 lg:px-20 px-8">
        <div class="flex flex-col w-full gap-1">
          {title && (
            <h3 class=" font-semibold text-center text-xl lg:text-3xl">
              {title}
            </h3>
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
          <a
            href={button?.href || ""}
            aria-label="view product"
            class="w-fit py-[10px] px-[14px] bg-primary text-black text-sm"
          >
            {button?.label}
          </a>
        )}
      </div>
    </div>
  );
}

export default function ImagesAndText({ cardsImage }: Props) {
  return (
    <div class="flex flex-col lg:flex-row w-full h-full py-8 gap-2 px-1 max-w-[1408px] mx-auto">
      {cardsImage.map((card) => (
        <CardImage
          imageMobile={card.imageMobile}
          imageDesktop={card.imageDesktop}
          alt={card.alt}
          title={card.title}
          content={card.content}
          button={card.button}
        />
      ))}
    </div>
  );
}