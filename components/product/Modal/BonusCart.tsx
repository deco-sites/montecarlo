import { HTMLWidget } from "apps/admin/widgets.ts";
import Icon from "deco-sites/montecarlo/components/ui/Icon.tsx";
import { formatPrice } from "deco-sites/montecarlo/sdk/format.ts";

export interface Props {
  text: HTMLWidget;
  discont: number;
  valueDiscontMax: number;
}

export default function BonusCart(
  { text, discont, valueDiscontMax, price }: Props & { price: number },
) {
  const priceBonus = price * (discont / 100);

  const bonusValue = priceBonus >= valueDiscontMax
    ? valueDiscontMax
    : priceBonus;

  const formatValue = formatPrice(bonusValue) || " ";

  return (
    <div class="relative w-fit flex flex-row gap-1 items-center">
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
