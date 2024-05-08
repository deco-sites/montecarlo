import { useComputed } from "@preact/signals";
import Button from "./common.tsx";
import { useWishlist } from "apps/vtex/hooks/useWishlist.ts";
import { useUser } from "apps/vtex/hooks/useUser.ts";
import type { Product } from "apps/commerce/types.ts";

export interface Props {
  productID: string;
  productGroupID?: string;
  variant?: "icon" | "full";
  productClick: Product;
  customClass: string;
}

function WishlistButton({
  customClass,
  productGroupID,
  productID,
  productClick
}: Props) {
  const { user } = useUser();
  const { loading, addItem, removeItem, getItem } = useWishlist();
  const listItem = useComputed(() =>
    getItem({ sku: productID, productId: productGroupID })
  );

  const isUserLoggedIn = Boolean(user.value?.email);
  const inWishlist = Boolean(listItem.value);

  return (
    <Button
      loading={loading.value}
      inWishlist={inWishlist}
      isUserLoggedIn={isUserLoggedIn}
      customClass={customClass}
      productGroupID={productGroupID}
      productID={productID}
      productClickValue={productClick}
      removeItem={() => removeItem({ id: listItem.value!.id }!)}
      addItem={() =>
        addItem({ sku: productID, productId: productGroupID || productID })}
    />
  );
}

export default WishlistButton;
