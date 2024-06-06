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
import {
  BonusCart,
  InfoBonus,
} from "deco-sites/montecarlo/components/product/Modal/BonusCart.tsx";
import InputCep from "deco-sites/montecarlo/islands/miniCart/InputCep.tsx";

interface MiniCart {
  id: string;
  quantity: number;
  seller: string;
}
import { SendEventOnClick, SendEventOnView } from "../../Analytics.tsx";
import { useId } from "../../../sdk/useId.ts";

interface Props {
  items: Item[];
  orderFormId?: string;
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
  variant?: "variant1" | "variant2";
  onAddCoupon?: CouponProps["onAddCoupon"];
  onUpdateQuantity: ItemProps["onUpdateQuantity"];
  itemToAnalyticsItem: ItemProps["itemToAnalyticsItem"];
}

function Cart({
  items,
  orderFormId,
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
  variant = "variant1",
  itemToAnalyticsItem,
  onUpdateQuantity,
  onAddCoupon,
}: Props) {
  const { displayCart } = useUI();
  const isEmtpy = items.length === 0;

  const maxInstallments = total > 50000 ? 10 : Math.floor(total / 5000);

  const itemsMiniCart: MiniCart[] = [];

  items.map((r) => {
    itemsMiniCart.push({
      id: r.id || "1",
      quantity: r.quantity,
      seller: r.seller || "1",
    });
  });
  const id = useId();

  return (
    <div
      class="flex flex-col justify-center items-center overflow-hidden"
      style={{ minWidth: "calc(min(100vw, 425px))", maxWidth: "425px" }}
      id={id}
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
            <div class="px-2 py-4 w-full lg:px-8">
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
              class="mt-6 px-2 flex-grow overflow-y-auto flex flex-col w-full lg:px-8"
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
            <footer class="w-full bg-white shadow-black">
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
              {variant === "variant1"
                ? (
                  <div class="px-2 relative">
                    <label class="peer absolute -top-9 left-0 right-0 flex cursor-pointer flex-row items-center justify-center px-3 py-1">
                      <input
                        type="checkbox"
                        name="todo[1]"
                        class="peer group opacity-0"
                        checked={true}
                      />
                      <span class="left-0 -ml-4 bg-primary w-8 h-8 flex justify-center items-center peer-checked:translate-y-[-47px] z-30 translate-y-[-316px] duration-300 ease-in-out">
                      </span>
                      <div class=" h-4 w-4 -rotate-45 border-2 left-[47.7%] absolute peer-checked:translate-y-[-47px] z-30 translate-y-[-316px] border-black duration-300 ease-in-out before:absolute before:bottom-0 before:h-4 before:w-4 before:bg-primary top-3 peer-checked:top-[15px] peer-checked:rotate-[135deg]">
                      </div>

                      <div class="peer-checked:translate-y-[40%] translate-y-[-140px] absolute duration-300 ease-in-out bg-white shadow-[0_-20px_30px_-15px_rgba(0,0,0,0.3)] px-2 z-10 pt-2 after:w-[95.5%] after:h-[1px] after:bg-[#CAC7B6] after:peer-checked:block after:top-11 after:absolute after:hidden max-h-[318px] overflow-y-auto lg:px-8 cursor-default">
                        {bonus && (
                          <BonusCart
                            class="py-2"
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
                          {itemsMiniCart.length > 0 && (
                            <InputCep
                              orderFormId={orderFormId}
                              items={itemsMiniCart}
                            />
                          )}
                          {bonus?.infoBonus && (
                            <InfoBonus infoBonus={bonus?.infoBonus} />
                          )}
                        </div>
                      </div>
                    </label>
                  </div>
                )
                : null}

              {/* Total */}
              {variant === "variant1"
                ? (
                  <div class=" pt-2 flex flex-col justify-end items-end px-2 text-black  relative z-20 bg-white lg:px-8">
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
                )
                : (
                  <div class=" pt-2 flex flex-col justify-end items-end px-2 text-black  relative z-20 bg-white lg:px-8">
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
                    <div class="flex flex-row gap-1 py-4 border-t border-[#CAC7B6] w-full mt-2">
                      <Icon id="alertBonus" size={15} />
                      <span class="text-sm text-black">
                        Frete calculado na próxima etapa
                      </span>
                    </div>
                  </div>
                )}

              <div class="p-2 relative z-20 bg-white lg:px-8 lg:pb-8">
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
      <SendEventOnView
        id={id}
        event={{
          name: "view_cart",
          params: {
            currency: "BRL",
            value: total,
            items: [],
          },
        }}
      />
    </div>
  );
}

export default Cart;
