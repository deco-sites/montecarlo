import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

/**
 * @titleBy label
 */
interface Benefit {
  label?: string;
  /**
   * @description size Image 20x20
   */
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
            before:absolute before:w-12 before:h-12 before:border before:border-black before:rotate-45
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
    <div class="w-full flex-col gap-3 flex mt-7 bg-[#e8e6df] md:bg-white px-4 py-8 ">
      <span class=" uppercase text-sm">
        {title}
      </span>
      <div class="flex flex-col gap-3">
        {benefits?.map((benefit) => <Benefit props={benefit} />)}
      </div>
    </div>
  );
}
