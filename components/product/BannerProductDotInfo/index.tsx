import { useState } from "preact/hooks";

import { ImageWidget } from "apps/admin/widgets.ts";

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
  coordinates?: string;
}

interface ProductData {
  /** @description Defina a id do produto. Obs: Ao preencher este campo não é necessário preencher os outros campos do produto. */
  id?: number;
  /**
   * @title Imagem
   * @description Url da imagem do produto */
  image?: string;
  /** @title Nome do produto */
  productName?: string;
  /** @title De R$ */
  listPrice?: string;
  /** @title Por R$ */
  price?: string;
}

interface ProductProps {
  /** @description Defina as informações do Produto */
  productData?: ProductData;
  /** @description Configurações de exibição da Tag */
  config: {
    mobile?: Config;
    desktop?: Config;
  };
}

interface ConfigProps {
  /** @hide */
  maxWidth?: string;
}

interface ImageProps {
  source: ImageWidget;
  hoverImage?: ImageWidget;
  alt?: string;
}

export interface Props {
  title?: string;
  description?: string;
  href?: string;
  preload?: boolean;
  image: ImageProps;
  /** @description Adicione Tags para identificar produtos na imagem */
  tags?: Tag;
  config?: ConfigProps;
}

function BannerProductDotInfo(props: Props) {
  const { config, title, description, href } = props;

  const [dotsActive, setDotsActive] = useState(
    props.tags?.alwaysActive || false,
  );

  function handleDot(event: MouseEvent) {
    const dot = event.currentTarget as HTMLElement;
    dot.setAttribute(
      "data-active",
      dot.getAttribute("data-active") === "false" ? "true" : "false",
    );
  }

  function DotInfo({ config, productData }: ProductProps) {
    const position = {
      mobile: config?.mobile?.coordinates?.split(":"),
      desktop: config?.desktop?.coordinates?.split(":"),
    };

    return (
      <div
        class={`${
          dotsActive ? "visible opacity-100" : "invisible opacity-0"
        } transition-opacity`}
      >
        {position?.mobile && (
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
              product={productData}
            />
            <Dot />
          </div>
        )}

        {position?.desktop && (
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
              product={productData}
            />
            <Dot />
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      class={`relative lg:max-w-[${
        config?.maxWidth ? config.maxWidth : "80vh"
      }] w-full h-full`}
    >
      <Banner
        preload={props.preload}
        image={props.image.source}
        hoverImage={props.image.hoverImage}
        alt={props.image.alt}
        href={href}
      />

      {!props.tags?.alwaysActive && !dotsActive && title && (
        <div class="absolute bottom-0 left-0 w-full h-fit flex flex-col justify-end items-center text-center py-5 lg:py-10 gap-2 lg:gap-6 max-w-3/4 bg-gradient-to-t from-[rgba(0,0,0,0.65)] to-transparent">
          <h3
            class={`font-beausiteGrand text-[35px] text-[#FFC72C] max-w-[306px] text-4xl ${
              description ? "lg:text-7.5xl" : "lg:text-6xl"
            }`}
          >
            {title}
          </h3>
          {description && (
            <p class="font-poppins text-base text-perola-claro max-w-[306px] lg:text-lg">
              {description}
            </p>
          )}
        </div>
      )}

      {props.tags?.products && props.tags?.products.length > 0 && (
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
                hasTitle={props.title ? true : false}
                dotsActive={dotsActive}
                setDotsActive={setDotsActive}
              />
            )}
        </div>
      )}
    </div>
  );
}

export default BannerProductDotInfo;
