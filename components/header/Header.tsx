import { AppContext } from "../../apps/site.ts";
import type { Props as SearchbarProps } from "../../components/search/Searchbar.tsx";
import Drawers from "../../islands/Header/Drawers.tsx";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import type { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import type { SectionProps } from "deco/types.ts";
import Alert from "./Alert.tsx";
import Navbar from "./Navbar.tsx";
import { headerHeight } from "./constants.ts";
import { useUI } from "../../sdk/useUI.ts";
import { Section } from "deco/blocks/section.ts";
import type { Props as PropsBonus } from "deco-sites/montecarlo/components/product/Modal/BonusCart.tsx";
import ScrollableContainer from "deco-sites/montecarlo/islands/Header/ScrollableContainer.tsx";

export interface AlertMessage {
  /** @format rich-text */
  title?: string;
  labelButton?: string;
  cupom?: string;
}

export interface Logo {
  /**
   * @description size Image 244x45
   */
  src: ImageWidget;
  alt: string;
  width?: number;
  height?: number;
}
export interface Buttons {
  hideSearchButton?: boolean;
  hideAccountButton?: boolean;
  hideWishlistButton?: boolean;
  hideCartButton?: boolean;
}

/**
 * @titleBy href
 */
export interface Link {
  label: string;
  href: string;
}

/**
 * @titleBy title
 */
export interface ListLinks {
  title: string;
  listLinks: Link[];
  linkShowMore: {
    label: string;
    href: string;
  };
}

/**
 * @titleBy href
 */
export interface Image {
  /**
   * @description size Image in aspectRatio 2/1 = 500x250, or aspectRatio 1/1 = 250x250
   */
  img: {
    src: ImageWidget;
    alt: string;
    aspectRatio: "2/1" | "1/1";
  };
  href: string;
  title: string;
  /**
   * @title Content
   */
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

export interface Props {
  alerts?: AlertMessage[];
  interval?: number;

  ourStores?: {
    label?: string;
    href?: string;
  };

  help?: {
    label?: string;
    href?: string;
  };

  /** @title Search Bar */
  searchbar?: Omit<SearchbarProps, "platform">;

  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: MenuNavItem[];

  /** @title Logo */
  logo?: Logo;

  logoPosition?: "left" | "center";

  cart: {
    bonus?: PropsBonus;
  };

  buttons?: Buttons;
}

export function Teste() {
  return <div>teste</div>;
}

function Header({
  alerts,
  searchbar,
  navItems,
  logo = {
    src:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/986b61d4-3847-4867-93c8-b550cb459cc7",
    width: 100,
    height: 16,
    alt: "Logo",
  },
  logoPosition = "center",
  buttons,
  device,
  ourStores,
  help,
  cart,
}: SectionProps<typeof loader>) {
  const platform = usePlatform();
  const items = navItems ?? [];

  return (
    <>
      <header style={{ height: headerHeight }} class="lg:mb-8">
        <Drawers
          menu={{ items: navItems }}
          searchbar={searchbar}
          platform={platform}
          bonus={cart.bonus}
        >
          <div class="bg-base-100 fixed w-full z-50 ">
            {alerts && alerts.length > 0 &&
              (
                <ScrollableContainer type="Alert">
                  <Alert alerts={alerts} />
                </ScrollableContainer>
              )}
            <Navbar
              device={device}
              items={items}
              searchbar={searchbar && { ...searchbar, platform }}
              ourStores={ourStores}
              help={help}
              logo={logo}
              logoPosition={logoPosition}
              buttons={buttons}
            />
          </div>
        </Drawers>
      </header>
    </>
  );
}

export const loader = (props: Props, _req: Request, ctx: AppContext) => {
  const { isMobile } = useUI();

  isMobile.value = ctx.device === "desktop" ? false : true;

  return { ...props, device: ctx.device };
};

export default Header;
