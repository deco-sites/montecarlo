import { ImageWidget } from "apps/admin/widgets.ts";
import type { Product } from "apps/commerce/types.ts";
import Header from "deco-sites/montecarlo/components/ui/SectionHeader.tsx";
import Slider from "deco-sites/montecarlo/components/ui/Slider.tsx";
import ProductCard, {
  Layout as cardLayout,
} from "../../../components/product/ProductCard.tsx";
import { usePlatform } from "deco-sites/montecarlo/sdk/usePlatform.tsx";
import Title from "deco-sites/montecarlo/components/product/Shelf/Title.tsx";
import SubTitle from "deco-sites/montecarlo/components/product/Shelf/SubTitle.tsx";
import { useId } from "deco-sites/montecarlo/sdk/useId.ts";
import CtaCollection from "deco-sites/montecarlo/components/product/Shelf/CtaCollection.tsx";
import SliderJS from "deco-sites/montecarlo/islands/SliderJS.tsx";
import Icon from "deco-sites/montecarlo/components/ui/Icon.tsx";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  title: string;
  subTitle: string;
  /**
   * @description size Image 345x446
   */
  img: {
    image: ImageWidget;
    alt: string;
  };
  products: Product[] | null;
  button: {
    ctaCollection?: string;
    showCtaOnDesktop?: boolean;
    showCtaOnMobile?: boolean;
    hrefCollection?: string;
  };
  cardLayout?: cardLayout;
}

export default function ShelfWithBanner(props: Props) {
  const { title, subTitle, img, products, button, cardLayout } = props;
  const platform = usePlatform();
  const id = useId();

  return (
    <div class="w-full py-8 flex flex-col gap-5 lg:gap-10 lg:py-10 items-center">
      <div class="flex flex-col w-full gap-1">
        <Title text={title} />
        <SubTitle text={subTitle} />
      </div>
      <div
        id={id}
        class={"grid max-w-[1504px] lg:grid-cols-[48px_1fr_48px] grid-rows-[1fr_35%] px-3"}
      >
        <Slider
          class={`row-start-2 carousel carousel-item row-end-5 snap-mandatory snap-start gap-5 sm:gap-2 lg:gap-0 px-14 lg:px-0`}
        >
          <Slider.Item
            index={0}
            class={"carousel-item sm:max-w-1/2 lg:max-w-none lg:snap-start md:w-1/3 lg:w-1/4 w-full snap-center"}
          >
            <Image
              class={"object-cover w-full h-auto pr-1"}
              src={img.image}
              alt={img.alt}
              fetchPriority="low"
              loading={"lazy"}
              width={345}
              height={446}
            />
          </Slider.Item>
          {products?.map((product, index) => (
            <Slider.Item
              index={index + 1}
              class={"carousel-item sm:max-w-1/2 lg:max-w-none lg:snap-start md:w-1/3 lg:w-1/4 w-full snap-center"}
            >
              <ProductCard
                product={product}
                itemListName={title}
                layout={cardLayout}
                platform={platform}
                index={index + 1}
              />
            </Slider.Item>
          ))}
        </Slider>
        <div class="relative z-10 col-start-1 row-start-3 hidden lg:block">
          <Slider.PrevButton class="absolute w-12 h-12 flex justify-center items-center">
            <Icon size={40} id="arrowLeft" strokeWidth={3} />
          </Slider.PrevButton>
        </div>
        <div class="relative z-10 col-start-3 row-start-3 hidden lg:block">
          <Slider.NextButton class="absolute w-12 h-12 flex justify-center items-center">
            <Icon size={40} id="arrowRight" strokeWidth={3} />
          </Slider.NextButton>
        </div>
      </div>
      <SliderJS rootId={id} />
      <CtaCollection
        ctaCollection={button?.ctaCollection}
        hrefCollection={button?.hrefCollection}
        showOnMobile={button?.showCtaOnMobile}
        showOnDesktop={button?.showCtaOnDesktop}
      />
    </div>
  );
}
