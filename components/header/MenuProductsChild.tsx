// deno-lint-ignore-file no-explicit-any
import { useUI } from "deco-sites/montecarlo/sdk/useUI.ts";
import Button from "deco-sites/montecarlo/components/ui/Button.tsx";

function MenuProducts() {
  const { productsChild2, displayMenuProducts } = useUI();

  return (
    <div>
      <ul
        class={`bg-white ${
          productsChild2.value.children[0].type == "sizeItem"
            ? "flex flex-wrap mt-4 gap-2 w-11/12 m-auto h-auto"
            : "w-full h-full"
        }`}
      >
        <li
          class={`w-full ${
            productsChild2.value.children[0].type == "sizeItem" && "hidden"
          }`}
        >
          <Button
            class="py-3 border-none w-full text-primary-content bg-white hover:bg-inherit text-left"
            onClick={() => {
              displayMenuProducts.value = false;
            }}
          >
            {productsChild2.value.href && (
              <a
                class="font-bold w-full text-primary"
                href={productsChild2.value.href}
              >
                {`Ver tudo em ${productsChild2.value.label}`}
              </a>
            )}
          </Button>
        </li>
        {productsChild2.value.children.map((node: any) => (
          <li
            class={`${
              node.type == "navItem"
                ? "w-full"
                : "w-[55px] h-[55px] bg-[#F7F7F7] rounded-full border border-black border-opacity-10 flex items-center justify-center"
            }`}
          >
            <a
              href={node.href}
              class={`${
                node.type == "navItem"
                  ? "flex items-center justify-between w-full text-primary-content uppercase px-4 py-4 border-b-[1px] font-medium text-sm border-black border-opacity-10"
                  : "text-black"
              }`}
            >
              {node.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MenuProducts;
