import Button from "../../components/ui/Button.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Filters from "../../components/search/Filters.tsx";
import Sort from "../../components/search/Sort.tsx";
import Breadcrumb from "../../components/ui/Breadcrumb.tsx";
import { useRef } from "preact/hooks";
import { Signal, useSignal, useSignalEffect } from "@preact/signals";

import type { ProductListingPage } from "apps/commerce/types.ts";

import ClearFilters from "../../islands/Search/ClearFilters.tsx";
import Drawer from "deco-sites/montecarlo/components/ui/Drawer.tsx";
import { useScript } from "deco/hooks/useScript.ts";
import { useSection } from "deco/hooks/useSection.ts";

export type Props =
  & Pick<ProductListingPage, "filters" | "breadcrumb" | "sortOptions">
  & {
    displayFilter?: boolean;
    layout?: "aside" | "drawer" | "horizontal";
    title?: string;
    columns?: 1 | 2;
  };

function filter() {
  const container: HTMLDivElement | null = document.querySelector("#h-filter");
  const filterLabel: HTMLDivElement | null = document.querySelector(
    "#filter-label",
  );
  console.log("load");

  if (container && filterLabel) {
    console.log("height", container.scrollHeight);

    if (container.scrollHeight <= 50) {
      filterLabel.style.display = "none";
    } else {
      filterLabel.style.display = "flex";
    }
  } else {
    console.error("Elementos não encontrados");
  }
}

