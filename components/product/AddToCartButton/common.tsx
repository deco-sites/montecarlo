import { AddToCartParams } from "apps/commerce/types.ts";
import { useState } from "preact/hooks";
import Button from "../../../components/ui/Button.tsx";
import { sendEvent } from "../../../sdk/analytics.tsx";
import { useUI } from "../../../sdk/useUI.ts";
import { useId } from "../../../sdk/useId.ts";
import {
  SendEventOnClick,
  SendEventOnView,
} from "../../../components/Analytics.tsx";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";

export interface Props {
  /** @description: sku name */
  eventParams: AddToCartParams;
  onAddItem: () => Promise<void>;
  price?: number;
}

const useAddToCart = ({ eventParams, onAddItem, price }: Props) => {
  const [loading, setLoading] = useState(false);
  const { displayCart } = useUI();

  const onClick = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setLoading(true);

      await onAddItem();

      sendEvent({
        name: "add_to_cart",
        params: eventParams,
      });

      displayCart.value = true;
    } finally {
      setLoading(false);
    }
  };

  return { onClick, loading, "data-deco": "add-to-cart" };
};

export default function AddToCartButton(props: Props) {
  const btnProps = useAddToCart(props);
  const id = useId();

  return (
    <Button
      {...btnProps}
      class="bg-primary text-black font-semibold py-3 w-full hover:opacity-80 duration-300"
    >
      <SendEventOnClick
        id={id}
        event={{
          name: "add_to_cart",
          params: {
            currency: "BRL",
            value: props.price,
            items: props.eventParams.items,
          },
        }}
      />
      Comprar
    </Button>
  );
}
