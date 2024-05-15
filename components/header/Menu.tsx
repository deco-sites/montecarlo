import Button from "deco-sites/montecarlo/components/ui/Button.tsx";
import IconHeart from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/heart.tsx";
import IconUser from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/user.tsx";
import IconChevronRight from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/chevron-right.tsx";
import Icon from "deco-sites/montecarlo/components/ui/Icon.tsx";
import { useUI } from "deco-sites/montecarlo/sdk/useUI.ts";

export interface lastChild {
  type: "navItem" | "sizeItem";
  label: string;
  href?: string;
}
interface INavItem {
  label: string;
  href?: string;
  children?: lastChild[];
}
export interface MenuNavItem {
  label: string;
  href?: string;
  children?: INavItem[];
  destaque?: boolean;
}
export interface Props {
  items: MenuNavItem[];
}

function Menu({ items }: Props) {
  const {
    displayMenuProducts,
    displayMenu,
    productsChild,
  } = useUI();

  return (
    <div class="flex flex-col h-auto w-full bg-white">
      <ul class="flex flex-col text-xs">
        {items.map((item, index) => (
          <li class="font-medium">
            {item.children !== undefined && item.children?.length > 0
              ? (
                <Button
                  class={`flex border-b-[1px] items-center justify-between py-3 m-auto w-full bg-white font-normal text-[14px] leading-[17.5px] ${
                    items.length - 1 === index
                      ? "text-primary bg-secondary"
                      : "text-primary-content"
                  } hover:bg-inherit border-black border-opacity-10 border-t-0`}
                  onClick={() => {
                    displayMenuProducts.value = true;
                    displayMenu.value = false;
                    productsChild.value = {
                      label: item.label,
                      children: item.children,
                      href: item.href,
                      // deno-lint-ignore no-explicit-any
                    } as any;
                  }}
                >
                  {item.label}
                  <IconChevronRight class="w-5 h-5" />
                </Button>
              )
              : (
                <a
                  href={item.href}
                  class={`flex border-b-[1px] items-center justify-between px-4 py-4 m-auto w-full font-normal text-[14px] leading-[17.5px] ${
                    index === items.length - 1
                      ? "text-primary bg-secondary"
                      : "text-primary-content"
                  }`}
                >
                  {item.label}
                </a>
              )}
          </li>
        ))}
      </ul>

      <ul class="flex flex-col text-primary">
        <li>
          <a
            class="flex items-center gap-4 px-4 py-2 border-b-[1px]"
            href={"/cart"}
          >
            <div class="gap-2 flex items-center justify-center">
              <Icon
                id="ShoppingCart"
                strokeWidth={1}
                class="w-[18px] h-[21px]"
              />
              <span class={`text-sm text-primary-content font-bold`}>
                Carrinho
              </span>
            </div>
          </a>
        </li>
        <li>
          <a
            class="flex items-center gap-4 px-4 py-2 border-b-[1px]"
            href={"/account"}
          >
            <div class="flex gap-2 items-center justify-center">
              <Icon id="User" strokeWidth={1} class="w-[22px] h-[22px]" />
            </div>
          </a>
        </li>
        <li>
          <a
            class="flex items-center gap-4 px-4 py-2 border-b-[1px]"
            href={"/account/wishlist"}
          >
            <div class="flex gap-2 items-center justify-center">
              <span class="text-[14px] leading-[17.5px] text-primary-content font-bold">
                Favoritos
              </span>
            </div>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
