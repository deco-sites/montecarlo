// deno-lint-ignore-file

import type { ComponentChildren } from "preact";
import { useRef } from "preact/compat";
import { useSignal, useSignalEffect } from "@preact/signals";

export interface Props {
  children: ComponentChildren;
}

export default function ZoomImage({ children }: Props) {
  const zoom = useRef<HTMLDivElement>(null);
  const activeZoom = useSignal(false);

  useSignalEffect(() => {
    function Zoom(e: MouseEvent, element: DOMRect) {
      if (zoom.current) {
        const porcentageX = ((zoom.current.clientWidth * 2) / 100) * 25;
        const porcentageY = ((zoom.current.clientHeight * 2) / 100) * 25;

        const minX = 10;
        const minY = 10;

        const maxX = porcentageX;
        const maxY = porcentageY;

        const eixoX = (e.clientX - element.x) <= minX
          ? minX
          : (e.clientX - element.x) >= maxX
          ? maxX
          : (e.clientX - element.x);
        const eixoY = (e.clientY - element.y) <= minY
          ? minY
          : (e.clientY - element.y) >= maxY
          ? maxY
          : (e.clientY - element.y);

        zoom.current.style.transform = `scale(2, 2) translate3d(${
          eixoX * -1
        }px, ${eixoY * -1}px, 0)`;
      }
    }
    if (zoom.current) {
      const element: DOMRect = zoom.current.getBoundingClientRect();
      if (activeZoom.value) {
        zoom.current.addEventListener("mousemove", (e) => {
          Zoom(e, element);
        });
        zoom.current.addEventListener("mouseout", (e) => {
          if (zoom.current) {
            zoom.current.style.transform =
              `scale(1, 1) translate3d(0px, 0px, 0)`;
          }
        });
      } else {
        zoom.current.addEventListener("mousemove", (e) => {
          Zoom(e, element);
          if (zoom.current) {
            zoom.current.style.transform =
              `scale(1, 1) translate3d(0px, 0px, 0)`;
          }
        });
      }
    }
  });

  return (
    <div
      ref={zoom}
      onClick={() => activeZoom.value = !activeZoom.value}
      class={`w-full origin-[0px_0px] ${
        activeZoom.value ? "cursor-zoom-out" : "cursor-zoom-in"
      }`}
    >
      {children}
    </div>
  );
}
