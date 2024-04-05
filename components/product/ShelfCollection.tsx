import { SendEventOnView } from "../../components/Analytics.tsx";
import MiniProductCard, {
  Layout as cardLayout,
} from "../../components/product/MiniProductCard.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Header from "../../components/ui/SectionHeader.tsx";
import Slider from "../../components/ui/Slider.tsx";
import SliderJS from "../../islands/SliderJS.tsx";
import { useId } from "../../sdk/useId.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { clx } from "../../sdk/clx.ts";
import ButtonLink from "../ui/ButtonLink.tsx";

export interface Props {
  products: Product[] | null;
  title?: string;
  /**
   * @format html
   */
  subTitle?: string;
  layout?: {
    numberOfSliders?: {
      mobile?: 1 | 2 | 3 | 4 | 5;
      desktop?: 1 | 2 | 3 | 4 | 5 | 6;
    };
    headerAlignment?: "center" | "left";
    headerfontSize?: "Normal" | "Large" | "Small";
    showArrows?: boolean;
    ctaCollection?: string;
    hrefCollection?: string;
  };
  cardLayout?: cardLayout;
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
  return (
    <div class="w-full py-8 flex flex-col gap-5 lg:gap-10 lg:py-10 bg-[#E0DFD6] lg:bg-white items-center">
      <div class="flex flex-col w-full gap-1">
        {title && (
          <h2 class=" font-semibold text-center text-xl lg:text-3xl">
            {title}
          </h2>
        )}
        {subTitle && (
          <span
            dangerouslySetInnerHTML={{ __html: subTitle }}
            class=" font-medium text-center text-sm lg:text-base"
          >
          </span>
        )}
      </div>
      <div
        id={id}
        class={clx(
          "grid max-w-[1488px]",
          layout?.showArrows &&
            "lg:grid-cols-[48px_1fr_48px] grid-rows-[1fr_35%] ",
          "px-0",
        )}
      >
        <Slider class="row-start-2 lg:carousel lg:carousel-item row-end-5 customScroll snap-mandatory snap-start">
          {products?.map((product, index) => (
            <Slider.Item
              index={index}
              class={clx(
                "carousel-item",
                slideDesktop[layout?.numberOfSliders?.desktop ?? 3],
                slideMobile[layout?.numberOfSliders?.mobile ?? 1],
              )}
            >
              <MiniProductCard
                product={product}
                itemListName={title}
                layout={cardLayout}
                platform={platform}
                index={index}
              />
            </Slider.Item>
          ))}
        </Slider>

        {layout?.showArrows && (
          <>
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
          </>
        )}
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
      </div>
      {layout?.ctaCollection && (
        <ButtonLink
          href={layout?.hrefCollection || ""}
          classCustom={"text-black text-sm lg:hidden"}
          label={layout?.ctaCollection}
        />
      )}
    </div>
  );
}

export default ShelfCollection;
