import type { ComponentChildren } from "preact";
import { useRef } from "preact/compat";
import { useSignal, useSignalEffect } from "@preact/signals";

export interface Props {
  children: ComponentChildren;
}

export default function ZoomImage({ children }: Props) {
  const zoom = useRef<HTMLDivElement>(null);
  const activeZoom = useSignal(false);

  console.log("click");
  useSignalEffect(() => {
    console.log("click", activeZoom.value);
    if (zoom.current) {
      if (activeZoom) {
        zoom.current.addEventListener("mousemove", (e) => {
          console.log(
            "x",
            zoom.current?.clientTop,
            "y",
            zoom.current?.clientLeft,
          );
        });
      } else {
        zoom.current.removeEventListener("mousemove", (e) => {
          console.log(
            "x",
            zoom.current?.clientTop,
            "y",
            zoom.current?.clientLeft,
          );
        });
      }
    }
  });

  return (
    <div ref={zoom} onClick={() => console.log("click")} class="w-full">
      {children}
    </div>
  );
}
