import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

interface Benefit {
  label?: string;
  icon: ImageWidget;
  iconAlt?: string;
  description?: string;
}

export interface Props {
  title?: string;
  benefits?: Benefit[];
}

function Benefit({ props }: { props: Benefit }) {
  return (
    <div class="flex flex-row h-full w-full gap-3 ">
      <div class="
            relative flex justify-center items-center h-16 w-16 p-5
            before:absolute before:w-12 before:h-12 before:border-2 before:border-black before:rotate-45
          ">
        <Image
          height={20}
          width={20}
          src={props.icon}
          alt={props.iconAlt}
          decoding="async"
          loading="lazy"
          fetchPriority="low"
          class="w-auto object-contain max-w-5"
        />
      </div>
      <div class="flex flex-col gap-1 text-start font-poppins justify-center">
        <p class="text-xs lg:text-sm font-medium">{props.label}</p>
        <p class="text-xs lg:text-sm font-light">{props.description}</p>
      </div>
    </div>
  );
}

export default function BenefitsList({ title, benefits }: Props) {
  return (
    <div class="w-full flex-col gap-3 flex mt-7 ">
      <span class=" uppercase text-xs">
        {title}
      </span>
      <div class="flex flex-col gap-3">
        {benefits?.map((benefit) => <Benefit props={benefit} />)}
      </div>
    </div>
  );
}
