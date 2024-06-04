import Header from "../../components/ui/SectionHeader.tsx";
import Slider from "../../components/ui/Slider.tsx";
import SliderJS from "../../islands/SliderJS.tsx";
import { useId } from "../../sdk/useId.ts";
import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import {
  SendEventOnClick,
  SendEventOnView,
} from "../../components/Analytics.tsx";
import Title from "deco-sites/montecarlo/components/product/Shelf/Title.tsx";
import SubTitle from "deco-sites/montecarlo/components/product/Shelf/SubTitle.tsx";

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

function CategoryList(props: Props) {
  const id = useId();
  const {
    header = {
      title: "",
      description: "",
    },
    list = DEFAULT_LIST,
  } = props;

  return (
    <div
      id={id}
      class="lg:container xl:max-w-[1512px] flex flex-col justify-center items-center gap-5 lg:gap-10 text-base-content py-7 lg:py-10 px-1 md:px-10 lg:px-14 text-center"
    >
      <div class="flex flex-col w-full gap-1">
        <Title text={header.title} />
        <SubTitle text={header.description} />
      </div>

      <div class="flex flex-row flex-wrap gap-3 md:gap-2 justify-center items-center w-full">
        {list.map((category, index) => (
          <a
            href={category.href}
            class="flex flex-col gap-1 md:gap-2 max-w-[228px] w-[calc(50%-0.5rem)] lg:w-[calc(16.66%-0.5rem)] group"
            id={id + index}
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
            <SendEventOnView
              id={id + index}
              event={{
                name: "view_promotion",
                params: {
                  view_promotion: category.alt,
                  creative_name: category.alt,
                  creative_slot: category.alt,
                  promotion_id: id + index,
                  promotion_name: category.alt,
                  items: [],
                },
              }}
            />
            <SendEventOnClick
              id={id + index}
              event={{
                name: "select_promotion",
                params: {
                  creative_name: category.alt,
                  creative_slot: id + index,
                  promotion_id: category.href,
                  promotion_name: category.alt,
                  items: [],
                },
              }}
            />
          </a>
        ))}
      </div>
    </div>
  );
}

export default CategoryList;
