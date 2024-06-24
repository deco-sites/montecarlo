import Icon from "../../../components/ui/Icon.tsx";
import { formatPrice } from "../../../sdk/format.ts";

interface Props {
  total: number;
  target: number;
  locale: string;
  currency: string;
}

function FreeShippingProgressBar({ target, total, currency, locale }: Props) {
  const remaining = target - total;
  const percent = Math.floor((total / target) * 100);

  return (
    <div class="flex flex-col w-full gap-2">
      <div class="w-full h-1 flex bg-perola-intermediario relative">
        <div
          class="h-1 bg-primary after:content-[''] after:h-4 after:w-4 after:rounded-full after:bg-primary after:flex after:absolute relative after:right-0 after:top-[-150%]"
          style={{ width: `${percent}%` }}
        >
        </div>
      </div>
      <div class="flex justify-center items-center gap-2 text-sm w-full">
        {remaining > 0
          ? (
            <span>
              Faltam <b>{formatPrice(remaining, currency, locale)}{" "}</b>
              para ganhar <b>frete grátis!</b>
            </span>
          )
          : (
            <span>
              Parabéns, você ganhou <b>frete grátis!</b>
            </span>
          )}
      </div>
    </div>
  );
}

export default FreeShippingProgressBar;
