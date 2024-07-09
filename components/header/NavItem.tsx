import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { headerHeight } from "./constants.ts";
import { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";
import ListLinksOurImage from "deco-sites/montecarlo/components/header/ComponentMenu.tsx";
import { Images } from "https://deno.land/x/openai@v4.19.1/resources/mod.ts";
import {
  SendEventOnClick,
  SendEventOnView,
} from "../../components/Analytics.tsx";
import { useId } from "../../sdk/useId.ts";

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
  conter: HTMLWidget;
}

export interface MenuNavItem {
  label: string;
  href?: string;
  /** @format color-input */
  background?: string;
  /** @format color-input */
  color?: string;
  /**
   * @maximum 5
   */
  listlinks?: ListLinks[];
  /**
   * @maximum 5
   */
  image?: Image[];
}

const GRIDCOLUMN = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-[auto_auto_auto]",
  4: "grid-cols-[auto_auto_auto_auto]",
  5: "grid-cols-[auto_auto_auto_auto]",
  6: "grid-cols-[auto_auto_auto_auto_auto]",
};

const COLUMNSTARTIMG = {
  1: "col-start-5 col-end-6",
  2: "col-start-3 col-end-6",
  3: "col-start-3 col-end-6",
  4: "col-start-2 col-end-6",
  5: "col-start-1 col-end-6",
  6: "col-start-1 col-end-6",
};
const COLUMNSTARTLINKS = {
  1: "col-start-1 col-end-2",
  2: "col-start-1 col-end-3",
  3: "col-start-1 col-end-3",
  4: "col-start-1 col-end-5",
  5: "col-start-1 col-end-5",
};

function NavItem({ item }: { item: MenuNavItem }) {
  const { href, label, listlinks, image } = item;

  let cont: number = 0;
  let contLinks: number = 0;
  let contImages: number = 0;
  if (listlinks != undefined) {
    contLinks = listlinks.length;
  }
  if (image != undefined) {
    image.map((img) => {
      contImages += img.img.aspectRatio == "2/1" ? 2 : 1;
    });
  }
  cont = contLinks + contImages;

  const id = useId();

  return (
    <li class="group flex items-center gap-3">
      <a href={href} class="my-auto" id={id}>
        <span
          class={`group-hover:font-semibold cursor-pointer text-sm font-thin text-black ${
            item.background ? "inline-flex px-3 py-1" : "px-5 py-3"
          }`}
          style={{
            backgroundColor: item.background ? item.background : "transparent",
            color: item.color ? item.color : "#000",
          }}
        >
          {label}
        </span>
        <SendEventOnClick
          id={id}
          event={{
            name: "select_promotion",
            params: {
              creative_name: label,
              creative_slot: id,
              promotion_id: href,
              promotion_name: label,
              items: [],
            },
          }}
        />
      </a>

      {listlinks !== undefined && listlinks?.length > 0
        ? (
          <div
            data-menu
            class={`absolute top-full left-0 right-0 hidden hover:grid group-hover:grid bg-base-100 z-50 items-start justify-center gap-2 border-t border-b-2 border-base-200 w-screen px-28 py-16 duration-200 shadow-menu
              ${GRIDCOLUMN[cont as keyof typeof GRIDCOLUMN]}`}
          >
            {listlinks !== undefined && listlinks?.length > 0 && (
              <div
                class={`flex flex-row justify-between gap-5 ${
                  COLUMNSTARTLINKS[contLinks as keyof typeof COLUMNSTARTLINKS]
                }`}
              >
                {listlinks.map((links, index) => (
                  <ListLinksOurImage listlinks={links} index={index + 1} />
                ))}
              </div>
            )}
            {image != undefined && image?.length > 0 && (
              <div
                class={`grid justify-start gap-2 ${
                  COLUMNSTARTIMG[contImages as keyof typeof GRIDCOLUMN]
                }`}
              >
                {image?.map((img, index) => (
                  <ListLinksOurImage image={img} index={index + 1} />
                ))}
              </div>
            )}
          </div>
        )
        : null}
    </li>
  );
}

export default NavItem;
