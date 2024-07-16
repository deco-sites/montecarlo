/**
 * This file takes care of global app side effects,
 * like clicking on add to cart and the cart modal being displayed
 */

import { signal } from "@preact/signals";

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

export interface Navmenu {
  title: string;
  list: ListLinks[] | undefined;
}

const displayCart = signal(false);
const displayMenu = signal(false);
const displaySearchPopup = signal(false);
const displaySearchDrawer = signal(false);
const isMobile = signal(false);
const displayMenuProducts = signal(false);
const displayMenuProductsChild = signal(false);
const productsChild = signal<Navmenu | undefined>(undefined);
const productsChild2 = signal<ListLinks | null>(null);
const showPopup = signal<boolean>(false);
const activeS = signal<boolean>(true);

const state = {
  displayCart,
  displayMenu,
  displaySearchPopup,
  displaySearchDrawer,
  isMobile,
  displayMenuProducts,
  displayMenuProductsChild,
  productsChild,
  productsChild2,
  showPopup,
  activeS,
};

// Keyboard event listeners
addEventListener("keydown", (e: KeyboardEvent) => {
  const isK = e.key === "k" || e.key === "K" || e.keyCode === 75;

  // Open Searchbar on meta+k
  if (e.metaKey === true && isK) {
    displaySearchPopup.value = true;
  }
});

export const useUI = () => state;
