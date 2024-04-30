import { useComputed } from "@preact/signals";
import Button from "./common.tsx";
import { useWishlist } from "apps/wake/hooks/useWishlist.ts";
import { useUser } from "apps/wake/hooks/useUser.ts";
import type { Product } from "apps/commerce/types.ts";

export interface Props {
  productID: string;
  productGroupID?: string;
  variant?: "icon" | "full";
  productClick: Product;
}

function WishlistButton({
  variant = "icon",
  productGroupID,
  productID,
  productClick
}: Props) {
  const { user } = useUser();
  const { loading, addItem, removeItem, getItem } = useWishlist();

  const listItem = useComputed(() => getItem({ productId: productGroupID }));

  const isUserLoggedIn = Boolean(user.value?.email);
  const inWishlist = Boolean(listItem.value);

  return (
    <Button
      loading={loading.value}
      inWishlist={inWishlist}
      isUserLoggedIn={isUserLoggedIn}
      variant={variant}
      productGroupID={productGroupID}
      productID={productID}
      productClickValue={productClick}
      removeItem={() => removeItem({ productId: Number(productGroupID) })}
      addItem={() => addItem({ productId: Number(productGroupID) })}
    />
  );
}

export default WishlistButton;
