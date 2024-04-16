import { useState } from "preact/hooks";

import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { Picture, Source } from "apps/website/components/Picture.tsx";

import type { ProductData } from "../../../loaders/ProductDotInfo.ts";

// import Banner from "./Banner.tsx";
// import ButtonDotsControl from "./ButtonDotsControl.tsx";
// import Dot from "./Dot.tsx";
import Info from "../../../islands/DotInfo.tsx";

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

  function Banner({ ...props }: { preload?: boolean, mobile: string, desktop: string, alt?: string}) {
    return (
      <Picture preload={props.preload} class="w-full h-full">
        <Source
          media="(max-width: 1023px)"
          fetchPriority={props.preload ? "high" : "auto"}
          src={props.mobile}
          width={430}
          height={590}
        />
        <Source
          media="(min-width: 1024px)"
          fetchPriority={props.preload ? "high" : "auto"}
          src={props.desktop}
          width={1440}
          height={600}
        />
        <img
          class="object-cover w-full h-full"
          loading={props.preload ? "eager" : "lazy"}
          src={props.desktop}
          alt={props.alt}
        />
      </Picture>
    );
  }

  function handleDot(event: MouseEvent) {
    const dot = event.currentTarget as HTMLElement;
    dot.setAttribute(
      "data-active",
      dot.getAttribute("data-active") === "false" ? "true" : "false",
    );
  }

//  function Info({ coordinates, productData }: {coordinates: string[], productData?: ProductData[]}) {
//     function handleInfo(event: MouseEvent) {
//       console.log({ product: productData });
//     }
  
//     const x = Number(coordinates[0]) > 50
//       ? "right-[-7px]"
//       : "left-[calc(-100%+7px)]";
//     const y = Number(coordinates[1]) > 50
//       ? "bottom-[calc(-100%-7px)]"
//       : "top-[7px]";
  
//     return (
//       <div
//         onClick={handleInfo}
//         class={`flex ${x} ${y} absolute invisible bg-white group-hover:visible group-data-[active=true]:visible opacity-0 group-hover:opacity-100 group-data-[active=true]:opacity-100 group-hover:z-10 group-data-[active=true]:z-10 transition-opacity w-max items-center cursor-pointer`}
//       >
//         {productData && productData[0]?.image && (
//           <div class="h-full">
//             <Image
//               class="w-28 h-auto max-w-[20vw] object-cover"
//               src={productData[0].image}
//               width={112}
//               height={112}
//             />
//           </div>
//         )}
  
//         {productData && productData[0]?.productName && (
//           <div class="flex flex-col justify-center p-1 md:p-4 gap-1 font-poppins text-[11px] md:text-sm text-black max-w-[30vw] md:max-w-48 max-h-28">
//             <span class="line-clamp-2">
//               {productData[0].productName}
//             </span>
//             <div class="flex flex-col text-xs md:text-sm">
//               <span class="text-perola+ font-light line-through">
//                 {productData[0].oldPrice}
//               </span>
//               <span class="font-semibold">
//                 {productData[0].price}
//               </span>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   }

  function Dot() {
    return (
      <div class="absolute bg-white h-[14px] w-[14px] group-hover:bg-yellow-500 group-data-[active=true]:bg-yellow-500 group-hover:rotate-45 group-data-[active=true]:rotate-45 transition-transform cursor-pointer group-hover:z-10 group-data-[active=true]:z-10" />
    );
  }

  function ButtonDotsControl(
    { dotsActive, setDotsActive }: {  dotsActive: boolean, setDotsActive: (value: boolean) => void},
  ) {
    function handleDotsControl() {
      if (dotsActive) setDotsActive(false);
      else setDotsActive(true);
    }
  
    return (
      <button
        onClick={handleDotsControl}
        class={`${
          dotsActive && "rotate-45"
        } absolute flex justify-center items-center bottom-5 lg:bottom-8 left-5 lg:left-8 bg-[#FFC72C] p-2 w-10 h-10 transition-transform`}
      >
        <svg
          class={`${dotsActive && "hidden"}`}
          width="15"
          height="18"
          viewBox="0 0 15 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.1934 4.5C11.1934 2.01871 9.39895 0 7.19336 0C4.98773 0 3.19336 2.01871 3.19336 4.5H0.193359V15.1875C0.193359 16.7408 1.31264 18 2.69336 18H11.6934C13.0741 18 14.1934 16.7408 14.1934 15.1875V4.5H11.1934ZM7.19336 1.125C8.84758 1.125 10.1934 2.639 10.1934 4.5H4.19336C4.19336 2.639 5.53914 1.125 7.19336 1.125ZM13.1934 15.1875C13.1934 16.118 12.5205 16.875 11.6934 16.875H2.69336C1.86627 16.875 1.19336 16.118 1.19336 15.1875V5.625H3.19336V7.3125C3.19336 7.62318 3.41723 7.875 3.69336 7.875C3.96948 7.875 4.19336 7.62318 4.19336 7.3125V5.625H10.1934V7.3125C10.1934 7.62318 10.4172 7.875 10.6934 7.875C10.9695 7.875 11.1934 7.62318 11.1934 7.3125V5.625H13.1934V15.1875Z"
            fill="black"
          />
        </svg>
  
        <svg
          class={`${!dotsActive && "hidden"} rotate-45`}
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.19539 7.70091L12.8922 13.3979C13.0289 13.5346 13.2501 13.5346 13.3868 13.3979L13.5928 13.1919C13.7295 13.0552 13.7295 12.8341 13.5928 12.6974L7.89565 7.00036L13.5928 1.30334C13.7295 1.16667 13.7295 0.945198 13.5928 0.80882L13.3868 0.602794C13.2501 0.466124 13.0289 0.466124 12.8922 0.602794L7.19539 6.29953L1.49852 0.602503C1.36185 0.465832 1.14067 0.465832 1.00399 0.602503L0.797964 0.808528C0.66129 0.945198 0.66129 1.16638 0.797964 1.30305L6.49512 7.00007L0.797964 12.6971C0.66129 12.8338 0.66129 13.0549 0.797964 13.1916L1.00399 13.3976C1.14067 13.5343 1.36185 13.5343 1.49852 13.3976L7.19539 7.70091Z"
            fill="black"
          />
        </svg>
      </button>
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
        {props.tags?.products?.map((product, index) => {
          console.log({ product });
          return (
            <DotInfo
              key={index}
              config={product.config}
              productData={product.productData}
            />
          )
        })}

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
