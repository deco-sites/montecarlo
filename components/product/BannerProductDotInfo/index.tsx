import { useState } from "preact/hooks";

import { ImageWidget } from "apps/admin/widgets.ts";

import type { ProductData } from "../../../loaders/ProductDotInfo.ts";

import Banner from "./Banner.tsx";
import ButtonDotsControl from "./ButtonDotsControl.tsx";
import Dot from "./Dot.tsx";
import Info from "./Info.tsx";

interface Tag {
  /** @title Tags Always Visible */
  alwaysActive?: boolean;
  products?: ProductProps[];
}

interface Config {
  /** @description Defina as coordenadas para a Tag seguindo o formato x:y (horizontal:vertical). Exemplo: 10:20 */
  coordinates: string;
}

interface ProductProps {
  /** @description Defina a ID do Produto */
  productData?: ProductData[];
  /** @description Configurações de exibição da Tag */
  config: {
    mobile: Config;
    desktop: Config;
  };
}

export interface Props {
  preload?: boolean;
  mobile: ImageWidget;
  desktop: ImageWidget;
  alt?: string;
  /** @description Adicione Tags para identificar produtos na imagem */
  tags?: Tag;
}

function BannerProductDotInfo(props: Props) {
  const [dotsActive, setDotsActive] = useState(
    props.tags?.alwaysActive || false,
  );

  console.log({BannerProductDotInfo: props})

  function handleDot(event: MouseEvent) {
    const dot = event.currentTarget as HTMLElement;
    dot.setAttribute(
      "data-active",
      dot.getAttribute("data-active") === "false" ? "true" : "false",
    );
  }

  function DotInfo({ config, productData }: ProductProps) {
    const position = {
      mobile: config.mobile.coordinates.split(":"),
      desktop: config.desktop.coordinates.split(":"),
    };

    return (
      <div
        class={`${
          dotsActive ? "visible opacity-100" : "invisible opacity-0"
        } transition-opacity`}
      >
        <div
          class={`lg:hidden group absolute`}
          style={{
            top: `${position.mobile[1]}%`,
            left: `${position.mobile[0]}%`,
          }}
          onClick={handleDot}
          data-active="false"
        >
          <Info
            coordinates={position.mobile}
            productData={productData}
          />
          <Dot />
        </div>

        <div
          class={`hidden group absolute lg:block`}
          style={{
            top: `${position.desktop[1]}%`,
            left: `${position.desktop[0]}%`,
          }}
          onClick={handleDot}
          data-active="false"
        >
          <Info
            coordinates={position.desktop}
            productData={productData}
          />
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
        {props.tags?.products?.map((product, index) => (
          <DotInfo
            key={index}
            config={product.config}
            productData={product.productData}
          />
        ))}

        {!props.tags?.alwaysActive && props.tags?.products &&
          props.tags.products.length > 0 &&
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
