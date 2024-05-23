import Component from "deco-sites/montecarlo/components/header/Buttons/ButtonCopy.tsx";
import type { Props } from "deco-sites/montecarlo/components/header/Buttons/ButtonCopy.tsx";

export default function Island({ label, children }: Props) {
  return (
    <Component label={label}>
      {children}
    </Component>
  );
}