function SearchControls(
  {
    filters,
    breadcrumb,
    displayFilter,
    sortOptions,
    layout,
    title,
    url,
    columns = 2,
  }:
    & Props
    & { url: string },
) {
  const open = useSignal(false);

  const priceFilter = filters.find((item) =>
    item.key === "price" && item["@type"] === "FilterRange"
  );
  const priceArray = priceFilter ? [priceFilter] : [];

  filters = filters.filter((item) => item.key !== "price");

  const moreFilters = useSignal(false);
  const showButton = useSignal(false);
  const filtersRef = useRef<HTMLUListElement>(null);

  useSignalEffect(() => {
    if (filtersRef.current) {
      const ulHeight = filtersRef.current.scrollHeight;

      if (ulHeight > 50) {
        showButton.value = true;
      } else {
        showButton.value = false;
      }
    }
  });

  const newUrl = new URL(url);

  const clearURL = newUrl.origin + newUrl.pathname.replace("/s", "");
  return (
    <Drawer
      loading="eager"
      open={false}
      onClose={() => open.value = false}
      id="filter"
      aside={
        <>
          <div class="bg-base-100 flex flex-col h-full divide-y overflow-y-hidden">
            <div class="flex justify-between items-center w-[80vw] max-w-[500px] pr-2">
              <h1 class="px-4 py-3">
                <span class="font-medium text-2xl">Filtrar</span>
              </h1>
              <button
                class="btn btn-ghost bg-transparent hover:bg-transparent border-none ring-transparent"
                hx-on:click={useScript(() => {
                  document.querySelector("#filter")!.click();
                })}
              >
                <Icon id="XMark" size={24} strokeWidth={2} />
              </button>
            </div>
            <div class="flex-grow overflow-auto flex flex-col justify-between pb-5 gap-5">
              <ul
                class={`flex flex-col gap-4 md:gap-8 p-4 md:pl-0`}
              >
                <Filters filters={filters} url={url} />
              </ul>

              <div class="flex flex-col gap-2 px-5">
                <button class="font-poppins uppercase text-white text-sm bg-[#333435] px-2 py-2 hidden">
                  Aplicar
                </button>
                <a
                  class="font-poppins uppercase text-black bg-[#f7ead5] px-2 py-2 text-center text-sm"
                  hx-get={useSection({ href: clearURL })}
                  hx-swap="outerHTML show:parent:top"
                  hx-target="closest section"
                  id="resultTeste"
                  rel="nofollow"
                  hx-trigger="click"
                  hx-indicator="#spinner"
                  hx-push-url={clearURL}
                >
                  Limpar Filtro
                </a>
              </div>
            </div>
          </div>
        </>
      }
    >
      {layout === "horizontal"
        ? (
          <>
            <div class="hidden md:flex flex-col gap-2 md:mb-4 md:pb-4">
              <div class="flex flex-row-reverse flex-wrap justify-between gap-5 self-end w-full">
                <div class="flex flex-row justify-end font-poppins text-sm min-w-[40vw] gap-10 relative">
                  <Filters filters={priceArray} layout={layout} url={url} />
                </div>
                {title && title.length > 0
                  ? (
                    <h6 class={"font-poppins text-sm font-semibold"}>
                      {title}
                    </h6>
                  )
                  : null}
                {breadcrumb?.itemListElement.length > 0
                  ? <Breadcrumb itemListElement={breadcrumb?.itemListElement} />
                  : null}
              </div>

              <div
                id="container-filter"
                data-show="close"
                class={`flex relative after:content-[''] after:h-8 after:w-full after:absolute after:top-full after:left-0 after:right-0 after:bg-white ${
                  layout === "horizontal"
                    ? `flex-row gap-4 ${!moreFilters.value ? "h-10" : ""}`
                    : "flex-col gap-6"
                } p-4 md:pl-0`}
              >
                <ul
                  id={"h-filter"}
                  className={`flex flex-row gap-4 flex-wrap`}
                >
                  <Filters filters={filters} layout={layout} url={url} />
                </ul>
                <button
                  id={"filter-label"}
                  class="font-poppins text-sm text-black border-b border-[#FFC72C] whitespace-nowrap h-5 flex gap-1"
                  hx-on:click={useScript(() => {
                    const filter: HTMLDivElement | null = document
                      .querySelector("#container-filter");
                    const filterLabel: HTMLDivElement | null = document
                      .querySelector("#filter-label > span");
                    const filterIcon: HTMLDivElement | null = document
                      .querySelector("#filter-label > svg");
                    if (filter?.getAttribute("data-show") == "open") {
                      filter!.style.height = "";
                      filterLabel!.innerText = "Mostrar Mais";
                      filterIcon!.style.transform = "rotate(90deg)";
                      filter?.setAttribute("data-show", "close");
                      filterIcon!.style.top = "0px";
                    } else {
                      filter!.style.height = "auto";
                      filter?.setAttribute("data-show", "open");
                      filterLabel!.innerText = "Mostrar Menos";
                      filterIcon!.style.transform = "rotate(-90deg)";
                      filterIcon!.style.top = "-3px";
                    }
                  })}
                >
                  <span>
                    {!moreFilters.value ? "Mais" : "Menos"} Filtros
                  </span>
                  <Icon
                    class={`relative rotate-90 duration-300`}
                    size={24}
                    id="arrowTop"
                  >
                  </Icon>
                </button>
                {sortOptions.length > 0 && (
                  <Sort sortOptions={sortOptions} url={url} />
                )}
              </div>
            </div>

            <div
              class={`grid grid-cols-2 md:flex md:flex-row flex-wrap items-center justify-between sm:gap-4 w-full ${
                !displayFilter ? "" : ""
              } md:hidden`}
            >
              <div class="flex flex-col gap-2 sm:p-0 mb-2 col-span-2">
                {title && title.length > 0
                  ? (
                    <h6 class={"font-poppins text-sm font-semibold"}>
                      {title}
                    </h6>
                  )
                  : null}
                <Breadcrumb itemListElement={breadcrumb?.itemListElement} />
              </div>

              <div class={"flex col-span-2 justify-end w-full gap-2 my-2"}>
                <button
                  class={`p-1 border ${
                    columns === 1 ? "border-[##AAA89C]" : "border-transparent"
                  }`}
                  hx-swap="outerHTML show:parent:top"
                  hx-get={useSection({
                    props: {
                      layout: { columns: { mobile: 1 }, variant: "horizontal" },
                    },
                  })}
                  hx-target="closest section"
                  id="resultTeste"
                  rel="nofollow"
                  hx-trigger="click"
                  hx-indicator="#spinner"
                >
                  <Icon id="columnOne" width={32} height={16} />
                </button>
                <button
                  class={`p-1 border ${
                    columns === 2 ? "border-[##AAA89C]" : "border-transparent"
                  }`}
                  hx-swap="outerHTML show:parent:top"
                  hx-get={useSection({
                    props: {
                      layout: { columns: { mobile: 2 }, variant: "horizontal" },
                    },
                  })}
                  hx-target="closest section"
                  id="resultTeste"
                  rel="nofollow"
                  hx-trigger="click"
                  hx-indicator="#spinner"
                >
                  <Icon id="columnTwo" width={35} height={16} />
                </button>
              </div>

              <div class="flex flex-row gap-2 col-span-2 mb-4">
                <button
                  class={`bg-[#F5F3E7] ${
                    displayFilter ? "btn-ghost" : "btn-ghost md:hidden"
                  } flex-1`}
                  hx-on:click={useScript(() => {
                    document.querySelector("#filter")!.click();
                  })}
                >
                  Filtrar
                </button>
                {sortOptions.length > 0 && (
                  <div class={"flex justify-center flex-1 bg-[#F5F3E7]"}>
                    <Sort sortOptions={sortOptions} url={url} />
                  </div>
                )}
              </div>
            </div>
          </>
        )
        : (
          <div class="flex flex-col justify-between sm:p-0 sm:gap-2 sm:flex-col">
            <div
              class={`grid grid-cols-2 md:flex md:flex-row flex-wrap items-center justify-between sm:gap-4 w-full ${
                !displayFilter ? "" : ""
              }`}
            >
              <div class="flex flex-col gap-2 sm:p-0 mb-2 col-span-2">
                {title && title.length > 0
                  ? (
                    <h6 class={"font-poppins text-sm font-semibold"}>
                      {title}
                    </h6>
                  )
                  : null}
                <Breadcrumb itemListElement={breadcrumb?.itemListElement} />
              </div>

              <Button
                class={displayFilter ? "btn-ghost" : "btn-ghost md:hidden"}
                onClick={() => {
                  open.value = true;
                }}
              >
                Filtrar
              </Button>
              <div class={"flex justify-center"}>
                {sortOptions.length > 0 && (
                  <Sort sortOptions={sortOptions} url={url} />
                )}
              </div>
            </div>
          </div>
        )}
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(filter) }}
      />
    </Drawer>
  );
}

export default SearchControls;
