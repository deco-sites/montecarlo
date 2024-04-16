import { Picture, Source } from "apps/website/components/Picture.tsx";

interface Props {
  preload?: boolean;
  mobile: string;
  desktop: string;
  alt?: string;
}

export default function Banner({ ...props }: Props) {
  return (
    <Picture preload={props.preload} class="w-full h-full">
      <Source
        media="(max-width: 1023px)"
        fetchPriority={props.preload ? "high" : "auto"}
        src={props.mobile}
        width={430}
        height={590}
      />
      <Source
        media="(min-width: 1024px)"
        fetchPriority={props.preload ? "high" : "auto"}
        src={props.desktop}
        width={1440}
        height={600}
      />
      <img
        class="object-cover w-full h-full"
        loading={props.preload ? "eager" : "lazy"}
        src={props.desktop}
        alt={props.alt}
      />
    </Picture>
  );
}
