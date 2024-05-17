import { useUI } from "deco-sites/montecarlo/sdk/useUI.ts";
import Button from "deco-sites/montecarlo/components/ui/Button.tsx";

function MenuProducts() {
  const { productsChild, displayMenuProducts } = useUI();

  console.log("menus", productsChild.value, displayMenuProducts.value);

  return (
    <div>
      <ul
        class={"flex flex-wrap mt-4 m-auto pl-10 pr-2 gap-10 w-full h-full"}
      >
        {productsChild.value?.map((node) => (
          <div
            class={"w-full rounded-full sflex items-center justify-center flex flex-col gap-3"}
          >
            <a class="flex w-full font-medium text-black text-base">
              {node.title}
            </a>
            <ul class="w-full flex flex-col gap-3">
              {node.listLinks.map((link) => (
                <li>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default MenuProducts;
