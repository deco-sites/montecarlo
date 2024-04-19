import Avatar from "../../components/ui/Avatar.tsx";
import { useVariantPossibilities } from "../../sdk/useVariantPossiblities.ts";
import type { Product } from "apps/commerce/types.ts";
import { relative } from "../../sdk/url.ts";

interface Props {
  product: Product;
}

function VariantSelector({ product }: Props) {
  const { url, isVariantOf } = product;
  const hasVariant = isVariantOf?.hasVariant ?? [];
  const possibilities = useVariantPossibilities(hasVariant, product);

  const size = product.additionalProperty
    ? product.additionalProperty.find((r) => r.name === "Aro do Anel")?.value
    : null;

  console.log("product", product);

  return (
    <ul class="flex flex-col gap-4">
      {Object.keys(possibilities).map((name) => (
        name === "Aro do Anel"
          ? (
            <div class="flex flex-col gap-1">
              <span class="text-xs uppercase">Tamanho</span>
              <div class="relative w-fit">
                <label class="peer relative flex flex-row items-center justify-between border border-l-neutral-400 px-3 py-1">
                  <input type="checkbox" name="todo[1]" class="peer" />
                  <span class="left-0 z-10 -ml-4 px-6 before:left-0 before:absolute before:-z-10 before:h-5 before:w-8 before:bg-white">
                    {size}
                  </span>
                  <div class="h-2 w-2 -rotate-45 border-2 border-black duration-300 ease-in-out before:absolute before:bottom-0 before:h-2 before:w-2 before:bg-white peer-checked:rotate-[135deg]">
                  </div>
                </label>
                <div class="absolute top-full hidden flex-col divide-y-2 peer-has-[:checked]:flex w-full overflow-y-scroll max-h-52 bg-white">
                  {Object.entries(possibilities[name]).map(([value, link]) => {
                    const relativeUrl = relative(url);
                    const relativeLink = relative(link);
                    return (
                      <button
                        selected={relativeLink === relativeUrl}
                        f-partial={relativeLink}
                        f-client-nav
                        class="hover:bg-primary px-2 py-1"
                      >
                        {value}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )
          : (
            <li class="flex flex-col gap-2">
              <span class="text-sm">{name}</span>
              <ul class="flex flex-row gap-3">
                {Object.entries(possibilities[name]).map(([value, link]) => {
                  const relativeUrl = relative(url);
                  const relativeLink = relative(link);
                  return (
                    <li>
                      <button f-partial={relativeLink} f-client-nav>
                        <Avatar
                          content={value}
                          variant={relativeLink === relativeUrl
                            ? "active"
                            : relativeLink
                            ? "default"
                            : "disabled"}
                        />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </li>
          )
      ))}
    </ul>
  );
}

export default VariantSelector;
