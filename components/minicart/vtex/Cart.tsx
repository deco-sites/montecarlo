import { itemToAnalyticsItem, useCart } from "apps/vtex/hooks/useCart.ts";
import BaseCart from "../common/Cart.tsx";
import type { Props as PropsBonus } from "deco-sites/montecarlo/components/product/Modal/BonusCart.tsx";

interface Props {
  bonus?: PropsBonus;
}

function Cart({ bonus }: Props) {
  const { cart, loading, updateItems, addCouponsToCart } = useCart();
  const { items, totalizers } = cart.value ?? { items: [] };
  const total = totalizers?.find((item) => item.id === "Items")?.value || 0;
  const discounts =
    (totalizers?.find((item) => item.id === "Discounts")?.value || 0) * -1;
  const locale = cart.value?.clientPreferencesData.locale ?? "pt-BR";
  const currency = cart.value?.storePreferencesData.currencyCode ?? "BRL";
  const coupon = cart.value?.marketingData?.coupon ?? undefined;

  console.log("orderFormId", cart.value?.orderFormId);

  return (
    <BaseCart
      items={items.map((item) => ({
        image: { src: item.imageUrl, alt: item.skuName },
        quantity: item.quantity,
        name: item.name,
        price: {
          sale: item.sellingPrice / 100,
          list: item.listPrice / 100,
        },
        skuName: item.skuName,
        id: item.id,
        seller: item.seller,
      }))}
      orderFormId={cart.value?.orderFormId}
      total={(total - discounts) / 100}
      subtotal={total / 100}
      discounts={discounts / 100}
      locale={locale}
      currency={currency}
      loading={loading.value}
      freeShippingTarget={400}
      coupon={coupon}
      onAddCoupon={(text) => addCouponsToCart({ text })}
      onUpdateQuantity={(quantity, index) =>
        updateItems({ orderItems: [{ index, quantity }] })}
      itemToAnalyticsItem={(index) => {
        const item = items[index];

        return item && itemToAnalyticsItem({ ...item, coupon }, index);
      }}
      checkoutHref="/checkout"
      bonus={bonus}
    />
  );
}

export default Cart;
