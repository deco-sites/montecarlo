import { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";
import Title from "deco-sites/montecarlo/components/product/Shelf/Title.tsx";
import SubTitle from "deco-sites/montecarlo/components/product/Shelf/SubTitle.tsx";
import Slider from "deco-sites/montecarlo/components/ui/Slider.tsx";
import Image from "apps/website/components/Image.tsx";
import SliderJS from "deco-sites/montecarlo/islands/SliderJS.tsx";
import { useId } from "deco-sites/montecarlo/sdk/useId.ts";
import Icon from "deco-sites/montecarlo/components/ui/Icon.tsx";

/**
 * @titleBy alt
 */
export interface Card {
  alt: string;
  /**
   * @description size Image 168x168
   */
  image: ImageWidget;
  href: string;
}
export interface Props {
  title: string;
  subTitle: HTMLWidget;
  cards: Card[];
}

function Card({ alt, image, href }: Card) {
  return (
    <a class=" w-full h-full group cursor-pointer">
      <div class="flex relative  w-full h-full group">
        <Image
          src={image}
          alt={alt}
          href={href}
          width={350}
          height={350}
          loading="lazy"
          class="object-cover w-full h-full aspect-square"
        />
        <div class="absolute top-0 bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 bg-[#ffc72ce6] z-10 flex justify-center items-center duration-300 ease-in-out">
          <Icon id="instagramIcon" size={50} />
        </div>
      </div>
    </a>
  );
}

function Dots(
  { products, interval = 0 }: {
    products: Card[];
    interval?: number;
  },
) {
  return (
    <>
      <ul class="carousel justify-center col-span-full lg:hidden z-10 row-start-4 w-11/12 mx-auto px-2 pt-2">
        {products?.map((_, index) => (
          <li class="carousel-item">
            <Slider.Dot index={index}>
              <div class="">
                <div
                  class=" h-1 group-disabled:bg-[#CAC7B6] bg-[#F5F3E7] duration-1000 ease-in-out"
                  style={{ width: `calc(91.66vw/${products.length})` }}
                />
              </div>
            </Slider.Dot>
          </li>
        ))}
      </ul>
    </>
  );
}

export default function ListPost(props: Props) {
  const id = useId();

  const { title, subTitle, cards } = props;

  return (
    <div class="w-full py-8 flex flex-col gap-5 lg:gap-10 md:px-0 lg:py-16 items-center container relative max-w-[1512px] lg:px-14">
      <div class="flex flex-col w-full gap-2 lg:gap-4">
        <Title text={title} />
        <SubTitle text={subTitle} />
      </div>
      <div
        id={id}
        class={"grid max-w-[1504px] px-0 w-full h-full"}
      >
        <Slider class="row-start-2 carousel carousel-item row-end-4 snap-mandatory snap-start px-2 gap-2 mb-7 lg:mb-0 lg:px-0 lg:justify-center">
          {cards.map((card, index) => (
            <Slider.Item
              index={index}
              class="carousel-item w-[calc(50%-0.25rem)] h-full justify-center items-center snap-start lg:first:pl-0 first:pl-2 sm:w-[calc(33%-0.25rem)] lg:w-[calc(16.76%-0.5rem)]"
            >
              <Card alt={card.alt} image={card.image} href={card.href} />
            </Slider.Item>
          ))}
        </Slider>
        <SliderJS rootId={id} />
        <Dots products={cards} interval={0} />
      </div>
    </div>
  );
}
