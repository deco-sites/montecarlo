import { HTMLWidget } from "apps/admin/widgets.ts";

import { useSignal, Signal } from "@preact/signals";

export interface Props {
    content?: {
        title?: string,
        description?: HTMLWidget,
    }
}


export default function Content(props : Props) {
    const collapsed = useSignal(false);

    const {content} = props;

    return (
        <div class="container flex flex-col mx-auto max-w-[753px] py-12 px-5 pt-2 gap-2">
            {content?.title ? <h6 class="font-poppins text-xl text-black mb-2">{content.title}</h6> : null}
            {
              content?.description ? 
                <p class={`font-poppins text-base text-black ${collapsed.value === false ? "line-clamp-2" : ""}`} dangerouslySetInnerHTML={{ __html: content.description }}/> : null
            }

            <button 
              onClick={() => {
                collapsed.value = true;
              }}
              class={`btn cursor-pointer font-poppins text-sm bg-[#FFC72C] font-normal rounded-none hover:bg-[#FFC72C] w-fit mt-2 self-center ${collapsed.value === true ? "hidden" : ""}`}>
              Continue lendo
            </button>
          </div>
    );
}