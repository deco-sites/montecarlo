import type { ComponentChildren } from "preact";
import { effect, useSignal, useSignalEffect } from "@preact/signals";
import { search } from "apps/typesense/utils/product.ts";
import { useUI } from "deco-sites/montecarlo/sdk/useUI.ts";

interface MenuProps {
  activeAlert: boolean;
}

export interface Props {
  type: string;
}

export default function ScrollableContainer(
  { children, type }: { children: ComponentChildren; type: string },
) {
  const activeAlert = useSignal(true);

  effect(() => {
    const handleScroll = () => {
      if (globalThis.scrollY > 50) {
        activeAlert.value = false;
      } else {
        activeAlert.value = true;
      }
    };

    globalThis.addEventListener("scroll", handleScroll);

    return () => {
      globalThis.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <>
      {type === "Alert" && (
        <AlertContainer active={activeAlert.value}>{children}</AlertContainer>
      )}
      {type === "Menu" && (
        <MenuContainer activeAlert={activeAlert.value}>
          {children}
        </MenuContainer>
      )}
      {type === "search" &&
        (
          <SearchContainer active={activeAlert.value}>
            {children}
          </SearchContainer>
        )}
    </>
  );
}

function AlertContainer(
  { children, active }: { children: ComponentChildren; active: boolean },
) {
  return (
    <div
      class={`${active ? "translate-y-0 h-auto" : "-translate-y-16 h-0 duration-0"
        } transition-all duration-100`}
    >
      {children}
    </div>
  );
}
function SearchContainer(
  { children, active }: { children: ComponentChildren; active: boolean },
) {
  const lastScrollTop = useSignal(0);
  const delta = 5;
  const { displaySearchDrawer, activeS } = useUI();

  useSignalEffect(() => {
    const iconSearch = globalThis.document.querySelector(
      '[data="search-icon"]',
    );
    const iconSearchClose = globalThis.document.querySelector(
      '[data="search-icon-close"]',
    );
    const handleScroll = () => {
      const nowScrollTop = globalThis.scrollY ||
        document.documentElement.scrollTop;

      if (Math.abs(lastScrollTop.value - nowScrollTop) >= delta) {
        if (nowScrollTop > lastScrollTop.value) {
          activeS.value = false;
          displaySearchDrawer.value = false;
          iconSearch?.removeAttribute("disabled");
          iconSearchClose?.setAttribute("disabled", "");
        } else {
          activeS.value = true;
          displaySearchDrawer.value = true;
          iconSearch?.setAttribute("disabled", "true");
          iconSearchClose?.removeAttribute("disabled");
        }
        lastScrollTop.value = nowScrollTop;
      }
    };

    const handleScrollPDP = () => {
      const nowScrollTop = globalThis.scrollY ||
        document.documentElement.scrollTop;

      if (Math.abs(lastScrollTop.value - nowScrollTop) >= delta) {
        if (nowScrollTop > lastScrollTop.value) {
          activeS.value = false;
          displaySearchDrawer.value = false;
          iconSearch?.removeAttribute("disabled");
          iconSearchClose?.setAttribute("disabled", "");
        } else {
          activeS.value = false;
          displaySearchDrawer.value = false;
          iconSearch?.removeAttribute("disabled");
          iconSearchClose?.setAttribute("disabled", "");
        }
        lastScrollTop.value = nowScrollTop;
      }
    };

    if (window.location.href.includes("/p")) {
      activeS.value = false;
      const iconSearch = globalThis.document.querySelector(
        '[data="search-icon"]',
      );
      const iconSearchClose = globalThis.document.querySelector(
        '[data="search-icon-close"]',
      );
      if (!activeS.value) {
        iconSearch?.removeAttribute("disabled");
        iconSearchClose?.setAttribute("disabled", "true");
        globalThis.addEventListener("scroll", handleScrollPDP);
        return () => {
          globalThis.removeEventListener("scroll", handleScrollPDP);
        };
      }
      globalThis.addEventListener("scroll", handleScrollPDP);
      displaySearchDrawer.value = true;
      activeS.value = false;

      iconSearchClose?.removeAttribute("disabled");
      iconSearch?.setAttribute("disabled", "true");
    } else {
      globalThis.addEventListener("scroll", handleScroll);
      return () => {
        globalThis.removeEventListener("scroll", handleScroll);
      };
    }
  });

  return (
    <div
      class={`${displaySearchDrawer.value || activeS.value
          ? "translate-y-0 h-auto w-screen absolute left-0 top-full"
          : "-translate-y-36 h-0 duration-0 -z-10 hidden"
        } transition-all duration-100`}
    >
      {children}
    </div>
  );
}

function MenuContainer(
  { children, activeAlert }: {
    children: ComponentChildren;
    activeAlert: boolean;
  },
) {
  const active = useSignal(true);
  const lastScrollTop = useSignal(0);
  const delta = 5;

  useSignalEffect(() => {
    const handleScroll = () => {
      const nowScrollTop = globalThis.scrollY ||
        document.documentElement.scrollTop;

      if (Math.abs(lastScrollTop.value - nowScrollTop) >= delta) {
        if (nowScrollTop > lastScrollTop.value) {
          active.value = false;
        } else {
          active.value = true;
        }
        lastScrollTop.value = nowScrollTop;
      }
    };

    globalThis.addEventListener("scroll", handleScroll);

    return () => {
      globalThis.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <div
      class={`absolute left-0 w-full z-10  ${active.value
          ? "top-[105px] duration-100 shadow-header-menu"
          : "-top-[50px] duration-0 hover:hidden group-hover:hidden"
        } `}
    >
      {children}
    </div>
  );
}
