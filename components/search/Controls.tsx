import Button from "../../components/ui/Button.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Filters from "../../components/search/Filters.tsx";
import Sort from "../../components/search/Sort.tsx";
import Drawer from "../../components/ui/Drawer.tsx";
import Breadcrumb from "../../components/ui/Breadcrumb.tsx";
import { useRef } from "preact/hooks";
import { Signal, useSignal, useSignalEffect } from "@preact/signals";

import type { ProductListingPage } from "apps/commerce/types.ts";

import RangeSlider from "../../islands/RangeSlider.tsx";

export type Props =
  & Pick<ProductListingPage, "filters" | "breadcrumb" | "sortOptions">
  & {
    displayFilter?: boolean;
    layout?: "aside" | "drawer" | "horizontal";
    title?: string;
  };

function SearchControls(
  { filters, breadcrumb, displayFilter, sortOptions, layout, title }: Props,
) {
  const open = useSignal(false);

  const columnsMobile = useSignal(2);

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

  return (
    <Drawer
      loading="lazy"
      open={open.value}
      onClose={() => open.value = false}
      aside={
        <>
          <div class="bg-base-100 flex flex-col h-full divide-y overflow-y-hidden">
            <div class="flex justify-between items-center w-[80vw] max-w-[500px] pr-2">
              <h1 class="px-4 py-3">
                <span class="font-medium text-2xl">Filtrar</span>
              </h1>
              <Button
                class="btn btn-ghost bg-transparent hover:bg-transparent border-none ring-transparent"
                onClick={() => open.value = false}
              >
                <Icon id="XMark" size={24} strokeWidth={2} />
              </Button>
            </div>
            <div class="flex-grow overflow-auto">
              <ul class={`flex flex-col gap-8 p-4 md:pl-0`}>
                <Filters filters={filters} />
              </ul>
            </div>
          </div>
        </>
      }
    >
      {layout === "horizontal"
        ? (
          <>
            <div class="hidden md:flex flex-col gap-2">
              <div class="flex flex-row flex-wrap justify-between gap-5">
                <Breadcrumb itemListElement={breadcrumb?.itemListElement} />
                {title && title.length > 0
                  ? (
                    <h6 class={"font-poppins text-sm font-semibold"}>
                      {title}
                    </h6>
                  )
                  : null}
                <div class="flex flex-row justify-end font-poppins text-sm min-w-[40vw] gap-10 relative">
                  <Filters filters={priceArray} layout={layout} />
                </div>
              </div>

              <div
                class={`flex ${
                  layout === "horizontal" ? "flex-row gap-4" : "flex-col gap-6"
                } p-4 md:pl-0`}
              >
                <ul
                  ref={filtersRef}
                  className={`flex flex-row gap-4 flex-wrap ${
                    !moreFilters.value ? "overflow-hidden max-h-[20px]" : ""
                  }`}
                >
                  <Filters filters={filters} layout={layout} />
                </ul>
                {showButton.value === true
                  ? (
                    <button
                      class="font-poppins text-sm text-black border-b border-[#FFC72C] whitespace-nowrap h-fit"
                      onClick={() => {
                        moreFilters.value = !moreFilters.value;
                      }}
                    >
                      {!moreFilters.value ? "Mais" : "Menos"} Filtros
                    </button>
                  )
                  : null}
                {sortOptions.length > 0 && <Sort sortOptions={sortOptions} />}
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
                    columnsMobile.value === 1
                      ? "border-[##AAA89C]"
                      : "border-transparent"
                  }`}
                  onClick={() => columnsMobile.value = 1}
                >
                  <Icon id="columnOne" width={32} height={16} />
                </button>
                <button
                  class={`p-1 border ${
                    columnsMobile.value === 2
                      ? "border-[##AAA89C]"
                      : "border-transparent"
                  }`}
                  onClick={() => columnsMobile.value = 2}
                >
                  <Icon id="columnTwo" width={35} height={16} />
                </button>
              </div>

              <div class="flex flex-row gap-2 col-span-2">
                <Button
                  class={`bg-[#F5F3E7] ${
                    displayFilter ? "btn-ghost" : "btn-ghost md:hidden"
                  } flex-1`}
                  onClick={() => {
                    open.value = true;
                  }}
                >
                  Filtrar
                </Button>
                <div class={"flex justify-center flex-1 bg-[#F5F3E7]"}>
                  {sortOptions.length > 0 && <Sort sortOptions={sortOptions} />}
                </div>
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
                {sortOptions.length > 0 && <Sort sortOptions={sortOptions} />}
              </div>
            </div>
          </div>
        )}
    </Drawer>
  );
}

export default SearchControls;
