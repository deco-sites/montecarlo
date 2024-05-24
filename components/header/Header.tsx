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

export interface AlertMessage {
  title?: HTMLWidget;
  labelButton?: string;
  cupom?: string;
}

export interface Logo {
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

  const style = {
    "show-alert-header": `@keyframes show-alert-header{
          from{
            transform: translateY(0px);
          }
          to{
            transform: translateY(-32px);
          }
    }
    
    .show-alert-header{
      animation: show-alert-header linear;
      animation-timeline: scroll();
      animation-range: 0% 1%;
      animation-fill-mode: both;
    }
    `,
  };

  return (
    <>
      <header style={{ height: headerHeight }}>
        <Drawers
          menu={{ items: navItems }}
          searchbar={searchbar}
          platform={platform}
          bonus={cart.bonus}
        >
          <style
            dangerouslySetInnerHTML={{ __html: style["show-alert-header"] }}
          >
          </style>
          <div class="bg-base-100 fixed w-full z-50 show-alert-header">
            {alerts && alerts.length > 0 && <Alert alerts={alerts} />}
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
