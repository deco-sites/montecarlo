import { useEffect } from "preact/hooks";
import type { AnalyticsEvent } from "apps/commerce/types.ts";

interface EventsClickProps {
  event: string;
  // deno-lint-ignore no-explicit-any
  props: Record<string, any>;
}

const DataLayer = () => {
  useEffect(() => {
    const dataLayer = globalThis.window.dataLayer || [];

    // Adiciona dados ao dataLayer (verifica se o evento 'pageview' já foi adicionado)
    const isPageViewExists = dataLayer.some(
      // deno-lint-ignore no-explicit-any
      (event: any) =>
        event.event === "pageview" &&
        event.pagePath === window.location.pathname,
    );
    if (!isPageViewExists) {
      dataLayer.push({
        event: "pageview",
        pagePath: window.location.pathname,
        pageTitle: document.title,
      });
    }

    return () => {
      // Lógica de limpeza, se necessário
    };
  }, []);

  return <></>;
};

export const EventsClick = ({ event, props }: EventsClickProps) => {
  const dataLayer = globalThis.window.dataLayer || [];

  if (event === "click_menu") {
    dataLayer.push({
      event: "click_menu",
      menu_name: props.menu_name,
      menu_url: props.menu_url,
    });
    console.log("DataLayer após o push:", dataLayer);
  }

  return <></>;
};

export default DataLayer;
