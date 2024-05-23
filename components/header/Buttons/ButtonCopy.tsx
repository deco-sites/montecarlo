import type { ComponentChildren } from "preact";

export interface Props {
  label?: string;
  children: ComponentChildren;
}

export default function ButtonCopy({ label = "", children }: Props) {
  function CopyCupom() {
    navigator.clipboard.writeText(label);
  }

  return (
    <button onClick={CopyCupom}>
      {children}
    </button>
  );
}
