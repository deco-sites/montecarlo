import { AnalyticsItem } from "apps/commerce/types.ts";
import Button from "../../../../components/ui/Button.tsx";
import Icon from "../../../../components/ui/Icon.tsx";
import { sendEvent } from "../../../../sdk/analytics.tsx";
import { useUI } from "../../../../sdk/useUI.ts";
import { SendEventOnClick, SendEventOnView } from "../../../Analytics.tsx";

interface Props {
  loading: boolean;
  currency: string;
  total: number;
  items: AnalyticsItem[];
}

function CartButton({ loading, currency, total, items }: Props) {
  const { displayCart } = useUI();
  const totalItems = items.length;

  const onClick = () => {
    sendEvent({
      name: "view_cart",
      params: { currency, value: total, items },
    });
    displayCart.value = true;
  };

  return (
    <div class="indicator">
      <span
        class={`indicator-item badge badge-secondary badge-sm ${
          totalItems === 0 ? "hidden" : ""
        }`}
      >
        {totalItems > 9 ? "9+" : totalItems}
      </span>

      <Button
        class="btn-circle btn-sm btn-ghost flex justify-center items-center"
        aria-label="open cart"
        data-deco={displayCart.value && "open-cart"}
        loading={loading}
        onClick={onClick}
      >
        <Icon id="ShippingCustom" width={18} height={22} strokeWidth={2} />
        <SendEventOnClick
          id=""
          event={{
            name: "view_cart",
            params: {
              currency: "BRL",
              value: total,
              items: items,
            },
          }}
        />
      </Button>
    </div>
  );
}

export default CartButton;
