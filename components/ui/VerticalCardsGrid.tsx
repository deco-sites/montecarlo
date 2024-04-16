import { ImageWidget } from "apps/admin/widgets.ts";

import Title from "./../product/Shelf/Title.tsx";
import SubTitle from "./../product/Shelf/SubTitle.tsx";
import CtaCollection from "./../product/Shelf/CtaCollection.tsx";

import Slider from "../../components/ui/Slider.tsx";
import { clx } from "../../sdk/clx.ts";

export interface Card {
  image: ImageWidget;
  altText?: string;
  title: string;
  subTitle: string;
  linkToRedirect: string;
}

export interface Props {
  title?: string;
  /**
   * @format html
   */
  subTitle?: string;
  cards: Card[];
  cta?: {
    ctaCollection: string;
    hrefCollection: string;
    showOnDesktop: boolean;
    showOnMobile: boolean;
  };
}

function VerticalCard({ card, index }: { card: Card; index: number }) {
  return (
    <a href={card.linkToRedirect} title={"Ir para a página de " + card.title}>
      <div
        class={`w-[60vw] sm:w-[33vw] lg:w-[230px] 2xl:w-[280px] mr-7 lg:mr-0 ${
          index == 0 ? "ml-6 lg:ml-0" : ""
        }`}
      >
        <img class="w-full h-[340px] object-cover 2xl:h-[400px]" src={card.image} alt={card.altText} />
        <div class="text-center mt-4">
          <h3 class="text-xl font-medium">{card.title}</h3>
          <h4 class="text-sm font-light">{card.subTitle}</h4>
        </div>
      </div>
    </a>
  );
}

function VerticalCardsGrid({ title, subTitle, cards, cta }: Props) {
  return (
    <div class="mt-12 lg:container lg:flex lg:justify-center lg:flex-col">
      <div class="flex justify-center gap-2 lg:gap-4 flex-col mb-12">
        <Title text={title} />
        <SubTitle text={subTitle} />
      </div>
      <Slider class="row-start-2 carousel carousel-item row-end-5 snap-mandatory snap-start lg:self-center lg:flex-wrap lg:justify-center lg:gap-6">
        {cards.map((card, index) => (
          <Slider.Item
            index={index}
            class={clx(
              "carousel-item ",
              "1",
              "1",
            )}
          >
            <VerticalCard card={card} index={index} />
          </Slider.Item>
        ))}
      </Slider>
      <CtaCollection
        ctaCollection={cta?.ctaCollection}
        hrefCollection={cta?.hrefCollection}
        showOnDesktop={cta?.showOnDesktop}
        showOnMobile={cta?.showOnMobile}
        customClass="whitespace-nowrap mx-auto mt-5 lg:mt-10"
      />
    </div>
  );
}

export default VerticalCardsGrid;