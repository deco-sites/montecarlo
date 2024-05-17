import { useCart } from "apps/vtex/hooks/useCart.ts";
import Button, { Props as BtnProps } from "./common.tsx";

export interface Props extends Omit<BtnProps, "onAddItem"> {
  seller: string;
  productID: string;
  price?: number;
}

function AddToCartButton({ seller, productID, eventParams, price }: Props) {
  const { addItems } = useCart();
  const onAddItem = () =>
    addItems({
      orderItems: [{
        id: productID,
        seller: seller,
        quantity: 1,
      }],
    });

  return (
    <Button onAddItem={onAddItem} eventParams={eventParams} price={price} />
  );
}

export default AddToCartButton;
