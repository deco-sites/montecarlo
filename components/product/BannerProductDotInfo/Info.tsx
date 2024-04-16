import Image from "apps/website/components/Image.tsx";

import { invoke } from "../../../runtime.ts";
import { useCallback } from "preact/hooks";

// import type { ProductData } from "../../../loaders/ProductDotInfo.ts";

interface Props {
  coordinates: string[];
  productData?: {
    id?: number;
    image?: string;
    productName?: string;
    listPrice?: string;
    price?: string;
  };
}

export default function Info({ coordinates, productData }: Props) {

  if (productData?.id) {
    const fetchData = useCallback(async () => {
      const data = await invoke["deco-sites/montecarlo"].loaders.ProductDotInfo({id: productData.id,})

      console.log({ info: productData, data });
    }, [])
    fetchData();
  }

  const testData = async () => {
    try {
      const response = await fetch(
        `https://montecarlo.vtexcommercestable.com.br/api/catalog_system/pub/products/offers/40710`,
      );
      const data = await response.json();
  
      // console.log({ data });
    } catch (err) {
      console.error(err);
    }
  }

  testData();

  // console.log({info: productData});

  function handleInfo(event: MouseEvent) {
    console.log({ product: productData });
  }

  const x = Number(coordinates[0]) > 50
    ? "right-[-7px]"
    : "left-[calc(-100%+7px)]";
  const y = Number(coordinates[1]) > 50
    ? "bottom-[calc(-100%-7px)]"
    : "top-[7px]";

  return (
    <div
      onClick={handleInfo}
      class={`flex ${x} ${y} absolute invisible bg-white group-hover:visible group-data-[active=true]:visible opacity-0 group-hover:opacity-100 group-data-[active=true]:opacity-100 group-hover:z-10 group-data-[active=true]:z-10 transition-opacity w-max items-center cursor-pointer`}
    >
      {productData && productData?.image && (
        <div class="h-full">
          <Image
            class="w-28 h-auto max-w-[20vw] object-cover"
            src={productData.image}
            width={112}
            height={112}
          />
        </div>
      )}

      {productData && productData?.productName && (
        <div class="flex flex-col justify-center p-1 md:p-4 gap-1 font-poppins text-[11px] md:text-sm text-black max-w-[30vw] md:max-w-48 max-h-28">
          <span class="line-clamp-2">
            {productData.productName}
          </span>
          <div class="flex flex-col text-xs md:text-sm">
            <span class="text-perola+ font-light line-through">
              {productData.listPrice}
            </span>
            <span class="font-semibold">
              {productData.price}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
