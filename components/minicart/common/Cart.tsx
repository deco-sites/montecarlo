import { AnalyticsItem } from "apps/commerce/types.ts";
import Button from "../../../components/ui/Button.tsx";
import { sendEvent } from "../../../sdk/analytics.tsx";
import { formatPrice } from "../../../sdk/format.ts";
import { useUI } from "../../../sdk/useUI.ts";
import CartItem, { Item, Props as ItemProps } from "./CartItem.tsx";
import Coupon, { Props as CouponProps } from "./Coupon.tsx";
import FreeShippingProgressBar from "./FreeShippingProgressBar.tsx";
import Icon from "deco-sites/montecarlo/components/ui/Icon.tsx";
import ModalBonus from "deco-sites/montecarlo/components/product/Modal/Bonus.tsx";
import type { Props as PropsBonus } from "deco-sites/montecarlo/components/product/Modal/BonusCart.tsx";
import BonusCart from "deco-sites/montecarlo/components/product/Modal/BonusCart.tsx";

interface Props {
  items: Item[];
  loading: boolean;
  total: number;
  subtotal: number;
  discounts: number;
  locale: string;
  currency: string;
  coupon?: string;
  freeShippingTarget: number;
  checkoutHref: string;
  bonus?: PropsBonus;
  onAddCoupon?: CouponProps["onAddCoupon"];
  onUpdateQuantity: ItemProps["onUpdateQuantity"];
  itemToAnalyticsItem: ItemProps["itemToAnalyticsItem"];
}

