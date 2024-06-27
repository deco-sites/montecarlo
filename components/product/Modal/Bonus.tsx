import { HTMLWidget } from "apps/admin/widgets.ts";
import Icon from "deco-sites/montecarlo/components/ui/Icon.tsx";
import { formatPrice } from "deco-sites/montecarlo/sdk/format.ts";

export interface Props {
  text: string;
  message: HTMLWidget;
  price: number;
  discont: number;
  valueDiscontMax: number;
}

export default function ModalBonus(
  { text, message, price, discont, valueDiscontMax }: Props,
) {
  const priceBonus = price * (discont / 100);

  const bonusValue = priceBonus >= 5000 ? 5000 : priceBonus;

  const formatValue = formatPrice(bonusValue) || " ";

  return (
    <div class="relative w-fit pb-2">
      <label class="peer relative flex flex-row items-center justify-between cursor-pointer select-none">
        <input type="checkbox" name="todo[1]" class="peer" />
        <span class="decoration-primary left-0 z-10 -ml-3 mb-2 text-sm underline underline-offset-2 before:absolute before:left-0 before:-z-10 before:h-6 before:w-8 before:bg-white lg:text-sm">
          {text.replace("${bonus}", formatValue)}
        </span>
        <Icon id="alertBonus" size={15} class="ml-1 -mt-2" />
      </label>
      <div class="hidden absolute bottom-full flex-col divide-y-2 overflow-hidden pb-4 peer-has-[:checked]:flex before:w-4 before:h-4 before:rotate-45 before:bg-perola-intermediario before:top-[84%] before:z-20 before:absolute before:left-0 before:right-0 before:mx-auto">
        <span
          class="bg-perola-intermediario text-sm w-48 h-28 flex pl-6 pr-4 items-center select-none "
          dangerouslySetInnerHTML={{ __html: message }}
        >
        </span>
      </div>
    </div>
  );
}
