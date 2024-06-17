import Component from "deco-sites/montecarlo/components/header/ScrollableContainer.tsx";
import type { Props } from "deco-sites/montecarlo/components/header/ScrollableContainer.tsx";
import type { ComponentChildren } from "preact";

export default function island(
  { children, type }: { children: ComponentChildren; type: string },
) {
  return <Component children={children} type={type} />;
}
