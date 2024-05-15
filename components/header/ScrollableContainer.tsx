import type { ComponentChildren } from "preact";
import { effect, useSignal, useSignalEffect } from "@preact/signals";

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

  console.log("entrou aqui");

  effect(() => {
    const handleScroll = () => {
      if (globalThis.scrollY > 50) {
        activeAlert.value = false;
      } else {
        activeAlert.value = true;
      }
      console.log("scroll");
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
    </>
  );
}

function AlertContainer(
  { children, active }: { children: ComponentChildren; active: boolean },
) {
  return (
    <div
      class={`${
        active ? "translate-y-0 h-auto" : "-translate-y-16 h-0 duration-0"
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

      console.log("scroll");
    };

    globalThis.addEventListener("scroll", handleScroll);

    return () => {
      globalThis.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <div
      class={`absolute left-0 w-full z-10 ${
        active.value ? "top-[108px] duration-100" : "-top-[50px] duration-0"
      } `}
    >
      {children}
    </div>
  );
}
