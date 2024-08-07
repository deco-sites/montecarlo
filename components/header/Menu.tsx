import Button from "deco-sites/montecarlo/components/ui/Button.tsx";
import IconHeart from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/heart.tsx";
import IconUser from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/user.tsx";
import IconChevronRight from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/chevron-right.tsx";
import Icon from "deco-sites/montecarlo/components/ui/Icon.tsx";
import { useUI } from "deco-sites/montecarlo/sdk/useUI.ts";
import { ImageWidget } from "apps/admin/widgets.ts";

export interface Link {
  label: string;
  href: string;
}

export interface ListLinks {
  title: string;
  listLinks: Link[];
  linkShowMore: {
    label: string;
    href: string;
  };
}

export interface Image {
  img: {
    src: ImageWidget;
    alt: string;
    aspectRatio: "2/1" | "1/1";
  };
  href: string;
  title: string;
  /** @format rich-text */
  conter: string;
}

export interface MenuNavItem {
  label: string;
  href?: string;
  /** @format color-input */
  background?: string;
  /** @format color-input */
  color?: string;
  listlinks?: ListLinks[];
  image?: Image[];
}
export interface Props {
  items?: MenuNavItem[];
}

function Menu({ items }: Props) {
  const {
    displayMenuProducts,
    displayMenu,
    productsChild,
  } = useUI();

  return (
    <div class="flex flex-col h-auto w-full bg-white pl-10 pr-2">
      <ul class="flex flex-col text-xs gap-4">
        {items?.map((item, index) => (
          <li class="font-medium">
            {item.listlinks !== undefined && item.listlinks?.length > 0
              ? (
                <Button
                  class={`flex items-center justify-between py-3 m-auto w-full bg-white font-normal text-base text-black`}
                  onClick={() => {
                    displayMenuProducts.value = true;
                    displayMenu.value = false;
                    productsChild.value = {
                      title: item.label,
                      list: item.listlinks,
                    };
                  }}
                >
                  {item.label}
                  <IconChevronRight class="w-8 h-8" stroke={1} size={30} />
                </Button>
              )
              : (
                <a
                  href={item.href}
                  class={`flex items-center justify-between ${
                    item.background
                      ? "py-2 px-3 inline-flex w-fit"
                      : "py-3 w-full"
                  } m-auto font-normal text-base`}
                  style={{
                    backgroundColor: item.background
                      ? item.background
                      : "transparent",
                    color: item.color ? item.color : "#000",
                  }}
                >
                  {item.label}
                </a>
              )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Menu;
