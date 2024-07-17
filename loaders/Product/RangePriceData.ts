import type { ProductListingPage } from "apps/commerce/types.ts";

export interface RangePriceData {
    minPrice?: number,
    maxPrice?: number,
}

interface FacetsProps {
    /** @title key */
    label: string,
    value: string,
}

export interface Props {
    query?: string,
    facets?: FacetsProps[],
    ProductListingPage?: ProductListingPage | null,
}

export interface RangePriceProps {
    rangePriceData?: RangePriceData,
}

const loader = async ({ query, facets, ProductListingPage }: Props,) : Promise<RangePriceProps> => {

    const data: RangePriceData = { minPrice: 1, maxPrice: 500000, };

    let q : string | undefined | null = "";
    let facetQuery = "";

    if (ProductListingPage && !q) {    
        const url = new URL(ProductListingPage?.seo?.canonical || "");
        const searchQuery = url.searchParams.get("q");

        q = searchQuery;

        const filters: { [key:string] : string } = {};

        url.searchParams.forEach((value, key) => {
            if (key.startsWith("filter.")) {
                const filterKey = key.split(".")[1];
                filters[filterKey] += "/" + value;
            }
        });

        Object.keys(filters).map((key) => {
            filters[key] = filters[key].replaceAll("undefined", "");
            
            const arr = filters[key].split("/");

            arr.forEach((value) => {
                if (value !== "") {
                    facetQuery += "/" + key + "/" + value;
                }
            });
        });
    } else {
        q = query;

        facets?.map((facet) => {
            if (facet.value)
                facetQuery += "/" + facet.label + "/" + facet.value;
        });
    }

    // deno-lint-ignore no-explicit-any
    const getMinPrice: {[key: string] : any} = 
        await fetch(`https://montecarlo.vtexcommercestable.com.br/api/io/_v/api/intelligent-search/product_search${facetQuery ? facetQuery : "/"}?page=1&count=1&query=${q ? q : ""}&sort=price:asc&fuzzy=0&hideUnavailableItems=true`)
            .then((response) => { return response.json() });

    data.minPrice = await getMinPrice?.products[0]?.items[0]?.sellers[0].commertialOffer.Price; 

    // deno-lint-ignore no-explicit-any
    const getMaxPrice: {[key: string] : any} = 
        await fetch(`https://montecarlo.vtexcommercestable.com.br/api/io/_v/api/intelligent-search/product_search${facetQuery ? facetQuery : "/"}?page=1&count=1&query=${q ? q : ""}&sort=price:desc&fuzzy=0&hideUnavailableItems=true`)
            .then((response) => { return response.json() });

    data.maxPrice = await getMaxPrice?.products[0]?.items[0]?.sellers[0].commertialOffer.Price;

    // console.log({
    //     q: q,
    //     facets: facets,
    //     facetQuery: facetQuery,
    //     url: `product_search${facetQuery !== "" ? facetQuery : "/"}?page=1&count=1&query=${q ? q : ""}`,
    //     keys: Object.keys(ProductListingPage || {}),
    //     seo: ProductListingPage?.seo,
    //     type: ProductListingPage ? ProductListingPage["@type"] : "",
    //     pageInfo: ProductListingPage?.pageInfo,
    // });

    return { rangePriceData: data } ?? { rangePriceData: {minPrice: 0, maxPrice: 500000, }};
};

export default loader;
  