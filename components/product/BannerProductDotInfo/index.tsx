import { ImageWidget } from "apps/admin/widgets.ts";
import { useState } from "preact/hooks";

import Banner from "./Banner.tsx";
import ButtonDotsControl from "./ButtonDotsControl.tsx";
import Dot from "./Dot.tsx";
import Info from "./Info.tsx";

interface Product {
  /** @description Defina a ID do Produto */
  id: number;
  /** @description Defina as coordenadas seguindo o formato x:y (horizontal:vertical). Exemplo: 10:20 */
  coordinates: {
    mobile: string;
    desktop: string;
  };
}

export interface Props {
  preload?: boolean;
  mobile: ImageWidget;
  desktop: ImageWidget;
  alt?: string;
  products?: Product[];
}

function BannerProductDotInfo(props: Props) {
  const [dotsActive, setDotsActive] = useState(false);

  function handleDot(event: MouseEvent) {
    const dot = event.currentTarget as HTMLElement;
    dot.setAttribute(
      "data-active",
      dot.getAttribute("data-active") === "false" ? "true" : "false",
    );
  }

  function DotInfo(
    { id, coords }: { id: number; coords: { mobile: string; desktop: string } },
  ) {
    const posMobile = coords.mobile.split(":");
    const posDesktop = coords.desktop.split(":");

    return (
      <div
        class={`${
          dotsActive ? "visible opacity-100" : "invisible opacity-0"
        } transition-opacity`}
      >
        <div
          class="lg:hidden group absolute"
          style={{ top: `${posMobile[1]}%`, left: `${posMobile[0]}%` }}
          onClick={handleDot}
          data-active="false"
        >
          <Info coords={posMobile} />
          <Dot />
        </div>

        <div
          class="hidden lg:block group absolute"
          style={{ top: `${posDesktop[1]}%`, left: `${posDesktop[0]}%` }}
          onClick={handleDot}
          data-active="false"
        >
          <Info coords={posDesktop} />
          <Dot />
        </div>
      </div>
    );
  }

  return (
    <div class="relative max-w-[100vw] w-full h-full">
      <Banner
        preload={props.preload}
        mobile={props.mobile}
        desktop={props.desktop}
        alt={props.alt}
      />

      <div class="absolute w-full h-full top-0 left-0 max-w-[100vw] transition-opacity">
        {props.products?.map((product, index) => (
          <DotInfo
            key={index}
            id={product.id}
            coords={product.coordinates}
          />
        ))}

        {props.products && props.products.length > 0 &&
          (
            <ButtonDotsControl
              dotsActive={dotsActive}
              setDotsActive={setDotsActive}
            />
          )}
      </div>
    </div>
  );
}

export default BannerProductDotInfo;
