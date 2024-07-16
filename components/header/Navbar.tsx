import type { Props as SearchbarProps } from "../../components/search/Searchbar.tsx";
import Icon from "../../components/ui/Icon.tsx";
import { MenuButton, SearchButton } from "../../islands/Header/Buttons.tsx";
import CartButtonLinx from "../../islands/Header/Cart/linx.tsx";
import CartButtonShopify from "../../islands/Header/Cart/shopify.tsx";
import CartButtonVDNA from "../../islands/Header/Cart/vnda.tsx";
import CartButtonVTEX from "../../islands/Header/Cart/vtex.tsx";
import CartButtonWake from "../../islands/Header/Cart/wake.tsx";
import CartButtonNuvemshop from "../../islands/Header/Cart/nuvemshop.tsx";
import Searchbar from "../search/Searchbar.tsx";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import NavItem from "./NavItem.tsx";
import { navbarHeight } from "./constants.ts";
import { Buttons, Logo } from "../../components/header/Header.tsx";
import ScrollableContainer from "deco-sites/montecarlo/islands/Header/ScrollableContainer.tsx";
import { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";
import {
  SendEventOnClick,
  SendEventOnView,
} from "../../components/Analytics.tsx";
import { useId } from "../../sdk/useId.ts";
import Image from "apps/website/components/Image.tsx";

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
  listlinks?: ListLinks[];
  image?: Image[];
}

const style = {
  "header-mobile": `@keyframes header-mobile{
        from{
          height:75px;
          grid-template-columns: 18% 53% 18%;        
        }
        to{
          height:59px;
          grid-template-columns: 22% 46% 22%;
        }
  }
  
  .header-mobile{
    animation: header-mobile linear;
    animation-timeline: scroll();
    animation-range: 0% 1%;
    animation-fill-mode: both;
  }
  `,
};

