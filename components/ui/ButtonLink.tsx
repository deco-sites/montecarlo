export interface Props {
  label?: string;
  href?: string;
}

export default function ButtonLink(
  { label, href, classCustom }: {
    label: string;
    href: string;
    classCustom: string;
  },
) {
  return (
    <a
      class={`w-fit py-[10px] px-[14px] bg-primary hover hover:opacity-80 text-black ${classCustom}`}
      href={href}
    >
      {label}
    </a>
  );
}
