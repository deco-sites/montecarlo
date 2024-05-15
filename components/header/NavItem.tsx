import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { headerHeight } from "./constants.ts";

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

function NavItem({ item }: { item: MenuNavItem }) {
  const { href, label, children } = item;

  return (
    <li class="group flex items-center">
      <a href={href} class="my-auto">
        <span class="group-hover:underline text-sm font-thin text-black">
          {label}
        </span>
      </a>

      {children && children.length > 0 &&
        (
          <div
            class="fixed hidden hover:flex group-hover:flex bg-base-100 z-50 items-start justify-center gap-6 border-t border-b-2 border-base-200 w-screen"
            style={{ top: "0px", left: "0px", marginTop: headerHeight }}
          >
            {
              /* {image?.url && (
              <Image
                class="p-6"
                src={image.url}
                alt={image.alternateName}
                width={300}
                height={332}
                loading="lazy"
              />
            )} */
            }
            <ul class="flex items-start justify-center gap-6">
              {children.map((node) => (
                <li class="p-6">
                  <a class="hover:underline" href={node.href}>
                    <span>{node.label}</span>
                  </a>

                  <ul class="flex flex-col gap-1 mt-4">
                    {node.children?.map((leaf) => (
                      <li>
                        <a class="hover:underline" href={leaf.href}>
                          <span class="text-xs">{leaf.label}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}
    </li>
  );
}

export default NavItem;