// Make it sure to render it on the server only. DO NOT render it on an island
function Navbar(
  {
    items,
    searchbar,
    logo,
    buttons,
    logoPosition = "left",
    device,
    help,
    ourStores,
  }: {
    items: MenuNavItem[];
    searchbar?: SearchbarProps;
    logo?: Logo;
    buttons?: Buttons;
    logoPosition?: "left" | "center";
    device: "mobile" | "desktop" | "tablet";
    help?: {
      label?: string;
      href?: string;
    };
    ourStores?: {
      label?: string;
      href?: string;
    };
  },
) {
  const platform = usePlatform();

  const id = useId();

  // Mobile header
  if (device === "mobile") {
    return (
      <div class="lg:hidden grid grid-cols-[68px_auto_68px] justify-between items-center border-b border-base-200 w-full px-4 pb-6 gap-2 header-mobile h-full shadow-header-menu ">
        <style dangerouslySetInnerHTML={{ __html: style["header-mobile"] }}>
        </style>
        {/* DL click em button.tsx */}
        <MenuButton />
        {logo && (
          <a
            href="/"
            class="flex-grow inline-flex items-center justify-center header-mobile h-full"
            aria-label="Store logo"
            id={id}
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width || 174}
              height={logo.height || 32}
              class="w-auto h-full object-cover max-h-11"
            />
            <SendEventOnClick
              id={id}
              event={{
                name: "login",
                params: {
                  method: "/",
                },
              }}
            />
          </a>
        )}

        <div class="flex justify-end gap-2">
          <SearchButton />
          {platform === "vtex" && <CartButtonVTEX />}
          {platform === "vnda" && <CartButtonVDNA />}
          {platform === "wake" && <CartButtonWake />}
          {platform === "linx" && <CartButtonLinx />}
          {platform === "shopify" && <CartButtonShopify />}
          {platform === "nuvemshop" && <CartButtonNuvemshop />}
        </div>
        <ScrollableContainer type="search">
          <div class="bg-white px-2 py-1">
            {searchbar &&
              (
                <Searchbar
                  placeholder={searchbar.placeholder}
                  action={searchbar.action}
                  name={searchbar.name}
                  loader={searchbar.loader}
                  platform={searchbar.platform}
                />
              )}
          </div>
        </ScrollableContainer>
      </div>
    );
  } else {
    // Desktop header
    return (
      <div class="hidden sm:grid sm:grid-cols-3 items-center border-b border-base-200 w-full px-6 pt-4 pb-3 shadow-header-menu lg:min-h-[80px]">
        <ul
          class={`flex gap-6 col-span-1 ${
            logoPosition === "left" ? "justify-center" : "justify-start"
          }`}
        >
          <div class="flex flex-row gap-5 text-xs text-black">
            {ourStores && (
              <a
                href={ourStores.href}
                class="hover:font-semibold cursor-pointer"
                id={id + "ourStores"}
              >
                <div class="flex flex-row gap-1">
                  <Icon id="Location" width={18} height={22} />
                  {ourStores.label}
                </div>
                <SendEventOnClick
                  id={id + "ourStores"}
                  event={{
                    name: "login",
                    params: {
                      method: ourStores.href,
                    },
                  }}
                />
              </a>
            )}
            {help && (
              <a
                href={help.href}
                class="hover:font-semibold cursor-pointer"
                id={id + "help"}
              >
                {help.label}
                <SendEventOnClick
                  id={id + "help"}
                  event={{
                    name: "login",
                    params: {
                      method: help.href,
                    },
                  }}
                />
              </a>
            )}
          </div>
        </ul>
        <div
          class={`flex ${
            logoPosition === "left"
              ? "justify-start -order-1"
              : "justify-center"
          }`}
        >
          {logo && (
            <a
              href="/"
              aria-label="Store logo"
              class="block"
              id={id + "logo"}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width || 100}
                height={logo.height || 13}
                class="h-full w-auto max-h-12 object-cover"
                loading={"eager"}
              />
              <SendEventOnClick
                id={id + "logo"}
                event={{
                  name: "login",
                  params: {
                    method: "/",
                  },
                }}
              />
            </a>
          )}
        </div>
        <div class="flex-none flex items-center justify-end gap-5 col-span-1">
          {searchbar &&
            (
              <Searchbar
                placeholder={searchbar.placeholder}
                action={searchbar.action}
                name={searchbar.name}
                loader={searchbar.loader}
                platform={searchbar.platform}
              />
            )}
          {!buttons?.hideAccountButton && (
            <a
              class="flex items-center text-xs font-thin"
              href="/account"
              aria-label="Account"
              id={id + "account"}
            >
              <div class="flex btn btn-circle btn-sm btn-ghost gap-1 justify-center items-center">
                <Icon id="userAccont" size={21} strokeWidth={0.4} />
              </div>
              <SendEventOnClick
                id={id + "account"}
                event={{
                  name: "login",
                  params: {
                    method: "/account",
                  },
                }}
              />
            </a>
          )}
          {!buttons?.hideWishlistButton && (
            <a
              class="flex items-center text-xs font-thin"
              href="/wishlist"
              aria-label="Wishlist"
              id={id + "wishlist"}
            >
              <button
                class="flex btn btn-circle btn-sm btn-ghost gap-1"
                aria-label="Wishlist"
              >
                <Icon id="heartCustom" size={23} strokeWidth={1} />
              </button>
              <SendEventOnClick
                id={id + "wishlist"}
                event={{
                  name: "login",
                  params: {
                    method: "/wishlist",
                  },
                }}
              />
            </a>
          )}
          {!buttons?.hideCartButton && (
            <div class="flex items-center text-xs font-thin">
              {platform === "vtex" && <CartButtonVTEX />}
              {platform === "vnda" && <CartButtonVDNA />}
              {platform === "wake" && <CartButtonWake />}
              {platform === "linx" && <CartButtonLinx />}
              {platform === "shopify" && <CartButtonShopify />}
              {platform === "nuvemshop" && <CartButtonNuvemshop />}
            </div>
          )}
        </div>
        {items.length > 0 && device == "desktop" &&
          (
            <ScrollableContainer type="Menu">
              <ul class="hidden lg:flex justify-center w-full items-center text-sm text-black min-h-[40px] bg-base-100 ">
                {/* DL click navItem */}
                {items.map((item, index) => (
                  <NavItem
                    item={item}
                  />
                ))}
              </ul>
            </ScrollableContainer>
          )}
      </div>
    );
  }
}

export default Navbar;
