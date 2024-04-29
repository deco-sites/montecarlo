import {
  SendEventOnClick,
  SendEventOnView,
} from "../../components/Analytics.tsx";
import { useId } from "../../sdk/useId.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import ButtonLink from "./ButtonLink.tsx";

/**
 * @titleBy title
 */
interface Image {
  title: string;
  mobile: ImageWidget;
  desktop: ImageWidget;
  alt?: string;
  button: string;
  href: string;
  contentTitle: string;
  /**
   * @title content
   * @format html
   */
  content?: string;
}

export interface Props {
  primaryImage: Image;
  secondImage: Image;
}

export function SectionImage(
  { props, customClass, wrapperCustomClass, infoSectionCustomClass, id, index }:
    {
      props: Image;
      customClass?: string;
      wrapperCustomClass?: string;
      infoSectionCustomClass?: string;
      id?: string;
      index?: string;
    },
) {
  const { mobile, desktop, alt, content, contentTitle, button, title, href } =
    props;

  if (!customClass) customClass = "";
  if (!wrapperCustomClass) wrapperCustomClass = "";
  if (!infoSectionCustomClass) infoSectionCustomClass = "";

  return (
    <div
      class={`relative flex flex-col group w-full lg:w-2/4 ${wrapperCustomClass}`}
    >
      <SendEventOnView
        id={id ? id : ""}
        event={{
          name: "view_promotion",
          params: {
            creative_name: title,
            creative_slot: index,
            promotion_id: href,
            promotion_name: alt,
          },
        }}
      />
      <Picture class={customClass}>
        <Source
          src={mobile}
          width={350}
          height={350}
          fetchPriority="low"
          loading={"lazy"}
          media="(max-width: 1023px)"
        />
        <Source
          src={desktop}
          width={756}
          height={656}
          fetchPriority="low"
          loading={"lazy"}
          media="(min-width: 1024px)"
        />
        <img class="w-full h-full" src={desktop} alt={alt} loading={"lazy"} />
      </Picture>
      <div
        class={`w-full absolute top-0 left-0 h-full flex flex-col justify-center items-center bg-gradient-to-t from-[#0000004d] group-hover:from-[#ffc72ce6] group-hover:bg-[#ffc72ce6] gap-2 duration-300 lg:gap-5 ${infoSectionCustomClass}`}
      >
        <h3 class="hidden group-hover:flex text-3xl lg:text-[50px] text-black duration-300 font-beausiteGrand">
          {contentTitle}
        </h3>
        <h2 class="flex group-hover:hidden text-3xl lg:text-[50px] absolute bottom-28 text-[#F5F3E7] font-beausiteGrand">
          {title}
        </h2>
        {content && (
          <span
            class="hidden group-hover:flex text-lg lg:text-xl max-w-[400px] text-center text-black duration-300"
            dangerouslySetInnerHTML={{ __html: content }}
          >
          </span>
        )}
        <ButtonLink
          href={href || ""}
          classCustom={"text-black text-sm text-black group-hover:bg-[#F5F3E7] duration-300 absolute bottom-11"}
          label={button}
          creative_name={title}
          creative_slot={index}
          promotion_id={href}
          promotion_name={alt}
          id={id}
        />
      </div>
    </div>
  );
}

export default function ImageDuo({ primaryImage, secondImage }: Props) {
  const id = useId();
  return (
    <div class="flex flex-col gap-5 py-8 lg:flex-row lg:gap-0">
      <SectionImage props={primaryImage} id={id} index={"0"} />
      <SectionImage props={secondImage} id={id} index={"1"} />
    </div>
  );
}
