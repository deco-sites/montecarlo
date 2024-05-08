import {
  SendEventOnClick,
  SendEventOnView,
} from "../../components/Analytics.tsx";
export interface Props {
  label?: string;
  href?: string;
}

export default function ButtonLink(
  {
    label,
    href,
    classCustom,
    creative_name,
    creative_slot,
    promotion_id,
    promotion_name,
    id,
  }: {
    label: string;
    href: string;
    classCustom: string;
    creative_name?: string;
    creative_slot?: string;
    promotion_id?: string;
    promotion_name?: string;
    id?: string;
  },
) {
  return (
    <a
      class={`w-fit py-[10px] px-[14px] bg-primary hover hover:opacity-80 text-black ${classCustom}`}
      href={href}
    >
      {id && (
        <SendEventOnClick
          id={id}
          event={{
            name: "select_promotion",
            params: {
              creative_name: creative_name,
              creative_slot: creative_slot,
              promotion_id: promotion_id,
              promotion_name: promotion_name,
            },
          }}
        />
      )}
      {label}
    </a>
  );
}