function Cart({
  items,
  total,
  subtotal,
  locale,
  coupon,
  loading,
  currency,
  discounts,
  freeShippingTarget,
  checkoutHref,
  bonus,
  itemToAnalyticsItem,
  onUpdateQuantity,
  onAddCoupon,
}: Props) {
  const { displayCart } = useUI();
  const isEmtpy = items.length === 0;

  const maxInstallments = total > 50000 ? 10 : Math.floor(total / 5000);

  return (
    <div
      class="flex flex-col justify-center items-center overflow-hidden"
      style={{ minWidth: "calc(min(100vw, 425px))", maxWidth: "425px" }}
    >
      {isEmtpy
        ? (
          <div class="flex flex-col gap-6">
            <span class="font-medium text-2xl">Sua sacola está vazia</span>
            <Button
              class="btn-outline"
              onClick={() => {
                displayCart.value = false;
              }}
            >
              Escolher produtos
            </Button>
          </div>
        )
        : (
          <>
            {/* Free Shipping Bar */}
            <div class="px-2 py-4 w-full">
              <FreeShippingProgressBar
                total={total}
                locale={locale}
                currency={currency}
                target={freeShippingTarget}
              />
            </div>

            {/* Cart Items */}
            <ul
              role="list"
              class="mt-6 px-2 flex-grow overflow-y-auto flex flex-col w-full"
            >
              {items.map((item, index) => (
                <li
                  key={index}
                  class="first:pt-0 first:border-none first:mt-0 py-6 border-t border-[#CAC7B6] mt-4"
                >
                  <CartItem
                    item={item}
                    index={index}
                    locale={locale}
                    currency={currency}
                    onUpdateQuantity={onUpdateQuantity}
                    itemToAnalyticsItem={itemToAnalyticsItem}
                  />
                </li>
              ))}
            </ul>

            {/* Cart Footer */}
            <footer class="w-full">
              {/* Subtotal */}
              {
                /* <div class="border-t border-base-200 py-2 flex flex-col">
                {discounts > 0 && (
                  <div class="flex justify-between items-center px-4">
                    <span class="text-sm">Descontos</span>
                    <span class="text-sm">
                      {formatPrice(discounts, currency, locale)}
                    </span>
                  </div>
                )}
                <div class="w-full flex justify-between px-4 text-sm">
                  <span>Subtotal</span>
                  <span>
                    {formatPrice(subtotal, currency, locale)}
                  </span>
                </div>
                {onAddCoupon && (
                  <Coupon onAddCoupon={onAddCoupon} coupon={coupon} />
                )}
              </div> */
              }
              <div class="px-2">
                <div>
                  {bonus && (
                    <BonusCart
                      text={bonus.text}
                      price={total}
                      discont={bonus.discont}
                      valueDiscontMax={bonus.valueDiscontMax}
                    />
                  )}
                  <div class="flex flex-col gap-2 py-3 text-black">
                    <div class="border border-[#CAC7B6] pl-3 flex justify-between h-9">
                      <input
                        class="w-full h-full outline-none text-sm text-black placeholder:text-black"
                        placeholder={"Cupom de desconto"}
                      />{" "}
                      <button class=" min-w-24 text-sm relative after:w-3/4 after:h-[1px] after:bg-primary after:absolute after:top-7 after:left-[0.8rem]">
                        Adicionar
                      </button>
                    </div>
                    <div class="border border-[#CAC7B6] pl-3 flex justify-between h-9">
                      <input
                        class="w-full h-full outline-none text-sm text-black placeholder:text-black"
                        placeholder={"Cupom do vendedor"}
                      />{" "}
                      <button class=" min-w-24 text-sm relative after:w-3/4 after:h-[1px] after:bg-primary after:absolute after:top-7 after:left-[0.8rem]">
                        Adicionar
                      </button>
                    </div>
                  </div>
                  <div>
                    <label class="peer relative flex flex-row items-center justify-start cursor-pointer select-none">
                      <input
                        type="checkbox"
                        name="todo[1]"
                        class="peer opacity-0"
                      />
                      <span class="left-0 ml-3 text-sm font-semibold before:absolute before:left-0 after:z-10 after:absolute after:left-1 after:top-1 after:rounded-full after:w-3 after:h-3 before:h-5 before:w-5  before:bg-white before:rounded-full before:border-2 before:border-black peer-checked:after:bg-black lg:text-sm">
                        Receba em casa
                      </span>
                    </label>
                    <div class="text-black w-full h-10 grid grid-cols-[45%_25%_30%] gap-1 justify-between items-center bg-perola-intermediario px-2">
                      <span class=" text-sm">
                        Opções de <b>frete:</b>
                      </span>
                      <input
                        class="h-full outline-none text-sm text-black placeholder:text-black bg-perola-intermediario "
                        placeholder={"00000-000"}
                      />
                      <button class=" min-w-24 text-sm relative after:w-3/4 after:h-[1px] after:bg-primary after:absolute after:top-5 after:left-[0.8rem]">
                        Alterar CEP
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Total */}
              <div class="border-t border-base-200 pt-4 flex flex-col justify-end items-end px-2 text-black">
                <div class="flex justify-between items-center w-full ">
                  <span class=" text-lg font-semibold">Total</span>
                  <span class="text-lg font-semibold">
                    {formatPrice(total, currency, locale)}
                  </span>
                </div>
                {maxInstallments > 1 && (
                  <span class=" text-sm">
                    Ou {maxInstallments}x de{" "}
                    {formatPrice(total / maxInstallments, currency, locale)}
                  </span>
                )}
              </div>

              <div class="p-2">
                <a class="inline-block w-full" href={checkoutHref}>
                  <Button
                    data-deco="buy-button"
                    class="w-full bg-primary text-sm font-semibold py-[10px]"
                    disabled={loading || isEmtpy}
                    onClick={() => {
                      sendEvent({
                        name: "begin_checkout",
                        params: {
                          coupon,
                          currency,
                          value: total,
                          items: items
                            .map((_, index) => itemToAnalyticsItem(index))
                            .filter((x): x is AnalyticsItem => Boolean(x)),
                        },
                      });
                    }}
                  >
                    Fechar pedido
                  </Button>
                </a>
              </div>
            </footer>
          </>
        )}
    </div>
  );
}

export default Cart;
