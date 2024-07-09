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

            {/* ReclameAqui's Seal */}
            <script
              defer
              dangerouslySetInnerHTML={{
                __html: `
                const script = document.createElement("script");
                script.type = "text/javascript";
                script.id = "ra-embed-reputation";
                script.src = "https://s3.amazonaws.com/raichu-beta/selos/bundle.js";
                script.async = true;
                script.setAttribute("data-id", "MTA0MzE6bW9udGUtY2FybG8tam9pYXM=");
                script.setAttribute("data-target", "reputation-ra");
                script.setAttribute("data-model", "2");
                document.body.appendChild(script);
              `,
              }}
            />

            <li>
              <div id="reputation-ra"></div>
            </li>

            {/* Confi's Seal */}
            <script
              defer
              dangerouslySetInnerHTML={{
                __html: `
                const scriptconfi = document.createElement("script");
                scriptconfi.type = "text/javascript";
                scriptconfi.id = "getData";
                scriptconfi.src = "https://cdn.confi.com.vc/scripts/getData.js?sellerId=107550";
                scriptconfi.async = true;
                scriptconfi.setAttribute("data-target", "reputation-confi");
                document.body.appendChild(scriptconfi);
              `,
              }}
            />

            <li>
              <div id="reputation-confi" class="h-[68px] w-[68px]">
                <a
                  id="seloEconfy"
                  href="https://confi.com.vc/lojas-confiaveis/detalhes?id=107550"
                  target="_blank"
                >
                </a>
              </div>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
