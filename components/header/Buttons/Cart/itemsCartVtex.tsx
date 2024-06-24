import { useCart } from "apps/vtex/hooks/useCart.ts";

function ItemsCartVtex() {
  const { cart } = useCart();
  const {
    items = [],
  } = cart.value ?? {};

  const totalItems = items.length;

  console.log("Cart", cart);

  return (
    <span
      class={`flex justify-center items-center bg-primary text-black rounded-full text-sm w-6 h-6 ${
        totalItems === 0 ? "hidden" : ""
      }`}
    >
      {totalItems > 9 ? "9+" : totalItems}
    </span>
  );
}

export default ItemsCartVtex;
