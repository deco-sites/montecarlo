import { ImageWidget, VideoWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { useUI } from "deco-sites/montecarlo/sdk/useUI.ts";
import { useSection } from "deco/hooks/useSection.ts";

export interface Props {
  title: string;
  /**
   * @description In this component, the size of the Thumbnail must be the same as the size of the video, note: the height and length are editable. Default: 350x148
   */
  mobile: {
    srcThumbnail: ImageWidget;
    video: VideoWidget;
    /**
     * @default 350
     * @description default 350px
     */
    width?: number;
    /**
     * @default 148
     * @description default 148px
     */
    height?: number;
  };
  /**
   * @description In this component, the size of the Thumbnail must be the same as the size of the video, note: the height and length are editable. Default: 1024x600
   */
  desktop: {
    srcThumbnail: ImageWidget;
    video: VideoWidget;
    /**
     * @default 1024
     * @description default 1024px
     */
    width?: number;
    /**
     * @description default 600px
     * @default 600
     */
    height?: number;
  };
  alt: string;
  autoPlay?: boolean;
  preload?: boolean;
}

export default function FullVideo(props: Props) {
  const { title, autoPlay = false, mobile, desktop, preload } = props;
  const { isMobile } = useUI();

  return (
    <div class="relative max-w-[1512px] mx-auto">
      {autoPlay
        ? (
          <video
            class="w-full h-auto"
            controls={true}
            autoPlay={autoPlay}
            width={isMobile.value ? mobile.width : desktop.width}
            height={isMobile.value ? mobile.height : desktop.height}
          >
            <source src={isMobile ? mobile.video : desktop.video} />
          </video>
        )
        : (
          <Image
            src={isMobile ? mobile.srcThumbnail : desktop.srcThumbnail}
            width={isMobile.value ? mobile.width || 350 : desktop.width || 1024}
            height={isMobile.value ? mobile.height : desktop.height}
            class={"w-full h-auto object-cover"}
            preload={preload}
            fetchPriority={preload ? "high" : "low"}
          />
        )}
      {!autoPlay && (
        <div class="absolute top-0 bottom-0 left-0 right-0 flex items-center gap-2 ml-[calc(50%-0.75rem)] lg:ml-[calc(50%-2rem)] lg:gap-12 sm:gap-8 ">
          <button
            class="flex h-6 w-6 items-center justify-center rounded-full bg-primary lg:w-16 lg:h-16 cursor-pointer sm:w-10 sm:h-10"
            hx-get={useSection({
              props: { autoPlay: true },
            })}
            hx-swap="outerHTML"
            hx-target="closest section"
            type={"button"}
          >
            <div class="h-2 w-2 rotate-45 bg-black before:absolute before:-left-[4px] before:top-[2px] 
                    before:h-[8px] before:rounded-b-full before:w-[12px] before:rotate-45 before:bg-primary before:content-['']
                     -translate-x-[2px] sm:-translate-x-[5px] lg:-translate-x-[9px]  xl:text-[3.3rem] xl:leading-12 lg:scale-[3] sm:scale-[2]">
            </div>
          </button>
          <span class="text-white text-2xl font-beausiteGrand w-min lg:text-[3.3rem] lg:leading-12 sm:w-auto sm:text-3xl">
            {title}
          </span>
        </div>
      )}
    </div>
  );
}
