import { SectionImage } from "./ImageDou.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import type { ComponentChildren } from "preact";
import { useUI } from "../../sdk/useUI.ts";

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
  firstImage: Image;
  secondImage: Image;
  thirdImage: Image;
  fourthImage: Image;
}


interface Wrapper {
  children: ComponentChildren
}

function WrapperImage({ children }: Wrapper) {

  return (
    <div class="relative w-full md:w-2/4">
      { children }

      <div class="absolute overflow-y-hidden w-full h-full bg-gradient-to-t from-[#01010157] to-transparent top-0"></div>
    </div>
  )
}


export default function ImageQuad({ firstImage, secondImage, thirdImage, fourthImage }: Props) {
  return (
      <div class={'container flex flex-col py-8 sm:flex-wrap sm:flex-row'} >
        <WrapperImage>
          <SectionImage props={firstImage} customClass={'mt-[-2px]'} wrapperCustomClass={`w-full lg:w-full`} infoSectionCustomClass={`absolute top-0 z-10`} />
        </WrapperImage>
        
        <WrapperImage>
          <SectionImage props={secondImage} customClass={'mt-[-2px]'} wrapperCustomClass={`w-full lg:w-full`} infoSectionCustomClass={`absolute top-0 z-10`} />
        </WrapperImage>
        { thirdImage && <WrapperImage><SectionImage props={thirdImage} customClass={'mt-[-2px]'} wrapperCustomClass={`w-full lg:w-full`} infoSectionCustomClass={`absolute top-0 z-10`} /></WrapperImage> }
        { fourthImage && <WrapperImage><SectionImage props={fourthImage} customClass={'mt-[-2px]'} wrapperCustomClass={`w-full lg:w-full`} infoSectionCustomClass={`absolute top-0 z-10`} /></WrapperImage> }
      </div>
  )
}
