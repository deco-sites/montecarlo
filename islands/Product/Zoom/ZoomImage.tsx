// deno-lint-ignore-file

import type { ComponentChildren } from "preact";
import { useRef } from "preact/compat";
import { useSignal, useSignalEffect } from "@preact/signals";

export interface Props {
  children: ComponentChildren;
}

export default function ZoomImage({ children }: Props) {
  const zoom = useRef<HTMLDivElement>(null);
  const imgZoom = useRef<HTMLDivElement>(null);
  const activeZoom = useSignal(false);

  useSignalEffect(() => {
    function Zoom(e: MouseEvent, element: DOMRect) {
      if (zoom.current) {
        const eixoX = e.clientX - element.x;
        const eixoY = e.clientY - element.y;

        if (imgZoom.current) {
          imgZoom.current.style.transform = `scale(2, 2)`;
          imgZoom.current.style.transformOrigin = `${eixoX}px ${eixoY}px`;
        }
      }
    }
    if (zoom.current) {
      const element: DOMRect = zoom.current.getBoundingClientRect();
      if (activeZoom.value) {
        zoom.current.addEventListener("mousemove", (e) => {
          Zoom(e, element);
        });
        zoom.current.addEventListener("click", (e) => {
          Zoom(e, element);
        });
        zoom.current.addEventListener("mouseout", (e) => {
          if (imgZoom.current) {
            imgZoom.current.style.transform = `scale(1, 1)`;
            imgZoom.current.style.transformOrigin = `0px 0px`;
          }
        });
      } else {
        zoom.current.addEventListener("mousemove", (e) => {
          Zoom(e, element);
          if (imgZoom.current) {
            imgZoom.current.style.transform = `scale(1, 1)`;
            imgZoom.current.style.transformOrigin = `0px 0px`;
          }
        });
        zoom.current.addEventListener("click", (e) => {
          Zoom(e, element);
          if (imgZoom.current) {
            imgZoom.current.style.transform = `scale(1, 1)`;
            imgZoom.current.style.transformOrigin = `0px 0px`;
          }
        });
      }
    }
  });

  return (
    <div
      ref={zoom}
      onClick={() => activeZoom.value = !activeZoom.value}
      class={`w-full h-full origin-[0px_0px] ${
        activeZoom.value ? "cursor-zoom-out" : "cursor-zoom-in"
      }`}
    >
      <div class="w-full h-full" ref={imgZoom}>
        {children}
      </div>
    </div>
  );
}
