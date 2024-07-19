import { useUI } from "deco-sites/montecarlo/sdk/useUI.ts";
import Button from "deco-sites/montecarlo/components/ui/Button.tsx";

function MenuProducts() {
  const { productsChild, displayMenuProducts } = useUI();

  return (
    <div>
      <ul
        class={"flex flex-wrap mt-4 mb-6 pb-16 m-auto pl-10 pr-2 gap-10 w-full"}
      >
        <span class="text-base font-semibold text-black">
          {productsChild.value?.title}
        </span>
        {productsChild.value?.list?.map((node) => (
          <div
            class={"w-full rounded-full items-center justify-center flex flex-col gap-3 text-sm"}
          >
            <a class="flex w-full font-medium text-black ">
              {node.title}
            </a>
            <ul class="w-full flex flex-col gap-3">
              {node.listLinks.map((link) => (
                <li>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
            <a
              class="font-semibold text-[#CAC7B6] text-start w-full"
              href={node.linkShowMore.href}
            >
              {node.linkShowMore.label}
            </a>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default MenuProducts;
