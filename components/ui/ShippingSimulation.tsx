import { Signal, useSignal } from "@preact/signals";
import { useCallback } from "preact/hooks";
import Button from "../../components/ui/Button.tsx";
import { formatPrice } from "../../sdk/format.ts";
import { useCart } from "apps/vtex/hooks/useCart.ts";
import type { SimulationOrderForm, SKU, Sla } from "apps/vtex/utils/types.ts";

export interface Props {
  items: Array<SKU>;
  cepLink: { label: string; url: string };
}

const formatShippingEstimate = (estimate: string) => {
  const [, time, type] = estimate.split(/(\d+)/);

  if (type === "bd") return `${time} dias úteis`;
  if (type === "d") return `${time} dias`;
  if (type === "h") return `${time} horas`;
};

function ShippingContent({ simulation }: {
  simulation: Signal<SimulationOrderForm | null>;
}) {
  const { cart } = useCart();

  const methods = simulation.value?.logisticsInfo?.reduce(
    (initial, { slas }) => [...initial, ...slas],
    [] as Sla[],
  ) ?? [];

  const locale = cart.value?.clientPreferencesData.locale || "pt-BR";
  const currencyCode = cart.value?.storePreferencesData.currencyCode || "BRL";

  if (simulation.value == null) {
    return null;
  }

  if (methods.length === 0) {
    return (
      <div class="p-2">
        <span>CEP inválido</span>
      </div>
    );
  }

  return (
    <ul class="flex flex-col gap-2 mt-7">
      {methods.map((method) => (
        <li class="flex justify-between items-center border-base-200 not-first-child:border-t bg-perola-intermediario py-2 px-5">
          <span class="text-button text-sm min-w-20 text-start">
            {method.name}
          </span>
          <span class="text-button text-sm">
            até {formatShippingEstimate(method.shippingEstimate)}
          </span>
          <span class="text-sm font-semibold text-right">
            {method.price === 0 ? "Grátis" : (
              formatPrice(method.price / 100, currencyCode, locale)
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}

function ShippingSimulation({ items, cepLink }: Props) {
  const postalCode = useSignal("");
  const loading = useSignal(false);
  const simulateResult = useSignal<SimulationOrderForm | null>(null);
  const { simulate, cart } = useCart();

  const handleSimulation = useCallback(async () => {
    if (postalCode.value.length !== 8) {
      return;
    }

    try {
      loading.value = true;
      simulateResult.value = await simulate({
        items: items,
        postalCode: postalCode.value,
        country: cart.value?.storePreferencesData.countryCode || "BRA",
      });
    } finally {
      loading.value = false;
    }
  }, [items, postalCode.value]);

  return (
    <div class="flex flex-col gap-1">
      <div class="flex flex-col">
        <span class="uppercase text-xs">Cep</span>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSimulation();
        }}
        class=" flex flex-row w-full border pl-3 p-1 gap-2 h-10"
      >
        <input
          as="input"
          type="text"
          class="w-[calc(70%-0.25rem)] text-sm outline-none font-bold text-black placeholder:text-black"
          placeholder="00000-000"
          value={postalCode.value}
          maxLength={8}
          size={8}
          onChange={(e: { currentTarget: { value: string } }) => {
            postalCode.value = e.currentTarget.value;
          }}
        />
        <Button
          type="submit"
          loading={loading.value}
          class="join-item w-[calc(30%-0.25rem)] bg-perola-intermediario text-sm p"
        >
          Calcular
        </Button>
      </form>

      <a
        href={cepLink.url}
        class="text-sm underline-offset-2 decoration-primary underline lg:text-sm mt-2 cursor-pointer"
      >
        {cepLink.label}
      </a>

      <div>
        <div>
          <ShippingContent simulation={simulateResult} />
        </div>
      </div>
    </div>
  );
}

export default ShippingSimulation;
