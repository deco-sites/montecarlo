import type { ImageWidget } from "apps/admin/widgets.ts";

import type { Props as BannerProductDotInfoProps } from "../../components/product/BannerProductDotInfo/index.tsx";
import BannerProductDotInfo from "../../islands/BannerProductDotInfo.tsx";
import { keys } from "https://denopkg.com/deco-cx/durable@0.5.3/security/keys.ts";

interface CTAProps {
  label?: string;
  href?: string;
}

interface ImageProps {
  /**
   * @description size Image 176x176
   */
  source: ImageWidget;
  /**
   * @description size Image 176x176
   */
  hoverImage?: ImageWidget;
  alt?: string;
}

interface ItemProps {
  label?: string;
  href?: string;
  cta?: CTAProps;
  image: ImageProps;
}

interface ConfigProps {
  placement?: "left" | "right";
  mobilePlacement?: "top" | "bottom";
}

export interface Props {
  title?: string;
  description?: string;
  /**
   * @description size Image 360x360
   */
  banner: BannerProductDotInfoProps;
  grid: ItemProps[];
  config?: ConfigProps;
}

export default function ImageAndGrid(props: Props) {
  const {
    title,
    description,
    banner,
    grid,
    config,
  } = props;

  return (
    <div class="container flex flex-col items-center gap-8 px-2 py-8 md:px-5 md:py-9">
      <div class="flex w-fit flex-col items-center gap-2 text-center font-poppins">
        {title && <h3 class="text-1.5xl font-semibold md:text-3xl">{title}</h3>}
        {description && (
          <p class="text-sm font-medium md:text-base">{description}</p>
        )}
      </div>

      <div
        class={`flex w-full gap-2 md:grid md:grid-cols-2 ${
          config?.mobilePlacement === "bottom" ? "flex-col-reverse" : "flex-col"
        }`}
      >
        <div
          class={`grid w-full grid-cols-2 grid-rows-2 gap-2 ${
            config?.placement === "right" ? "order-2" : ""
          }`}
        >
          {grid.map((item, index) => (
            <div key={index} class="group relative">
              {item.label && (
                <span
                  class={`absolute ${
                    item.cta ? "group-hover:invisible" : ""
                  } flex h-full w-full items-center justify-center bg-perola-intermediario bg-opacity-70 text-sm lg:text-2xl transition font-beausiteGrand z-10`}
                >
                  {item.label}
                </span>
              )}

              {item.cta?.href && (
                <span class="absolute invisible group-hover:visible flex h-full w-full items-center justify-center bg-perola-intermediario bg-opacity-20 transition z-10">
                  <a
                    href={item.cta.href}
                    class="font-poppins text-sm lg:text-base text-black bg-[#FFC72C] bg-opacity-80 py-2 px-4 lg:px-6 hover:opacity-80"
                  >
                    {item.cta.label}
                  </a>
                </span>
              )}

              {item.image && (
                <div class="group relative">
                  {item.href
                    ? (
                      <a href={item.href}>
                        <img
                          class={`h-full w-full object-cover ${
                            item.image.hoverImage ? "" : ""
                          }`}
                          src={item.image.source}
                          alt={item.image.alt}
                        />
                        {item.image.hoverImage && (
                          <img
                            class="h-full w-full object-cover hidden group-hover:block opacity-95 absolute top-0 left-0 right-0 bottom-0 "
                            src={item.image.hoverImage}
                            alt={item.image.alt}
                          />
                        )}
                      </a>
                    )
                    : (
                      <>
                        <img
                          class={`h-full w-full object-cover ${
                            item.image.hoverImage ? "" : ""
                          }`}
                          src={item.image.source}
                          alt={item.image.alt}
                        />
                        {item.image.hoverImage && (
                          <img
                            class="h-full w-full object-cover hidden group-hover:block opacity-95 absolute top-0 left-0 right-0 bottom-0 "
                            src={item.image.hoverImage}
                            alt={item.image.alt}
                          />
                        )}
                      </>
                    )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div class={`${config?.placement === "right" ? "order-1" : ""}`}>
          <BannerProductDotInfo
            {...banner}
            config={{ maxWidth: "100%" }}
          />
        </div>
      </div>
    </div>
  );
}
