import { AnalyticsItem } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { useCallback, useState } from "preact/hooks";
import Button from "../../../components/ui/Button.tsx";
import Icon from "../../../components/ui/Icon.tsx";
import QuantitySelector from "../../../components/ui/QuantitySelector.tsx";
import { sendEvent } from "../../../sdk/analytics.tsx";
import { formatPrice } from "../../../sdk/format.ts";
import { SendEventOnClick, SendEventOnView } from "../../Analytics.tsx";

export interface Item {
  image: {
    src: string;
    alt: string;
  };
  name: string;
  quantity: number;
  price: {
    sale: number;
    list: number;
  };
  skuName?: string;
}

export interface Props {
  item: Item;
  index: number;

  locale: string;
  currency: string;

  onUpdateQuantity: (quantity: number, index: number) => Promise<void>;
  itemToAnalyticsItem: (index: number) => AnalyticsItem | null | undefined;
}

function CartItem(
  {
    item,
    index,
    locale,
    currency,
    onUpdateQuantity,
    itemToAnalyticsItem,
  }: Props,
) {
  const { image, name, price: { sale, list }, quantity, skuName } = item;
  const isGift = sale < 0.01;
  const [loading, setLoading] = useState(false);

  const numberAro = skuName && parseInt(skuName);

  const withLoading = useCallback(
    <A,>(cb: (args: A) => Promise<void>) => async (e: A) => {
      try {
        setLoading(true);
        await cb(e);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const teste: AnalyticsItem = itemToAnalyticsItem(index)!;

  return (
    <div
      class="grid grid-rows-1 gap-3"
      style={{
        gridTemplateColumns: "auto 1fr",
      }}
    >
      <Image
        {...image}
        src={image.src.replace("55-55", "255-255")}
        width={89}
        height={89}
        class="h-full object-contain aspect-square border border-[#E0DFD6]"
      />

      <div class="flex flex-col justify-between">
        <div class="flex justify-between items-center gap-1">
          <span class=" text-xs line-clamp-2 leading-4 text-black">{name}</span>
          <Button
            disabled={loading || isGift}
            loading={loading}
            class="w-auto h-auto self-start"
            onClick={withLoading(async () => {
              const analyticsItem = itemToAnalyticsItem(index);

              await onUpdateQuantity(0, index);

              analyticsItem && sendEvent({
                name: "remove_from_cart",
                params: { items: [analyticsItem] },
              });
            })}
          >
            <SendEventOnClick
              id=""
              event={{
                name: "remove_from_cart",
                params: {
                  currency: "BRL",
                  value: list,
                  items: [teste],
                },
              }}
            />
            <Icon id="Delete" width={16} height={18} class={"text-[#CAC7B6]"} />
          </Button>
        </div>
        <div>
          {!Number.isNaN(numberAro) && (
            <span class="text-xs font-medium">Aro do anel: {numberAro}</span>
          )}
        </div>
        <div class="flex justify-between">
          <QuantitySelector
            disabled={loading || isGift}
            quantity={quantity}
            onChange={withLoading(async (quantity) => {
              const analyticsItem = itemToAnalyticsItem(index);
              const diff = quantity - item.quantity;

              await onUpdateQuantity(quantity, index);

              if (analyticsItem) {
                sendEvent({
                  name: diff < 0 ? "remove_from_cart" : "add_to_cart",
                  params: {
                    items: [{ ...analyticsItem, quantity: Math.abs(diff) }],
                  },
                });
              }
            })}
          />
          <div class="flex flex-col justify-end items-end">
            {sale != list && (
              <span class="text-[#AAA89C] text-xs line-through">
                {formatPrice(list, currency, locale)}
              </span>
            )}
            <span class="text-base text-black font-semibold self-end">
              {isGift ? "Grátis" : formatPrice(sale, currency, locale)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
