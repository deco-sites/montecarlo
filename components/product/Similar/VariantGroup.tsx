import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { Material } from "deco-sites/montecarlo/loaders/Layouts/MaterialProduct.tsx";
import { Losses } from "deco-sites/montecarlo/loaders/Layouts/RockProduct.tsx";
import { useSection } from "deco/hooks/useSection.ts";

interface Variants {
  link: string;
  message: string;
  urlImage?: ImageWidget;
  productId: number;
  active: boolean;
}

interface GroupVariants {
  type: string;
  variants: Variants[];
  materialImages?: Material[];
  losses?: Losses[];
}

export function SelectVariants(
  { type, variants, materialImages, losses, url }: GroupVariants & {
    url: string;
  },
) {
  const newUrl = new URL(url).origin;

  if (type == "Material") {
    return (
      <div class="flex flex-col gap-1 min-w-32 order-1">
        <span class="text-xs uppercase">{type}</span>
        <div class="flex w-full h-auto flex-1 min-h-4 gap-1 items-center">
          {variants?.map((item) => {
            if (
              !materialImages || materialImages === undefined
            ) {
              return null;
            }

            const img = materialImages.find((img) => img.name === item.message);

            if (!img || img === undefined) {
              return null;
            }
            const href = item.link.replace(
              "https://montecarlo.myvtex.com",
              newUrl,
            );
            return (
              <button
                hx-target="closest section"
                hx-get={useSection({ href })}
                hx-swap="outerHTML show:parent:top"
                hx-indicator="#spinner-pdp"
                hx-push-url={href}
                class={`${
                  item.active &&
                  "border border-primary rounded-sm p-1 cursor-pointer"
                } `}
              >
                <Image
                  class="rounded-sm h-min"
                  src={img.image}
                  width={20}
                  height={20}
                  alt={img.name}
                />
              </button>
            );
          })}
        </div>
      </div>
    );
  } else if (type == "Pedras") {
    return (
      <div class="flex flex-col gap-1 min-w-32 order-2">
        <span class="text-xs uppercase">{type}</span>
        <div class="flex w-full h-auto flex-1 min-h-4 gap-1 items-center">
          {variants?.map((item) => {
            if (
              !losses || losses === undefined
            ) {
              return null;
            }

            const img = losses.find((img) => img.name === item.message);

            if (!img || img === undefined) {
              return null;
            }
            const href = item.link.replace(
              "https://montecarlo.myvtex.com",
              newUrl,
            );
            return (
              <a
                hx-target="closest section"
                hx-get={useSection({ href })}
                hx-swap="outerHTML show:parent:top"
                hx-indicator="#spinner-pdp"
                hx-push-url={href}
                class={`${
                  item.active &&
                  "border border-primary rounded-sm p-1 cursor-pointer"
                } `}
              >
                <Image
                  class="rounded-sm h-min"
                  src={img.image}
                  width={20}
                  height={20}
                  alt={img.name}
                />
              </a>
            );
          })}
        </div>
      </div>
    );
  } else if (type == "Cts Diamantes") {
    return (
      <div class="flex flex-col gap-1 min-w-32 order-3">
        <span class="text-xs uppercase">{type}</span>
        <div class="relative w-fit">
          <label class="peer relative flex flex-row items-center justify-between border px-3 py-1 cursor-pointer">
            <input type="checkbox" name="todo[1]" class="peer" />
            <span class="left-0 z-10 -ml-4 px-6 before:left-0 before:absolute before:-z-10 before:h-5 before:w-8 before:bg-white">
              {variants.find((r) => r.active)?.message}
            </span>
            {variants.length > 1 && (
              <div class="h-2 w-2 -rotate-45 border-2 border-black duration-300 ease-in-out before:absolute before:bottom-0 before:h-2 before:w-2 before:bg-white peer-checked:rotate-[135deg]">
              </div>
            )}
          </label>
          <div class="absolute top-full hidden flex-col divide-y-2 peer-has-[:checked]:flex w-full overflow-y-scroll max-h-52 bg-white z-10">
            {variants.length > 1 && variants.map((variant) => {
              const href = variant.link.replace(
                "https://montecarlo.myvtex.com",
                newUrl,
              );
              return (
                <a
                  hx-target="closest section"
                  hx-get={useSection({ href })}
                  hx-swap="outerHTML show:parent:top"
                  hx-indicator="#spinner-pdp"
                  hx-push-url={href}
                  selected={variant.active}
                  class="hover:bg-primary px-2 py-1"
                >
                  {variant.message}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    );
  } else if (type == "Tamanho") {
    if (variants.length > 1) {
      return (
        <div class="flex flex-col gap-1 min-w-32 order-4">
          <span class="text-xs uppercase">{type}</span>
          <div class="relative w-fit">
            <label class="peer relative flex flex-row items-center justify-between border px-3 py-1 cursor-pointer">
              <input type="checkbox" name="todo[1]" class="peer" />
              <span class="left-0 z-10 -ml-4 px-6 before:left-0 before:absolute before:-z-10 before:h-5 before:w-8 before:bg-white">
                {variants.find((r) => r.active)?.message}
              </span>
              {variants.length > 1 && (
                <div class="h-2 w-2 -rotate-45 border-2 border-black duration-300 ease-in-out before:absolute before:bottom-0 before:h-2 before:w-2 before:bg-white peer-checked:rotate-[135deg]">
                </div>
              )}
            </label>
            <div class="absolute top-full hidden flex-col divide-y-2 peer-has-[:checked]:flex w-full overflow-y-scroll max-h-52 bg-white z-10">
              {variants.length > 1 && variants.map((variant) => {
                const href = variant.link.replace(
                  "https://montecarlo.myvtex.com",
                  newUrl,
                );
                return (
                  <a
                    hx-target="closest section"
                    hx-get={useSection({ href })}
                    hx-swap="outerHTML show:parent:top"
                    hx-indicator="#spinner-pdp"
                    hx-push-url={href}
                    selected={variant.active}
                    class="hover:bg-primary px-2 py-1"
                  >
                    {variant.message}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  } else if (type == "Letras") {
    return (
      <div class="flex flex-col gap-1 w-full order-5">
        <span class="text-xs uppercase">{type}</span>
        <div class="flex w-full h-auto flex-1 min-h-4 gap-1 items-center flex-wrap">
          {variants?.map((item) => {
            const href = item.link.replace(
              "https://montecarlo.myvtex.com",
              newUrl,
            );
            return (
              <a
                hx-target="closest section"
                hx-get={useSection({ href })}
                hx-swap="outerHTML show:parent:top"
                hx-indicator="#spinner-pdp"
                hx-push-url={href}
                class={` " p-1 w-7 h-7 rounded-full flex justify-center items-center "  ${
                  item.active && "border border-primary rounded-full "
                } `}
              >
                {item.message}
              </a>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div class="flex flex-col gap-1 w-full order-5">
        <span class="text-xs uppercase">Disponível em:</span>
        <div class="flex w-full h-auto flex-1 min-h-4 gap-1 items-center flex-wrap">
          {variants?.map((item) => {
            const href = item.link.replace(
              "https://montecarlo.myvtex.com",
              newUrl,
            );
            return (
              <a
                hx-target="closest section"
                hx-get={useSection({ href })}
                hx-swap="outerHTML show:parent:top"
                hx-indicator="#spinner-pdp"
                hx-push-url={href}
                class={` " p-1 w-16 h-16 flex justify-center items-center "  ${
                  item.active && "border border-primary rounded-lg "
                } `}
              >
                <Image
                  class="w-full h-full object-cover rounded-lg"
                  src={item.urlImage || ""}
                  width={30}
                  height={30}
                  alt={item.message}
                />
              </a>
            );
          })}
        </div>
      </div>
    );
  }
}
