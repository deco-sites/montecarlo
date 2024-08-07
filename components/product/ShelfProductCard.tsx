import type { Platform } from "../../apps/site.ts";
import {
  SendEventOnClick,
  SendEventOnView,
} from "../../components/Analytics.tsx";
import Avatar from "../../components/ui/Avatar.tsx";
import WishlistButtonVtex from "../../islands/WishlistButton/vtex.tsx";
import WishlistButtonWake from "../../islands/WishlistButton/vtex.tsx";
import { formatPrice } from "../../sdk/format.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { useVariantPossibilities } from "../../sdk/useVariantPossiblities.ts";
import { useMaterialProducts } from "../../sdk/useMaterialProducts.ts";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";
import { relative } from "../../sdk/url.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import type { Material } from "../../loaders/Layouts/MaterialProduct.tsx";

import Flags from "./Flags/Flags.tsx";
import { GroupVariants } from "deco-sites/montecarlo/loaders/Product/SimilarProductShelf.ts";

interface Name {
  /**
   * @title Product Name fontSize
   * @format button-group
   * @options deco-sites/montecarlo/loaders/icons.ts
   */
  fontSize?: "Small" | "Normal" | "Large";
}
interface Price {
  /**
   * @title Price fontSize
   * @format button-group
   * @options deco-sites/montecarlo/loaders/icons.ts
   */
  fontSize?: "Small" | "Normal" | "Large";
}

export interface Layout {
  onMouseOver?: {
    image?: "Change image" | "Zoom image" | "None";
    showCta?: boolean;
    ctaText?: string;
  };
  name?: Name;
  price?: Price;
  materialImages?: Material[];
  releaseFlag?: {
    text?: string;
    /** @format color-input */
    backgroundColor?: string;
    /** @format color-input */
    fontColor?: string;
  };
  discountFlag?: {
    initialText?: string;
    finalText?: string;
    /** @format color-input */
    backgroundColor?: string;
    /** @format color-input */
    fontColor?: string;
  };
}

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  //   itemListName?: string;

  /** @description index of the product card in the list */
  index?: number;

  layout?: Layout;
  platform?: Platform;
  code?: GroupVariants | null;
}

const WIDTH = 200;
const HEIGHT = 200;

const PROPS_FONT_SIZE = {
  "Small": "text-sm",
  "Normal": "text-base",
  "Large": "text-lg",
};

