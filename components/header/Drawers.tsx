import type { Props as MenuProps } from "../../components/header/Menu.tsx";
import Cart from "../../components/minicart/Cart.tsx";
import type { Props as SearchbarProps } from "../../components/search/Searchbar.tsx";
import Button from "../../components/ui/Button.tsx";
import Drawer from "../../components/ui/Drawer.tsx";
import Icon from "../../components/ui/Icon.tsx";
import { useUI } from "../../sdk/useUI.ts";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import type { ComponentChildren } from "preact";
import { lazy, Suspense } from "preact/compat";
import MenuProducts from "deco-sites/montecarlo/components/header/MenuProductsChild.tsx";
import { useId } from "deco-sites/montecarlo/sdk/useId.ts";
import MenuProductsChild from "deco-sites/montecarlo/components/header/MenuProductsChild.tsx";

const Menu = lazy(() => import("../../components/header/Menu.tsx"));
const Searchbar = lazy(() => import("../../components/search/Searchbar.tsx"));

export interface Props {
  menu: MenuProps;
  searchbar?: SearchbarProps;
  /**
   * @ignore_gen true
   */
  children?: ComponentChildren;
  platform: ReturnType<typeof usePlatform>;
}

const Aside = (
  {
    onClose,
    children,
    chevronClick,
    activeLast = true,
  }: {
    onClose?: () => void;
    chevronClick?: () => void;
    children: ComponentChildren;
    activeLast?: boolean;
  },
) => (
  <div class="bg-white grid grid-rows-[auto_1fr] max-w-[425px] min-h-[100%] max-h-[100vh] overflow-y-auto w-full">
    <div
      class={` py-4 relative flex flex-col`}
    >
      <div
        class={`flex h-full justify-between items-center w-11/12 m-auto`}
      >
        {activeLast &&
          (
            <>
              <Button
                class="btn-ghost p-2"
                onClick={chevronClick}
              >
                <Icon
                  class="text-black w-8 h-8"
                  id="ChevronLeft"
                  strokeWidth={1}
                  size={24}
                />
              </Button>
            </>
          )}
        <Button
          class="text-black h-fit p-2 rounded-full"
          onClick={onClose}
        >
        </Button>

        <button
          class="rounded-full flex justify-center items-center h-[40px] w-[40px]"
          onClick={onClose}
        >
          <Icon
            id="XMark"
            class="w-8 h-8 text-black"
            size={20}
            strokeWidth={1}
          />
        </button>
      </div>
    </div>
    <Suspense
      fallback={
        <div class="w-full flex items-center justify-center">
          <span class="loading loading-ring" />
        </div>
      }
    >
      {children}
    </Suspense>
  </div>
);

function Drawers({ menu, searchbar, children, platform }: Props) {
  const {
    displayCart,
    displayMenu,
    displaySearchDrawer,
    displayMenuProducts,
    displayMenuProductsChild,
  } = useUI();
  const id = useId();

  return (
    <>
      <Drawer
        class={`fixed z-50 w-full`}
        open={displayMenu.value || displayMenuProductsChild.value}
        onClose={() => {
          displayMenu.value = false;
          displayMenuProductsChild.value = false;
        }}
        aside={
          <Aside
            onClose={() => {
              displayMenu.value = false;
              displayMenuProductsChild.value = false;
            }}
            chevronClick={() => {
              displayMenuProductsChild.value = false;
              displayMenuProducts.value = true;
            }}
            activeLast={false}
          >
            {displayMenu.value && <Menu {...menu} />}
          </Aside>
        }
      >
        <Drawer
          open={displayMenuProducts.value}
          onClose={() => displayMenuProducts.value = false}
          aside={
            <Aside
              onClose={() => displayMenuProducts.value = false}
              chevronClick={() => {
                displayMenuProducts.value = false;
                displayMenu.value = true;
              }}
            >
              <MenuProductsChild />
            </Aside>
          }
        >
          <Drawer // right drawer
            class="drawer-end"
            open={displayCart.value}
            onClose={() => displayCart.value = false}
            aside={
              <Aside
                chevronClick={() => displayCart.value = false}
                onClose={() => displayCart.value = false}
              >
                <Cart
                  platform={platform}
                />
              </Aside>
            }
          >
            {children}
          </Drawer>
        </Drawer>
      </Drawer>
    </>
  );
}

export default Drawers;
