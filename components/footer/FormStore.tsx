import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import type { Data } from "../../loaders/SearchStore.tsx";
import Form from "../../islands/FormStore/Form.tsx";
export interface Props {
  icon?: ImageWidget;
  title?: string;
  placeholderState?: string;
  placeholderCity?: string;
  button?: string;
  searchStore?: Data;
}

export function LoadingFallback() {
  return <h1>Carregando</h1>;
}

export default function FormStore({ formState }: { formState?: Props }) {
  console.log("data", formState?.searchStore?.data);

  return (
    <form class="w-full flex-col flex items-center lg:items-start font-semibold text-sm">
      {formState?.icon && (
        <Image
          width={25}
          height={28}
          alt={"Localização"}
          src={formState.icon}
          loading="lazy"
          class="flex lg:hidden object-contain mb-2"
        />
      )}
      <h4 class="mb-6">
        {formState?.title}
      </h4>
      {formState && (
        <Form
          placeholderCity={formState?.placeholderCity}
          placeholderState={formState?.placeholderState}
          button={formState?.button}
          searchStore={formState?.searchStore?.data}
        />
      )}
    </form>
  );
}
