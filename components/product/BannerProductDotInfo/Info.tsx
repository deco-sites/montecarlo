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
  data?: ProductData;
}

export default function Info({ alignment, coordinates, id, data }: Props) {
  function handleInfo(event: MouseEvent) {
    console.log({ product: { id, data } });
  }
  // const x =
  //     alignment === "Left" && "left-[calc(-100%+7px)]" ||
  //     alignment === "Right" && "right-[-7px]" ||
  //     alignment === "Center" && ""

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
          src={data?.image ? data.image : "https://placehold.co/112x112"}
          width={112}
          height={112}
        />
      </div>

      <div class="flex flex-col justify-center p-1 md:p-4 gap-1 font-poppins text-[11px] md:text-sm text-black max-w-[30vw] md:max-w-48 max-h-28">
        {data?.productName && (
          <span class="line-clamp-2">{data.productName}</span>
        )}
        <div class="flex flex-col text-xs md:text-sm">
          {data?.oldPrice && (
            <span class="text-perola+ font-light line-through">
              {data.oldPrice}
            </span>
          )}
          {data?.price && <span class="font-semibold">{data.price}</span>}
        </div>
      </div>
    </div>
  );
}
