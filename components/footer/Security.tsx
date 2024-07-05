import type { ImageWidget } from "apps/admin/widgets.ts";

/**
 * @titleBy alt
 */
export interface Security {
  /**
   * @description recommended img size 68x68
   */
  src: ImageWidget;
  alt: string;
}

export default function Securitys(
  { content }: { content?: { title?: string; items?: Security[] } },
) {
  return (
    <>
      {content && content.items && content.items.length > 0 && (
        <div class="flex flex-col gap-4 text-base lg:text-xs font-semibold items-center lg:items-start">
          {content.title && (
            <h3 class="text-base lg:text-xs font-semibold">{content.title}</h3>
          )}
          <ul class="flex items-center gap-4 flex-wrap">
            {content.items.map((item) => {
              return (
                <li>
                  {item.src && (
                    <img
                      height={68}
                      loading="lazy"
                      src={item.src}
                      alt={item.alt}
                      class="object-contain"
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}
