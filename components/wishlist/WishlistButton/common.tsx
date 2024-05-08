import { useSignal } from "@preact/signals";
import Icon from "../../../components/ui/Icon.tsx";
import Button from "../../../components/ui/Button.tsx";
import { sendEvent } from "../../../sdk/analytics.tsx";

export interface Props {
  productID: string;
  productGroupID?: string;
  customClass?: string;
  removeItem: () => Promise<void>;
  addItem: () => Promise<void>;
  loading: boolean;
  inWishlist: boolean;
  isUserLoggedIn: boolean;
}

function ButtonCommon({
  customClass = "",
  productGroupID,
  productID,
  loading,
  inWishlist,
  isUserLoggedIn,
  removeItem,
  addItem,
}: Props) {
  const fetching = useSignal(false);

  return (
    <Button
      class={"text-black " + customClass}
      loading={fetching.value}
      aria-label="Add to wishlist"
      onClick={async (e) => {
        e.stopPropagation();
        e.preventDefault();

        if (!isUserLoggedIn) {
          globalThis.window.alert(
            "Please log in before adding to your wishlist",
          );

          return;
        }

        if (loading) {
          return;
        }

        try {
          fetching.value = true;

          if (inWishlist) {
            await removeItem();
          } else if (productID && productGroupID) {
            await addItem();

            sendEvent({
              name: "add_to_wishlist",
              params: {
                items: [
                  {
                    item_id: productID,
                    item_group_id: productGroupID,
                    quantity: 1,
                  },
                ],
              },
            });
          }
        } finally {
          fetching.value = false;
        }
      }}
    >
      Favoritar
    </Button>
  );
}

export default ButtonCommon;
