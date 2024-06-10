import { HTMLWidget } from "apps/admin/widgets.ts";

import { Signal, useSignal } from "@preact/signals";

import {
  SendEventOnClick,
  SendEventOnView,
} from "../../components/Analytics.tsx";
import { useId } from "../../sdk/useId.ts";

export interface Props {
  content?: {
    title?: string;
    description?: HTMLWidget;
  };
}

export default function Content(props: Props) {
  const collapsed = useSignal(false);

  const { content } = props;

  const id = useId();

  return (
    <div
      class="container flex flex-col mx-auto max-w-[753px] py-12 px-5 pt-2 gap-2"
      id={id}
    >
      {content?.title
        ? <h6 class="font-poppins text-xl text-black mb-2">{content.title}</h6>
        : null}
      {content?.description
        ? (
          <p
            class={`font-poppins text-base text-black ${
              collapsed.value === false ? "line-clamp-2" : ""
            }`}
            dangerouslySetInnerHTML={{ __html: content.description }}
          />
        )
        : null}

      <button
        onClick={() => {
          collapsed.value = true;
        }}
        class={`btn cursor-pointer font-poppins text-sm bg-[#FFC72C] font-normal rounded-none hover:bg-[#FFC72C] w-fit mt-2 self-center ${
          collapsed.value === true ? "hidden" : ""
        }`}
        id={id + "_button"}
      >
        <SendEventOnClick
          id={id + "_button"}
          event={{
            name: "select_promotion",
            params: {
              promotion_name: "Continue lendo",
            },
          }}
        />
        Continue lendo
      </button>
      <SendEventOnView
        id={id}
        event={{
          name: "view_promotion",
          params: {
            creative_name: content?.title ? content.title : "",
          },
        }}
      />
    </div>
  );
}
