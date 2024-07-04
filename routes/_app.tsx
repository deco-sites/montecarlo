import { asset, Head } from "$fresh/runtime.ts";
import { defineApp } from "$fresh/server.ts";
import { Context } from "deco/deco.ts";
import Theme from "../sections/Theme/Theme.tsx";

const sw = () =>
  addEventListener("load", () =>
    navigator && navigator.serviceWorker &&
    navigator.serviceWorker.register("/sw.js"));

export default defineApp(async (_req, ctx) => {
  const revision = await Context.active().release?.revision();

  return (
    <>
      {/* Include default fonts and css vars */}
      <Theme />

      {/* Include Icons and manifest */}
      <Head>
        {/* Enable View Transitions API */}
        <meta name="view-transition" content="same-origin" />

        {/* Tailwind v3 CSS file */}
        <link
          href={asset(`/styles.css?revision=${revision}`)}
          rel="stylesheet"
        />

        {/* Web Manifest */}
        <link rel="manifest" href={asset("/site.webmanifest")} />

        <style
          type="text/css"
          dangerouslySetInnerHTML={{
            __html: `
          @font-face {
            font-family: 'BeausiteGrand';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: url("${
              asset("/fonts/BeausiteGrand-Regular.otf")
            }") format(OpenType)
          }
          @font-face {
            font-family: 'BeausiteGrand';
            font-style: italic;
            font-weight: 400;
            font-display: swap;
            src: url("${
              asset("/fonts/BeausiteGrand-RegularItlaic.otf")
            }") format(OpenType)
          }
          @font-face {
            font-family: 'BeausiteGrand';
            font-style: normal;
            font-weight: 300;
            font-display: swap;
            src: url("${
              asset("/fonts/BeausiteGrand-Light.otf")
            }") format(OpenType)
          }
          @font-face {
            font-family: 'BeausiteGrand';
            font-style: italic;
            font-weight: 300;
            font-display: swap;
            src: url("${
              asset("/fonts/BeausiteGrand-LightItalic.otf")
            }") format(OpenType)
          }
          @font-face {
            font-family: 'BeausiteGrand';
            font-style: normal;
            font-weight: 200;
            font-display: swap;
            src: url("${
              asset("/fonts/BeausiteGrand-Thin.otf")
            }") format(OpenType)
          }
          @font-face {
            font-family: 'BeausiteGrand';
            font-style: italic;
            font-weight: 200;
            font-display: swap;
            src: url("${
              asset("/fonts/BeausiteGrand-ThinItalic.otf")
            }") format(OpenType)
          }
          @font-face {
            font-family: 'BeausiteGrand';
            font-style: normal;
            font-weight: 500;
            font-display: swap;
            src: url("${
              asset("/fonts/BeausiteGrand-Medium.otf")
            }") format(OpenType)
          }
          @font-face {
            font-family: 'BeausiteGrand';
            font-style: italic;
            font-weight: 500;
            font-display: swap;
            src: url("${
              asset("/fonts/BeausiteGrand-MediumItalic.otf")
            }") format(OpenType)
          }
          @font-face {
            font-family: 'BeausiteGrand';
            font-style: normal;
            font-weight: 600;
            font-display: swap;
            src: url("${
              asset("/fonts/BeausiteGrand-Bold.otf")
            }") format(OpenType)
          }
          @font-face {
            font-family: 'BeausiteGrand';
            font-style: italic;
            font-weight: 600;
            font-display: swap;
            src: url("${
              asset("/fonts/BeausiteGrand-BoldItalic.otf")
            }") format(OpenType)
          }
          @font-face {
            font-family: 'BeausiteGrand';
            font-style: normal;
            font-weight: 700;
            font-display: swap;
            src: url("${
              asset("/fonts/BeausiteGrand-Black.otf")
            }") format(OpenType)
          }
          @font-face {
            font-family: 'BeausiteGrand';
            font-style: italic;
            font-weight: 700;
            font-display: swap;
            src: url("${
              asset("/fonts/BeausiteGrand-BlackItalic.otf")
            }") format(OpenType)
          }
          `,
          }}
        >
        </style>
        <script defer 
          dangerouslySetInnerHTML={{__html: `
            document.addEventListener('DOMContentLoaded', () => {
              setTimeout(initGTM, 7000);
            });
            document.addEventListener('scroll', initGTMOnEvent);
            document.addEventListener('mousemove', initGTMOnEvent);
            document.addEventListener('touchstart', initGTMOnEvent);
            function initGTMOnEvent(e) {
              initGTM();
              e.currentTarget.removeEventListener(e.type, initGTMOnEvent);
            }
            function initGTM() {
              if (window.gtmDidInit) {
                return false;
              }
              window.gtmDidInit = true;
              const s = document.createElement('script');
              s.type = 'text/javascript';
              s.async = true;
              s.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-TPPDZQGL';
              document.head.appendChild(s);
            }`}}/>
      </Head>

      {/* Rest of Preact tree */}
      <ctx.Component />

      {/* Include service worker */}
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: `(${sw})();` }}
      />
    </>
  );
});
