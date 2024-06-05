import type { ComponentChildren } from "preact";
import { useUI } from "deco-sites/montecarlo/sdk/useUI.ts";

export interface Props {
  children: ComponentChildren;
}

export default function ClosedPopup({ children }: Props) {
  const { showPopup } = useUI();

  setTimeout(() => {
    showPopup.value = false;
  }, 5000);

  return <>{showPopup.value ? <div>{children}</div> : null}</>;
}
