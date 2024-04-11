import Image from "apps/website/components/Image.tsx";

export default function Info({ coords }: { coords: string[] }) {
  const x = Number(coords[0]) > 50 ? "right-[-7px]" : "left-[calc(-100%+7px)]";
  const y = Number(coords[1]) > 50 ? "bottom-[calc(-100%-7px)]" : "top-[7px]";
  return (
    <div
      class={`flex ${x} ${y} absolute invisible bg-white group-hover:visible group-data-[active=true]:visible opacity-0 group-hover:opacity-100 group-data-[active=true]:opacity-100 group-hover:z-10 group-data-[active=true]:z-10 transition-opacity w-max`}
    >
      <div class="h-full">
        <Image
          class="w-28 h-auto max-w-[20vw] object-cover"
          src="https://placehold.co/112x112"
          width={112}
          height={112}
        />
      </div>

      <div class="flex flex-col justify-center p-1 md:p-4 gap-1 font-poppins text-[10px] md:text-sm text-black max-w-[30vw] md:max-w-48 max-h-28">
        <span class="line-clamp-2">Anel com Diamante em Ouro Amarelo 18k</span>
        <div class="flex flex-col">
          <span class="text-perola+ font-light line-through">R$ 3.290,00</span>
          <span class="font-semibold">R$ 6.390,00</span>
        </div>
      </div>
    </div>
  );
}
