import { SendEventOnView } from "../../components/Analytics.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

import { useUI } from "../../sdk/useUI.ts";
import { useId } from "../../sdk/useId.ts";

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
  /**
   * @description size Image 375x268
   */
  imageMobile: ImageWidget;
  /**
   * @description size Image 632x375
   */

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
  paddingMobile?: "Small" | "Normal" | "Large";
  paddingDesktop?: "Small" | "Normal" | "Large";
}

const PADDINGDESKTOP = {
  " ": " ",
  "Small": "lg:py-9",
  "Normal": "lg:py-16",
  "Large": "lg:py-24",
};

const PADDINGMOBILE = {
  " ": " ",
  "Small": "lg:py-9",
  "Normal": "lg:py-16",
  "Large": "lg:py-24",
};

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
    paddingMobile,
    paddingDesktop,
  }: Props,
) {
  const { isMobile } = useUI();

  const id = useId();

  const isMobileDevice = isMobile.value;

  let heightImageDesktopController = 350;
  if (heightImageDesktop) {
    heightImageDesktopController = heightImageDesktop;
  }

  return (
    <div
      className={`flex items-center justify-between flex-wrap ${
        PADDINGMOBILE[paddingMobile || " "]
      }  ${PADDINGDESKTOP[paddingDesktop || " "]}`}
      id={id}
    >
      <div
        style={backgroundColor
          ? `background: ${backgroundColor};`
          : `background: #F8F7F3;`}
        className={`py-10 w-full lg:w-[50%] self-stretch flex items-center px-6 md:pr-20 lg:pr-0`}
      >
        <div
          className={`container md:max-w-[770px] lg:mr-0 opacity-100 ${
            variant === "variant-2" ? "flex flex-col w-fit px-10 lg:px-16" : ""
          }`}
        >
          <h2
            dangerouslySetInnerHTML={{ __html: title }}
            className={`
              ${
              variant === "variant-2"
                ? "text-2xl lg:text-5xl font-poppins font-normal lg:font-light max-w-[515px]"
                : "text-2xl font-medium"
            }
              mb-4 leading-8 md:leading-[60px] md:text-[40px]
            `}
          >
          </h2>
          <h3
            dangerouslySetInnerHTML={{ __html: subTitle }}
            className={`
              ${
              variant === "variant-2"
                ? "text-base lg:text-2xl font-poppins lg:font-inter font-normal max-w-[515px]"
                : "text-base font-light"
            }
              leading-6 md:leading-7
            `}
          >
          </h3>
          <div class="flex gap-4 flex-wrap mt-5">
            {CTA && CTA.length > 0 && (
              CTA.map((button, index) =>
                button.label &&
                (
                  <a
                    class="px-4 py-2 text-sm font-poppins hover:opacity-80"
                    key={index}
                    href={button.href}
                    style={button.config
                      ? { ...button.config }
                      : { backgroundColor: "#FFC72C", color: "#000000" }}
                  >
                    {button.label}
                  </a>
                )
              )
            )}
          </div>
        </div>
      </div>
      {isMobileDevice
        ? (
          <Image
            className="w-full lg:w-[50vw] object-cover h-[calc(100vw*(416/720))]"
            width={600}
            src={imageMobile}
            alt={altText}
            loading={preloadImage ? "eager" : "lazy"}
            preload={preloadImage}
            fetchPriority={preloadImage ? "high" : "low"}
            decoding={preloadImage ? "sync" : "async"}
          />
        )
        : (
          <Image
            className="w-full lg:w-[50%] object-cover lg:h-full"
            src={imageDesktop}
            alt={altText}
            height={heightImageDesktopController}
            width={1200}
            loading={preloadImage ? "eager" : "lazy"}
            preload={preloadImage}
            fetchPriority={preloadImage ? "high" : "low"}
            decoding={preloadImage ? "sync" : "async"}
          />
        )}
      <SendEventOnView
        id={id}
        event={{
          name: "view_promotion",
          params: {
            view_promotion: altText,
            creative_name: altText,
            creative_slot: altText,
            promotion_id: id,
            promotion_name: altText,
            items: [],
          },
        }}
      />
    </div>
  );
}

export default CommercialBanner;
