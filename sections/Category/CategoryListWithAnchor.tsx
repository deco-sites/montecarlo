import Header from "../../components/ui/SectionHeader.tsx";
import Slider from "../../components/ui/Slider.tsx";
import SliderJS from "../../islands/SliderJS.tsx";
import { useId } from "../../sdk/useId.ts";
import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { usePartialSection } from "deco/hooks/usePartialSection.ts";

export interface Category {
  label: string;
  description?: string;
  href?: string;
  image: ImageWidget;
  alt?: string;
}

export interface Props {
  header?: {
    title?: string;
    description?: string;
  };
  list?: Category[];
  idSelectedToShowProducts?: string;
}

const DEFAULT_LIST = [
  {
    href: "/aneis",
    image:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4616/6173365f-ddb6-463d-a995-cd92a748fd6d",
    label: "Anéis",
    description: "Anéis",
    alt: " ",
  },
  {
    href: "/acessorios",
    image:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4616/143a0a9c-366a-431f-bbff-48c510ced483",
    label: "Acessórios",
    description: "Acessórios",
    alt: " ",
  },
  {
    href: "/relogios",
    image:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4616/3a5552fe-7eae-4e3d-92b4-6e1cbe0c6666",
    label: "Relógios",
    description: "Relógios",
    alt: " ",
  },
  {
    href: "/aliancas",
    image:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4616/82b76e53-e1a3-4d5a-bfc2-07684bb2bcd4",
    label: "Alianças",
    description: "Alianças",
    alt: " ",
  },
  {
    href: "/pulseiras",
    image:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4616/8c7a8467-bf85-493d-88ed-258d9074bb19",
    label: "Pulseiras",
    description: "Pulseiras",
    alt: " ",
  },
  {
    href: "/colares",
    image:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4616/749057b2-4d42-4806-871c-0787c52399f1",
    label: "Colares",
    description: "Colares",
    alt: " ",
  },
];

function CategoryListWithAnchor(props: Props) {
  const id = useId();

  const {
    header = {
      title: "",
      description: "",
    },
    list = DEFAULT_LIST,
    idSelectedToShowProducts
  } = props;

  return (
    <div
      id={id}
      class=" py-7 lg:py- flex flex-col justify-center items-center gap-5 lg:gap-10 text-base-content lg:py-10 text-center px-1"
    >
      <div class="flex flex-col w-full gap-1">
        <h2 class=" font-semibold text-xl lg:text-3xl">{header.title}</h2>
        <p class=" font-medium  text-sm lg:text-base">{header.description}</p>
      </div>

      <div class="flex flex-row flex-wrap gap-2 justify-center items-center w-full">
        {list.map((category) => (
          <button
            class="flex flex-col gap-2 max-w-[228px] w-[calc(50%-0.5rem)] lg:w-[calc(16.66%-0.5rem)] group"
            {...usePartialSection({
              props: { idSelectedToShowProducts: category.label }
            })}
          >
            <Image
              loading={"lazy"}
              fetchPriority="low"
              decoding="sync"
              sizes="(max-width: 640px) 100vw, 20vw"
              src={category.image}
              width={163}
              height={163}
              alt={category.alt}
              class="max-w-[228px] w-full group-hover:opacity-75 duration-300"
            >
            </Image>
            <h3 class="text-sm font-medium">{category.label}</h3>
            <p>{idSelectedToShowProducts}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryListWithAnchor;
