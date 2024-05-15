// deno-lint-ignore-file no-explicit-any
import Button from "deco-sites/montecarlo/components/ui/Button.tsx";
import IconChevronRight from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/chevron-right.tsx";
import { useUI } from "deco-sites/montecarlo/sdk/useUI.ts";

function MenuProducts() {
  const {
    displayMenuProducts,
    productsChild,
    displayMenuProductsChild,
    productsChild2,
  } = useUI();

  return (
    <div>
      <ul class="w-full h-full flex flex-col bg-white">
        <li class="w-full">
          <Button
            class="py-3 border-none w-full text-primary bg-white hover:bg-inherit text-left"
            onClick={() => {
              displayMenuProducts.value = false;
            }}
          >
            {productsChild.value.href && (
              <a
                class="font-bold w-full text-primary"
                href={productsChild.value.href}
              >
                {`Ver tudo em ${productsChild.value.label}`}
              </a>
            )}
          </Button>
        </li>
        {productsChild.value.children.map((node: any) => (
          <li class="w-full">
            {node.children !== undefined && node.children.length > 0
              ? (
                <Button
                  class={`py-3 w-full font-medium m-auto bg-white hover:bg-inherit border-b-[1px] justify-between text-left text-primary-content border-black border-opacity-10`}
                  onClick={() => {
                    displayMenuProducts.value = false;
                    displayMenuProductsChild.value = true;
                    productsChild2.value = {
                      label: node.label,
                      children: node.children,
                      href: node.href,
                    } as any;
                  }}
                >
                  {node.label}
                  <IconChevronRight class="w-5 h-5 text-primary" />
                </Button>
              )
              : (
                <a
                  href={node.href}
                  class="flex items-center justify-between w-full text-primary-content px-4 py-4 border-b-[1px] font-medium text-sm"
                >
                  {node.label}
                </a>
              )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MenuProducts;
