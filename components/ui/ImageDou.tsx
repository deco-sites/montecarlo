import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

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

function SectionImage({ props }: { props: Image }) {
  const { mobile, desktop, alt, content, contentTitle, button, title } = props;

  return (
    <div class="relative flex flex-col group w-full lg:w-2/4">
      <Picture>
        <Source
          src={mobile}
          width={350}
          height={350}
          media="(max-width: 1023px)"
        />
        <Source
          src={desktop}
          width={756}
          height={656}
          media="(min-width: 1024px)"
        />
        <img class="w-full h-full" src={desktop} alt={alt} />
      </Picture>
      <div class="w-full absolute top-0 left-0 h-full flex flex-col justify-center items-center bg-gradient-to-t from-[#0000004d] group-hover:from-[#ffc72ce6] group-hover:bg-[#ffc72ce6] gap-2 duration-300 lg:gap-3">
        <h3 class="hidden group-hover:flex text-3xl lg:text-[50px] text-black duration-300">
          {contentTitle}
        </h3>
        <h3 class="flex group-hover:hidden text-3xl lg:text-[50px] absolute bottom-28 text-white">
          {title}
        </h3>
        {content && (
          <span
            class="hidden group-hover:flex text-lg lg:text-xl max-w-[400px] text-center text-black duration-300"
            dangerouslySetInnerHTML={{ __html: content }}
          >
          </span>
        )}
        <a class="bg-primary absolute bottom-11 text-sm text-black px-2 py-3 group-hover:bg-[#F5F3E7] duration-300">
          {button}
        </a>
      </div>
    </div>
  );
}

export default function ImageDuo({ primaryImage, secondImage }: Props) {
  return (
    <div class="flex flex-col gap-5 py-8 lg:flex-row lg:gap-0">
      <SectionImage props={primaryImage} />
      <SectionImage props={secondImage} />
    </div>
  );
}
