import { HTMLWidget } from "apps/admin/widgets.ts";
import Icon from "deco-sites/montecarlo/components/ui/Icon.tsx";
import { formatPrice } from "deco-sites/montecarlo/sdk/format.ts";

export interface Props {
  text: HTMLWidget;
  discont: number;
  valueDiscontMax: number;
  infoBonus?: HTMLWidget;
}

export function BonusCart(
  { text, discont, valueDiscontMax, price, class: _class = "" }: Props & {
    price: number;
    class?: string;
  },
) {
  const priceBonus = price * (discont / 100);

  const bonusValue = priceBonus >= valueDiscontMax
    ? valueDiscontMax
    : priceBonus;

  const formatValue = formatPrice(bonusValue) || " ";

  return (
    <div class={`relative w-fit flex flex-row gap-1 items-center ${_class}`}>
      <Icon id="alertBonus" size={15} />
      <span
        class="text-sm text-black"
        dangerouslySetInnerHTML={{
          __html: text.replace("${bonus}", formatValue),
        }}
      >
      </span>
    </div>
  );
}

export function InfoBonus({ infoBonus }: { infoBonus?: HTMLWidget }) {
  if (!infoBonus) {
    return null;
  }
  return (
    <span
      class="text-sm py-3 border-t border-[#CAC7B6] w-full block text-black mt-8"
      dangerouslySetInnerHTML={{ __html: infoBonus }}
    >
    </span>
  );
}
