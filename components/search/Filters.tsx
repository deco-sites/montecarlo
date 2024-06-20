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

import RangeSlider from "../../islands/RangeSlider.tsx";

interface Props {
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
  return (
    <a href={url} rel="nofollow" class="flex items-center gap-2">
      <div aria-checked={selected} class="checkbox" />
      <span class="text-sm md:max-w-[200px]">{label}</span>
      {/* {quantity > 0 && <span class="text-sm text-base-300">({quantity})</span>} */}
    </a>
  );
}

function FilterValues({ key, values }: FilterToggle) {
  const flexDirection = key === "tamanho" ? "flex-row" : "flex-col";

  const cols = values.length <= 10 && "md:grid-cols-1" ||
    values.length > 10 && values.length <= 20 && "md:grid-cols-2" ||
    values.length > 20 && "md:grid-cols-3";

  return (
    <ul
      class={`flex flex-wrap gap-y-4 gap-x-8 my-2 ${flexDirection} w-max ${
        cols ? `md:grid ${cols}` : ""
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

function Filters({ filters, layout }: Props) {
  const openFilter = useSignal<number | null>(null);

  const handleOpenFilter = (index: number) => {
    if (openFilter.value !== index) openFilter.value = index;
    else openFilter.value = null;
  };

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
              class={`flex flex-col md:gap-4 relative text-black font-poppins text-sm cursor-pointer border-b-black md:border-0 ${
                layout !== "horizontal" ? "pb-2" : ""
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
                } ${openFilter.value !== index ? "hidden" : ""}`}
              >
                <FilterValues {...filter} />
              </div>
            </li>
          );
        })}

      {filters
        .filter(isRange)
        .map((filter) => {
          return (
            <RangeSlider
              classProps="max-w-[600px]"
              sliderClass="max-w-[300px] bg-red-500"
              name={filter.key}
              label={filter.label}
              min={filter.values.min}
              max={filter.values.max}
            />
          );
        })}
    </>
  );
}

export default Filters;
