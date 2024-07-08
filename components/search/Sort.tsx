import { ProductListingPage } from "apps/commerce/types.ts";
import { useScript } from "deco/hooks/useScript.ts";

const SORT_QUERY_PARAM = "sort";
const PAGE_QUERY_PARAM = "page";

export type Props = Pick<ProductListingPage, "sortOptions">;

// TODO: move this to the loader
const portugueseMappings = {
  "relevance:desc": "Relevância",
  "price:desc": "Maior Preço",
  "price:asc": "Menor Preço",
  "orders:desc": "Mais vendidos",
  "name:desc": "Nome - de Z a A",
  "name:asc": "Nome - de A a Z",
  "release:desc": "Mais recentes",
  "discount:desc": "Maior desconto",
};

function Sort({ sortOptions, url }: Props & { url: string }) {
  const sortUrl = new URL(url).searchParams;

  const currentSort = sortUrl.get("sort") == null
    ? "release:desc"
    : sortUrl.get("sort") == ""
    ? "relevance:desc"
    : sortUrl.get("sort");

  return (
    <>
      <label for="sort" class="sr-only">Ordenar por</label>
      <select
        id="sort"
        name="sort"
        hx-swap="outerHTML show:parent:top"
        hx-target="closest section"
        hx-indicator="#spinner"
        hx-trigger="change"
        hx-on:change={useScript(() => {
          const sort: HTMLSelectElement = document.querySelector("#sort");

          const urlObj = new URL(window.location.href);

          const urlSearchParams = urlObj.searchParams; // Obtém os parâmetros de busca da URL

          urlSearchParams.delete("page"); // Remove o parâmetro de página
          urlSearchParams.set("sort", sort.value); // Define o parâmetro de ordenação com o valor passado

          const newUrl = urlObj.href;
          history.pushState({}, "", newUrl);
          htmx.ajax("GET", newUrl);
        })}
        class="w-min h-5 px-1 rounded m-2 md:m-0 text-base-content cursor-pointer outline-none bg-transparent text-center md:-translate-y-[2px] md:rounded-b-none md:border-b md:border-black md:text-sm md:h-fit"
      >
        {sortOptions.map(({ value, label }) => ({
          value,
          label: portugueseMappings[label as keyof typeof portugueseMappings] ??
            label,
        })).filter(({ label }) => label).map(({ value, label }) => (
          <option
            key={value}
            value={value}
            selected={value === currentSort}
          >
            <span class="text-sm">{label}</span>
          </option>
        ))}
      </select>
    </>
  );
}

export default Sort;
