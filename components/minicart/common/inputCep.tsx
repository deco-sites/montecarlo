import { useSignal, useSignalEffect } from "@preact/signals";
import { invoke } from "deco-sites/montecarlo/runtime.ts";
import { useRef } from "preact/compat";

interface MiniCart {
  id: string;
  quantity: number;
  seller: string;
}

export interface Props {
  orderFormId?: string;
  items: MiniCart[];
}

interface optionsRetirada {
  value: number;
  label: string;
  shippingEstimate: string;
  deliveryChannel: string;
  price: number;
}

interface Options {
  type: "delivery" | "pickup-in-point";
  options: optionsRetirada[];
}

export default function InputCep({ orderFormId, items }: Props) {
  const isCep = useSignal<boolean>(false);
  const refCep = useRef<HTMLInputElement>(null);
  const responseCep = useSignal<Options[] | null>(null);
  const cepSelected = useSignal<Options | null>(null);
  const cep = useSignal<string>("");

  async function handlerRemove() {
    const response = await invoke["deco-sites/montecarlo"].actions.miniCart
      .removeCEP({ orderFormId: orderFormId });

    isCep.value = false;
  }

  async function handlerAddCep() {
    if (!refCep || !refCep.current?.value) {
      return null;
    }
    cep.value = refCep.current.value;
    const response = await invoke["deco-sites/montecarlo"].actions.miniCart
      .getlistCEP({
        orderFormId: orderFormId,
        cep: refCep.current.value,
        miniCart: items,
      });

    console.log("response", response);
    responseCep.value = response;
    cepSelected.value = responseCep.value?.find((r) => r.type === "delivery") ||
      null;
  }

  const formatShippingEstimate = (shippingEstimate: string) => {
    if (shippingEstimate) {
      const regex = /bd/;
      if (regex.test(shippingEstimate)) {
        const days = Number(shippingEstimate.replace("bd", ""));
        if (days == 1) {
          return "Até 24 horas";
        }
        return "Até " + days + " dias úteis";
      } else {
        const hour = shippingEstimate.replace("h", "");
        return "Até " + hour + " horas";
      }
    }
    return;
  };

  const formatPrice = (price: number) => {
    return (price / 100).toLocaleString("pt-br", {
      minimumFractionDigits: 2,
      style: "currency",
      currency: "BRL",
    });
  };

  useSignalEffect(() => {
    if (cepSelected.value) {
      isCep.value = true;
    }
  });

  return (
    <>
      {isCep.value
        ? (
          <div class="flex flex-col gap-2 relative">
            <div class="text-black w-full h-10 grid grid-cols-[45%_25%_30%] gap-1 justify-between items-center bg-perola-intermediario px-2">
              <span class=" text-sm">
                Opções de <b>frete:</b>
              </span>
              <span class="h-full outline-none text-sm text-black placeholder:text-black bg-perola-intermediario flex justify-center items-center">
                {cep.value}
              </span>
              <button
                onClick={() => handlerRemove()}
                class=" min-w-24 text-sm relative after:w-3/4 after:h-[1px] after:bg-primary after:absolute after:top-5 after:left-[0.8rem]"
              >
                Alterar CEP
              </button>
            </div>
            <div class="relative w-full">
              <label class="peer relative grid grid-cols-[65%_25%_15%] items-center justify-between py-1 cursor-pointer w-full gap-2">
                {cepSelected.value && (
                  <>
                    <input
                      type="checkbox"
                      name="todo[1]"
                      class="peer hidden absolute"
                    />
                    <span class="left-0 z-10 before:left-0 before:absolute before:-z-10 gap-[20%] flex w-full max-x-[75%]">
                      <span class="text-button text-sm">
                        {cepSelected.value?.options[0].label}
                      </span>
                      <span class="text-button text-sm">
                        {formatShippingEstimate(
                          cepSelected.value?.options[0].shippingEstimate,
                        )}
                      </span>
                    </span>
                    {responseCep.value !== null &&
                      responseCep.value.length > 0 && (
                      <>
                        <span class="text-sm font-semibold ml-auto">
                          {cepSelected.value?.options[0].price
                            ? formatPrice(cepSelected.value?.options[0].price)
                            : "Grátis"}
                        </span>
                        <div class="h-3 w-3 ml-1 mt-2 peer-checked:-mt-2  rotate-45 border-2 border-black duration-300 ease-in-out before:absolute before:bottom-0 before:top-0 before:h-3 before:w-3 before:bg-white peer-checked:rotate-[225deg]">
                        </div>
                      </>
                    )}
                  </>
                )}
              </label>
              <div class="absolute top-full hidden flex-col divide-y-2 peer-has-[:checked]:flex w-full overflow-y-scroll max-h-52 bg-white gap-2">
                {responseCep.value !== null && responseCep.value.length > 0 &&
                  responseCep.value.map((item) => {
                    if (item.type == "delivery") {
                      return (
                        <button
                          onClick={() => {
                            cepSelected.value = item;
                          }}
                        >
                          <div class="flex justify-between items-center border-base-200 not-first-child:border-t bg-perola-intermediario py-2 px-2">
                            <span class="text-button text-sm min-w-20 text-start">
                              {item.options[0].label}
                            </span>
                            <span class="text-button text-sm">
                              {formatShippingEstimate(
                                item.options[0].shippingEstimate,
                              )}
                            </span>
                            <span class="text-sm font-semibold text-right">
                              {item.options[0].price
                                ? formatPrice(item.options[0].price)
                                : "Grátis"}
                            </span>
                          </div>
                        </button>
                      );
                    }
                  })}
              </div>
            </div>
          </div>
        )
        : (
          <div class="border border-[#CAC7B6] pl-3 flex justify-between h-9">
            <input
              class="w-full h-full outline-none text-sm text-black placeholder:text-black"
              placeholder={"Cupom do vendedor"}
              ref={refCep}
            />{" "}
            <button
              onClick={() => handlerAddCep()}
              class=" min-w-24 text-sm relative after:w-3/4 after:h-[1px] after:bg-primary after:absolute after:top-7 after:left-[0.8rem]"
            >
              Calcular
            </button>
          </div>
        )}
    </>
  );
}
