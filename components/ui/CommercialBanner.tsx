import { Head } from "$fresh/runtime.ts";

import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";

export interface Props {
  imageMobile: ImageWidget;
  imageDesktop: ImageWidget;
  altText?: string;
  /**
   * @format html
   */
  title: string;
  /**
   * @format html
   */
  subTitle: string;
  /**
   * @format color
   * @description color to be used in text background
   */
  backgroundColor?: string;
  /**
   * @title if you want to pre-rendering this image (we only recommended it if this image is in first view)
   */
  preloadImage?: boolean;
}

function CommercialBanner(
  {
    imageMobile,
    imageDesktop,
    altText,
    title,
    subTitle,
    backgroundColor,
    preloadImage,
  }: Props,
) {
  return (
    <div className="flex items-center justify-between flex-wrap">
      <div
        style={backgroundColor
          ? `background: ${backgroundColor}`
          : "background: #F8F7F3"}
        className="py-10 w-full md:w-[50%] self-stretch flex items-center px-6 md:pr-20  lg:pr-0"
      >
        <div className="container md:max-w-[770px] lg:mr-0">
          <h1
            dangerouslySetInnerHTML={{ __html: title }}
            className="text-2xl font-medium mb-4 leading-8 md:leading-[60px] md:text-[40px]"
          >
          </h1>
          <h2
            dangerouslySetInnerHTML={{ __html: subTitle }}
            className="text-base font-light leading-6 md:leading-7"
          >
          </h2>
        </div>
      </div>
      <Picture className="w-full md:w-[50%] self-stretch">
        <Source
          src={imageMobile}
          width={350}
          height={350}
          media="(max-width: 1023px)"
        />
        <Source
          src={imageDesktop}
          width={286}
          height={773}
          media="(min-width: 1024px)"
        />
        <img
          className="w-full h-full object-cover"
          src={imageDesktop}
          alt={altText}
          loading={preloadImage ? "eager" : "lazy"}
        />
      </Picture>
    </div>
  );
}

export default CommercialBanner;
