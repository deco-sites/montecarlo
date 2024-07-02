import { useSignal } from "@preact/signals";
import Avatar from "../../components/ui/Avatar.tsx";
import { formatPrice } from "../../sdk/format.ts";
import type {
  Filter,
  FilterRange,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";
import { parseRange } from "apps/commerce/utils/filters.ts";
import Icon from "deco-sites/montecarlo/components/ui/Icon.tsx";

import { useSection } from "deco/hooks/useSection.ts";
import RangeSlider from "../../components/ui/RangeSlider.tsx";

const useUrlRebased = (overrides: string | undefined, base: string) => {
  let url: string | undefined = undefined;

  if (overrides) {
    const temp = new URL(overrides, base);
    const final = new URL(base);

    final.pathname = temp.pathname;
    for (const [key, value] of temp.searchParams.entries()) {
      final.searchParams.set(key, value);
    }

    url = final.href;
  }

  return url;
};

export interface Props {
  filters: ProductListingPage["filters"];
  layout?: "aside" | "drawer" | "horizontal";
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

const isRange = (filter: Filter): filter is FilterRange =>
  filter["@type"] === "FilterRange";

function ValueItem(
  { url, selected, label, quantity }: FilterToggleValue,
) {
  const href = new URL(url, "http://localhost:8000/s").href;

  return (
    <button
      hx-swap="outerHTML"
      hx-get={useSection({
        href,
        props: {},
      })}
      hx-target="closest section"
      id="resultTeste"
      rel="nofollow"
      class="flex items-center gap-2"
      hx-trigger="click delay:1s"
      hx-indicator="#spinner"
      hx-push-url={href}
    >
      <div aria-checked={selected} class="checkbox" />
      <span class="text-sm md:max-w-[200px]">{label}</span>
      {/* {quantity > 0 && <span class="text-sm text-base-300">({quantity})</span>} */}
    </button>
  );
}

interface FilterToggleProps extends FilterToggle {
  layout?: string;
}

function FilterValues({ key, values, layout }: FilterToggleProps) {
  const flexDirection = key === "tamanho" ? "flex-row" : "flex-col";

  const cols = values.length <= 10 && "md:grid-cols-1" ||
    values.length > 10 && values.length <= 20 && "md:grid-cols-2" ||
    values.length > 20 && "md:grid-cols-3";

  return (
    <ul
      class={`flex flex-wrap gap-y-4 gap-x-8 my-2 ${flexDirection} w-max ${
        layout !== "aside" && cols ? `md:grid ${cols}` : ""
      }`}
    >
      {values.map((item) => {
        const { url, selected, value, quantity } = item;

        if (key === "tamanho") {
          return (
            <a href={url} rel="nofollow">
              <Avatar
                content={value}
                variant={selected ? "active" : "default"}
              />
            </a>
          );
        }

        if (key === "price") {
          const range = parseRange(item.value);

          return range && (
            <ValueItem
              {...item}
              label={`${formatPrice(range.from)} - ${formatPrice(range.to)}`}
            />
          );
        }

        return <ValueItem {...item} />;
      })}
    </ul>
  );
}

function Filters({ filters, layout, url }: Props & { url: string }) {
  const openFilter = useSignal<number | null>(null);

  const handleOpenFilter = (index: number) => {
    if (openFilter.value !== index) openFilter.value = index;
    else openFilter.value = null;
  };

  const href = new URL(url).href;

  return (
    <>
      {filters
        .filter(isToggle)
        .map((filter, index) => {
          if (filter.key === "codigo-agrupador" || filter.key === "price") {
            return;
          }

          if (filter.values.length <= 1) return;

          return (
            <li
              class={`flex flex-col relative text-black font-poppins text-sm cursor-pointer border-b group border-b-black ${
                layout !== "horizontal" ? "pb-2" : "md:border-0"
              }`}
            >
              <span
                class="flex justify-between items-center font-poppins text-sm gap-2 whitespace-nowrap"
                onClick={() => handleOpenFilter(index)}
              >
                {filter.label}
                <Icon
                  class="rotate-90"
                  size={24}
                  id="arrowTop"
                >
                </Icon>
              </span>
              <div
                class={`${
                  layout === "horizontal"
                    ? `absolute top-5 bg-white z-10 px-3 py-2 min-w-[150px]`
                    : ""
                } ${
                  openFilter.value !== index ? "" : ""
                } hidden group-hover:flex `}
              >
                <FilterValues {...filter} layout={layout} />
              </div>
            </li>
          );
        })}

      {filters
        .filter(isRange)
        .map((filter) => {
          return (
            <RangeSlider
              // classProps="max-w-[600px]"
              classProps={layout === "aside" ? "flex-wrap" : ""}
              sliderClass="min-w-[200px]"
              name={filter.key}
              label={filter.label}
              min={filter.values.min}
              max={filter.values.max}
              url={url}
            />
          );
        })}
    </>
  );
}

export default Filters;
