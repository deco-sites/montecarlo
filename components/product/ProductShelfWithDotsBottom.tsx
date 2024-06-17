import ProductCard, {
  Layout as cardLayout,
} from "../../components/product/ProductCard.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Slider from "../../components/ui/Slider.tsx";
import { SendEventOnView } from "../../components/Analytics.tsx";
import CtaCollection from "./Shelf/CtaCollection.tsx";
import Title from "./Shelf/Title.tsx";
import SubTitle from "./Shelf/SubTitle.tsx";

import SliderJS from "../../islands/SliderJS.tsx";

import { useId } from "../../sdk/useId.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import { useUI } from "../../sdk/useUI.ts";
import { clx } from "../../sdk/clx.ts";

import type { Product } from "apps/commerce/types.ts";

import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";

export interface Props {
  products: Product[] | null;
  title?: string;
  subTitle?: string;
  layout?: {
    numberOfSliders?: {
      mobile?: 1 | 2 | 3 | 4 | 5;
      desktop?: 1 | 2 | 3 | 4 | 5 | 6;
    };
    showArrows?: boolean;
    ctaCollection?: string;
    showCtaOnDesktop?: boolean;
    showCtaOnMobile?: boolean;
    hrefCollection?: string;
    showDots?: boolean;
  };
  cardLayout?: cardLayout;
}

function Dots(
  { images }: {
    images: Product[][];
  },
) {
  return (
    <>
      <div class="w-[60%] md:w-[90%] flex mx-auto">
        <div class="mx-auto overflow-y-scroll md:overflow-auto">
          <ul class="carousel col-span-full gap-3 lg:gap-5 z-10 row-start-4 w-full">
            {images?.map((_, index) => (
              <li class="carousel-item bg-#F5F3E7">
                <Slider.Dot index={index}>
                  <div class="py-5">
                    <div class="w-5 h-[0.2rem] rounded-lg lg:w-[30px] group-disabled:bg-[#CAC7B6] bg-[#F5F3E7]" />
                  </div>
                </Slider.Dot>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

function ShelfCollection({
  products,
  title,
  subTitle,
  layout,
  cardLayout,
}: Props) {
  const id = useId();
  const platform = usePlatform();

  if (!products || products.length === 0) {
    return null;
  }
  const slideDesktop = {
    1: "md:w-full",
    2: "md:w-1/2",
    3: "md:w-1/3",
    4: "md:w-1/4",
    5: "md:w-1/5",
    6: "md:w-1/6",
  };

  const slideMobile = {
    1: "w-full",
    2: "w-1/2",
    3: "w-1/3",
    4: "w-1/4",
    5: "w-1/5",
  };

  const { isMobile } = useUI();

  let numberPerView = 2;
  const groupByNumberOfSlides = [];

  if (isMobile.value) {
    numberPerView = layout?.numberOfSliders?.mobile || 2;
  } else {
    numberPerView = layout?.numberOfSliders?.desktop || 6;
  }

  while (products.length > 0) {
    groupByNumberOfSlides.push(products.splice(0, numberPerView));
  }

  return (
    <div class="w-full py-8 flex flex-col gap-5 lg:gap-10 md:px-0 lg:py-10 items-center container relative">
      <div class="flex flex-col w-full gap-2 lg:gap-4">
        <Title text={title} />
        <SubTitle text={subTitle} />
      </div>
      <div
        id={id}
        class={clx(
          "grid container",
          "px-0",
        )}
      >
        <Slider class="row-start-2 carousel carousel-item row-end-5 snap-mandatory snap-start w-[80%] md:w-[90%] mx-auto">
          {groupByNumberOfSlides?.map((productGroup, indexOne) => {
            return (
              <Slider.Item
                index={indexOne}
                class={clx(
                  "carousel-item justify-center",
                  slideDesktop[1],
                  slideMobile[1],
                )}
              >
                {productGroup.map((product, index) => {
                  return (
                    <div
                      class={`${
                        slideMobile[layout?.numberOfSliders?.mobile ?? 1]
                      } ${slideDesktop[layout?.numberOfSliders?.desktop ?? 6]}`}
                    >
                      <ProductCard
                        product={product}
                        itemListName={title}
                        layout={cardLayout}
                        platform={platform}
                        index={index}
                      />
                    </div>
                  );
                })}
              </Slider.Item>
            );
          })}
        </Slider>
        <SliderJS rootId={id} />
        <SendEventOnView
          id={id}
          event={{
            name: "view_item_list",
            params: {
              item_list_name: title,
              items: products.map((product, index) =>
                mapProductToAnalyticsItem({
                  index,
                  product,
                  ...(useOffer(product.offers)),
                })
              ),
            },
          }}
        />
        <div class="w-[100vw] mt-10 max-w-[512px] mx-auto">
          {layout?.showArrows && (
            <>
              <div class="z-10 col-start-1 row-start-3 absolute left-0 top-[37%] lg:top-[42%] lg:block">
                <Slider.PrevButton class="absolute w-12 h-12 flex justify-center items-center">
                  <Icon size={40} id="arrowLeft" strokeWidth={3} />
                </Slider.PrevButton>
              </div>
              <div class="absolute right-0 top-[37%] lg:top-[42%] z-10 col-start-3 row-start-3 lg:block">
                <Slider.NextButton class="absolute w-12 h-12 flex justify-center items-center right-0">
                  <Icon size={40} id="arrowRight" strokeWidth={3} />
                </Slider.NextButton>
              </div>
            </>
          )}
          {layout?.showDots && <Dots images={groupByNumberOfSlides} />}
        </div>
      </div>

      <CtaCollection
        ctaCollection={layout?.ctaCollection}
        hrefCollection={layout?.hrefCollection}
        showOnMobile={layout?.showCtaOnMobile}
        showOnDesktop={layout?.showCtaOnDesktop}
      />
    </div>
  );
}

export default ShelfCollection;
