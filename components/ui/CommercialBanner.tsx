import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

import { useUI } from "../../sdk/useUI.ts";

interface ColorConfig {
  /** @format color */
  backgroundColor?: string;
  /** @format color */
  color?: string;
}

interface CTAProps {
  label?: string;
  href: string;
  config?: ColorConfig;
}

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
  /**
   * @description to improve Cls metric (Web Vitals), enter the height of the image that should be shown on Desktop. Enter using pixel format. Value example: 600.
   */
  heightImageDesktop: number;
  /**
   * @description if you want to show the CTA button.
   */
  CTA?: CTAProps[];
  /** 
   * @description select a style variante for the Commercial Banner
   */
  variant?: "variant-1" | "variant-2";
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
    heightImageDesktop,
    CTA,
    variant,
  }: Props,
) {
  const { isMobile } = useUI();

  const isMobileDevice = isMobile.value;

  let heightImageDesktopController = 350;
  if (heightImageDesktop) {
    heightImageDesktopController = heightImageDesktop;
  }

  return (
    <div className={`flex items-center justify-between flex-wrap`}>
      <div
        style={backgroundColor
          ? `background: ${backgroundColor};`
          : `background: #F8F7F3;`}
        className={`py-10 w-full lg:w-[50%] self-stretch flex items-center px-6 md:pr-20 lg:pr-0`}
      >
        <div className={`container md:max-w-[770px] lg:mr-0 opacity-100 ${variant === "variant-2" ? "flex flex-col w-fit px-10 lg:px-5" : ""}`}>
          <h5
            dangerouslySetInnerHTML={{ __html: title }}
            className={`
              ${variant === "variant-2" ? "text-2xl lg:text-5xl font-poppins font-normal lg:font-light max-w-[515px]" 
              : "text-2xl font-medium"}
              mb-4 leading-8 md:leading-[60px] md:text-[40px]
            `}
          >
          </h5>
          <h5
            dangerouslySetInnerHTML={{ __html: subTitle }}
            className={`
              ${variant === "variant-2" ? "text-base lg:text-2xl font-poppins lg:font-inter font-normal max-w-[515px]" 
              : "text-base font-light"}
              leading-6 md:leading-7
            `}
          >
          </h5>
          <div class="flex gap-4 flex-wrap mt-5">
            {
              CTA && CTA.length > 0 && (
                CTA.map((button, index) => button.label &&
                  <a 
                    class="px-4 py-2 text-sm font-poppins hover:opacity-80"
                    key={index}
                    href={button.href}
                    style={button.config ? {...button.config} : {  backgroundColor: "#FFC72C", color: "#000000" }}
                  >
                    {button.label}
                  </a>
                )
              )
            }
          </div>

        </div>
      </div>
      {isMobileDevice
        ? (
          <Image
            className="w-full lg:w-[50vw] object-cover"
            width={600}
            src={imageMobile}
            alt={altText}
            style={"height: auto;"}
            loading={preloadImage ? "eager" : "lazy"}
          />
        )
        : (
          <Image
            className="w-full lg:w-[50%] object-cover"
            src={imageDesktop}
            alt={altText}
            style={`height: ${heightImageDesktopController}px;`}
            height={heightImageDesktopController}
            width={1200}
            loading={preloadImage ? "eager" : "lazy"}
          />
        )}
    </div>
  );
}

export default CommercialBanner;