function ShelfProductCard({
  product,
  preload,
  //   itemListName,
  layout,
  platform,
  index,
  code,
}: Props) {
  const {
    url,
    productID,
    name = "",
    image: images,
    offers,
    isVariantOf,
    additionalProperty,
  } = product;
  const id = `product-card-${productID}`;
  const hasVariant = isVariantOf?.hasVariant ?? [];
  const productGroupID = isVariantOf?.productGroupID;
  const description = product.description || isVariantOf?.description;
  const [front, back] = images ?? [];
  const { listPrice, price, installments } = useOffer(offers);
  const possibilities = useVariantPossibilities(hasVariant, product);
  const variants = Object.entries(Object.values(possibilities)[0] ?? {});
  const materials = isVariantOf &&
    useMaterialProducts(isVariantOf.additionalProperty);

  const newName = parseInt(name) ? isVariantOf?.name : name;

  const l = layout;
  const align = "center";
  const relativeUrl = relative(url);

  const skuSelector = variants.map(([value, link]) => {
    const relativeLink = relative(link);
    return (
      <li>
        <a href={relativeLink}>
          <Avatar
            variant={relativeLink === relativeUrl
              ? "active"
              : relativeLink
                ? "default"
                : "disabled"}
            content={value}
          />
        </a>
      </li>
    );
  });

  const cta = (
    <a
      href={url && relative(url)?.split("?")[0]}
      aria-label="view product"
      class="w-full md:w-fit justify-center py-[10px] px-[14px] hidden group-hover:flex hover:opacity-75 duration-200 text-black mt-3 font-poppins text-sm bg-[#FFC72C]"
    >
      {l?.onMouseOver?.ctaText || "Ver produto"}
    </a>
  );

  const eventItem = mapProductToAnalyticsItem({
    product,
    price,
    listPrice,
  });

  const discountFlagValues = {
    ...layout?.discountFlag,
    oldPrice: listPrice,
    newPrice: price,
  };

  return (
    <div
      id={id}
      class={`card-compact group w-full h-full gap-2 text-center rounded-none relative my-4`}
      data-deco="view-product"
    >
      <Flags
        productAdditionalProperty={product.isVariantOf?.additionalProperty}
        releaseFlag={layout?.releaseFlag}
        discountFlag={discountFlagValues}
      />
      <figure
        class="relative overflow-hidden mb-2"
        style={{ aspectRatio: `${WIDTH} / ${HEIGHT}` }}
      >
        {/* Product Images */}
        <a
          href={url && relative(url)?.split("?")[0]}
          aria-label="view product"
          class="grid grid-cols-1 grid-rows-1 w-full border border-[#E0DFD6]"
        >
          <Image
            src={front.url!}
            alt={front.alternateName}
            width={WIDTH}
            height={HEIGHT}
            class={`bg-base-100 col-span-full row-span-full  w-full ${l?.onMouseOver?.image == "Zoom image"
              ? "duration-100 transition-scale scale-100 lg:group-hover:scale-125"
              : ""
              }`}
            sizes="(max-width: 640px) 50vw, 20vw"
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            decoding="async"
          />
          {(!l?.onMouseOver?.image ||
            l?.onMouseOver?.image == "Change image")
            ? (
              <Image
                src={back?.url ?? front.url!}
                alt={back?.alternateName ?? front.alternateName}
                width={WIDTH}
                height={HEIGHT}
                class="bg-base-100 col-span-full row-span-full transition-opacity w-full opacity-0 lg:group-hover:opacity-100"
                sizes="(max-width: 640px) 50vw, 20vw"
                loading="lazy"
                decoding="async"
              />
            )
            : (null)}
        </a>
      </figure>
      {/* Prices & Name */}
      <div class="flex-auto flex flex-col justify-between text-start">
        <div class="flex flex-col gap-0">
          <h3
            class={`truncate font-normal ${PROPS_FONT_SIZE[layout?.name?.fontSize || "Small"]
              }`}
            dangerouslySetInnerHTML={{ __html: newName ?? "" }}
          />
        </div>
        <div class="flex w-full h-auto flex-1 py-1 min-h-4 gap-1 rounded-sm">
          {code?.variants.map((item) => {
            if (!layout?.materialImages || layout?.materialImages === undefined) {
              return null;
            }

            const img = layout?.materialImages.find((img) => img.name === item.message);

            if (!img || img === undefined) {
              return null;
            }
            return (
              <Image
                class="h-min rounded-sm"
                src={img.image}
                width={15}
                height={15}
                alt={img.name}
              />
            );
          })}
        </div>
        <div class="flex flex-col gap-2">
          <div
            class={`flex flex-col gap-0 justify-between group-hover:hidden`}
          >
            <div
              class={`line-through text-[#9F9584] text-xs font-light min-h-4`}
            >
              {(listPrice && price) && (listPrice > price) && (
                <>{formatPrice(listPrice, offers?.priceCurrency)}</>
              )}
            </div>
            <div
              class={`text-blak font-bold ${PROPS_FONT_SIZE[layout?.price?.fontSize || "Small"]
                }`}
            >
              {formatPrice(price, offers?.priceCurrency)}
            </div>
            <div class="text-black text-xs font-light min-h-4">
              {installments}
            </div>
          </div>
        </div>
        {l?.onMouseOver?.showCta && l?.onMouseOver.ctaText && cta}
      </div>
    </div>
  );
}

export default ShelfProductCard;
