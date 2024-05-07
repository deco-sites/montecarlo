import { SendEventOnView } from "../../components/Analytics.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

import { useUI } from "../../sdk/useUI.ts";
import { useId } from "../../sdk/useId.ts";

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
    <div className={`flex items-center justify-between flex-wrap`} id={id}>
      <div
        style={backgroundColor
          ? `background: ${backgroundColor};`
          : `background: #F8F7F3;`}
        className={`py-10 w-full lg:w-[50%] self-stretch flex items-center px-6 md:pr-20 lg:pr-0`}
      >
        <div className="container md:max-w-[770px] lg:mr-0 opacity-100">
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
          <h5
            dangerouslySetInnerHTML={{ __html: title }}
            className="text-2xl font-medium mb-4 leading-8 md:leading-[60px] md:text-[40px]"
          >
          </h5>
          <h5
            dangerouslySetInnerHTML={{ __html: subTitle }}
            className="text-base font-light leading-6 md:leading-7"
          >
          </h5>
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
