import type { ComponentChildren } from "preact";
import { useUI } from "deco-sites/montecarlo/sdk/useUI.ts";
import { useSignalEffect } from "@preact/signals";
import { useRef } from "preact/compat";



export interface Props {
  children: ComponentChildren;
}

export default function ClosedPopup({ children }: Props) {
  const { showPopup } = useUI();

  const refContainerPopup = useRef<HTMLDivElement>(null);


  useSignalEffect(() => {
    const show = sessionStorage.getItem("showpopup");

    const activePopup = () => {
      const show = sessionStorage.getItem("showpopup");

      if (show == null || show == "") {
        showPopup.value = true;
      } else {
        globalThis.window.removeEventListener("mousemove", activePopup)
      }
    }

    if (show == null || show == "") {
      globalThis.window.addEventListener("mousemove", activePopup)
    } else {
      globalThis.window.removeEventListener("mousemove", activePopup)
    }
  });

  // setTimeout(() => {
  //   showPopup.value = false;
  // }, 25000);

  return <>{showPopup.value ? <div ref={refContainerPopup}>{children}</div> : null}</>;
}
