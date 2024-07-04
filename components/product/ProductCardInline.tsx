import {
  SendEventOnClick,
  SendEventOnView,
} from "../../components/Analytics.tsx";
import type { Product } from "apps/commerce/types.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import Image from "apps/website/components/Image.tsx";
import { formatPrice } from "../../sdk/format.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";

export interface Props {
  product: Product;
  itemListName?: string;
}

export default function ProductCardInline({ product, itemListName }: Props) {
  const {
    url,
    productID,
    name = "",
    image: images,
    offers,
    isVariantOf,
    additionalProperty,
  } = product;
  const { listPrice, price, installments } = useOffer(offers);
  const id = `product-card-${productID}`;
  const [front] = images ?? [];

  const newName = parseInt(name) ? isVariantOf?.name : name;

  const eventItem = mapProductToAnalyticsItem({
    product,
    price,
    listPrice,
  });

  return (
    <a href={url} class="flex w-full flex-row opacity-1 gap-2">
      <SendEventOnView
        id={id}
        event={{
          name: "view_item",
          params: {
            currency: "BRL",
            value: price,
            items: [eventItem],
          },
        }}
      />
      <SendEventOnView
        id={id}
        event={{
          name: "view_item_list",
          params: {
            item_list_name: itemListName,
            items: [eventItem],
          },
        }}
      />
      {/* <SendEventOnClick
        id={id}
        event={{
          name: "add_to_cart",
          params: {
            currency: "BRL",
            value: price,
            items: [eventItem],
          },
        }}
      /> */}
      <SendEventOnClick
        id={id}
        event={{
          name: "select_item" as const,
          params: {
            item_list_name: itemListName,
            items: [
              mapProductToAnalyticsItem({
                product,
                price,
                listPrice,
              }),
            ],
          },
        }}
      />
      <Image
        alt={newName}
        width={112}
        height={112}
        src={front.url!}
        preload={false}
        loading={"lazy"}
        decoding={"async"}
      >
      </Image>
      <div class="flex w-full flex-col justify-between px-2 py-2">
        <h3
          class={" text-sm overflow-x-hidden max-h-[37px] line-clamp-2 text-ellipsis"}
        >
          {newName}
        </h3>
        <div
          class={`line-through text-[#9F9584] text-sm font-light min-h-4`}
        >
          {(listPrice && price) && (listPrice > price) && (
            <>{formatPrice(listPrice, offers?.priceCurrency)}</>
          )}
        </div>
        <div
          class={`text-blak font-bold text-sm`}
        >
          {formatPrice(price, offers?.priceCurrency)}
        </div>
      </div>
    </a>
  );
}
