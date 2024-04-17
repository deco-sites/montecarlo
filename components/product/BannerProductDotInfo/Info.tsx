import Image from "apps/website/components/Image.tsx";
import { useEffect, useState } from "preact/hooks";

interface ProductData {
  id?: number;
  image?: string;
  productName?: string;
  listPrice?: string;
  price?: string;
}

interface Props {
  coordinates: string[];
  product?: ProductData;
}

export default function Info({ coordinates, product }: Props) {
  function fetchData() {
    const formatNumber = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    });

    return fetch(`/api/catalog_system/pub/products/offers/${product?.id}`)
      .then((response) => response.json())
      .then((data) => ({
        id: data[0]?.ProductId,
        image: `https://montecarlo.vteximg.com.br/arquivos/ids/${
          data[0]?.MainImage.ImageId
        }`,
        productName: data[0]?.Name,
        listPrice: formatNumber.format(
          data[0]?.Offers[0]?.OffersPerSalesChannel[0]?.ListPrice,
        ),
        price: formatNumber.format(
          data[0]?.Offers[0]?.OffersPerSalesChannel[0]?.Price,
        ),
      }))
      .catch((error) => {
        console.error("Erro ao fazer o fetch dos dados:", error);
        return {
          id: productData?.id,
          image: `https://placehold.co/112x112`,
          productName:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit",
        };
      });
  }

  const [productData, setProductData] = useState<ProductData | null>(null);

  useEffect(() => {
    product?.id
      ? fetchData().then((data) => setProductData(data))
      : setProductData(product ? product : null);
  }, []);

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
