import { useEffect, useState } from "preact/hooks";

import Image from "apps/website/components/Image.tsx";

interface ProductData {
  image?: string;
  productName?: string;
  oldPrice?: string;
  price?: string;
}

interface Props {
  alignment: "Left" | "Center" | "Right";
  coordinates: string[];
  id?: number;
}

export default function Info({ alignment, coordinates, id }: Props) {
  const [productID, setProductID] = useState(id);
  const [productData, setProductData] = useState<ProductData>();

  useEffect(() => {
    async function fetchProductData() {
      try {
        const response = await fetch(
          `https://montecarlo.vtexcommercestable.com.br/api/catalog_system/pub/products/offers/${productID}`,
        );
        const data = await response.json();

        const formatNumber = new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
          minimumFractionDigits: 2,
        });

        setProductData({
          image: data[0].MainImage.ImageId,
          productName: data[0].Name,
          oldPrice: formatNumber.format(
            data[0].Offers[0].OffersPerSalesChannel[0].PriceWithoutDiscount,
          ),
          price: formatNumber.format(
            data[0].Offers[0].OffersPerSalesChannel[0].ListPrice,
          ),
        });
      } catch (err) {
        console.error(err);
      }
    }

    fetchProductData();
  }, [productID]);

  function handleInfo(event: MouseEvent) {
    console.log({ product: { id } });
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
      <div class="h-full">
        <Image
          class="w-28 h-auto max-w-[20vw] object-cover"
          src={productData?.image
            ? `https://montecarlo.vteximg.com.br/arquivos/ids/${productData.image}`
            : "https://placehold.co/112x112"}
          width={112}
          height={112}
        />
      </div>

      <div class="flex flex-col justify-center p-1 md:p-4 gap-1 font-poppins text-[11px] md:text-sm text-black max-w-[30vw] md:max-w-48 max-h-28">
        <span class="line-clamp-2">
          {productData?.productName
            ? productData.productName
            : "Lorem ipsum dolor sit amet"}
        </span>
        <div class="flex flex-col text-xs md:text-sm">
          <span class="text-perola+ font-light line-through">
            {productData?.oldPrice ? productData.oldPrice : "R$ 9.999,00"}
          </span>
          <span class="font-semibold">
            {productData?.price ? productData.price : "R$ 9.999,00"}
          </span>
        </div>
      </div>
    </div>
  );
}
