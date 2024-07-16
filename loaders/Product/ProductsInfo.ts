import type { ProductListingPage } from "apps/commerce/types.ts";

export interface RangePriceData {
    minPrice: number,
    maxPrice: number,
}

export interface Props { //RangePriceProps
    // category?: string,
    // query?: string,
    /** @default 1 */
    ProductListingPage?: ProductListingPage | null,
}

export interface RangePriceProps {
    rangePriceData: RangePriceData,
}

const loader = async ({ ProductListingPage }: Props,) : Promise<RangePriceProps> => {
    const url = new URL(ProductListingPage?.seo?.canonical || "");
    const query = url.searchParams.get("q");

    const filters: { [key:string] : string } = {};
    let filterQuery = "";

    url.searchParams.forEach((value, key) => {
        if (key.startsWith("filter.")) {
            const filterKey = key.split(".")[1];
            filters[filterKey] += "/" + value;
        }
    });

    Object.keys(filters).map((key, index) => {
        filters[key] = filters[key].replaceAll("undefined", "");
        filterQuery += "/" + key + filters[key];
    });

    let data: RangePriceData = { minPrice: 1, maxPrice: 500000, };

    const getMinPrice: {[key: string] : any} = 
        await fetch(`https://montecarlo.vtexcommercestable.com.br/api/io/_v/api/intelligent-search/product_search${filterQuery !== "" ? filterQuery : "/"}?page=1&count=1&query=${query}&sort=price:asc&fuzzy=0&hideUnavailableItems=true`)
            .then((response) => { return response.json() });

    data.minPrice = await getMinPrice?.products[0]?.items[0]?.sellers[0].commertialOffer.Price; 

    const getMaxPrice: {[key: string] : any} = 
        await fetch(`https://montecarlo.vtexcommercestable.com.br/api/io/_v/api/intelligent-search/product_search${filterQuery !== "" ? filterQuery : "/"}?page=1&count=1&query=${query}&sort=price:desc&fuzzy=0&hideUnavailableItems=true`)
            .then((response) => { return response.json() });

    data.maxPrice = await getMaxPrice?.products[0]?.items[0]?.sellers[0].commertialOffer.Price; 

    console.log({
        query: query,
        filterQuery: filterQuery, 
        min: `https://montecarlo.vtexcommercestable.com.br/api/io/_v/api/intelligent-search/product_search${filterQuery !== "" ? filterQuery : "/"}?page=1&count=1&query=${query}&sort=price:asc&fuzzy=0&hideUnavailableItems=true`,
        max: `https://montecarlo.vtexcommercestable.com.br/api/io/_v/api/intelligent-search/product_search${filterQuery !== "" ? filterQuery : "/"}?page=1&count=1&query=${query}&sort=price:desc&fuzzy=0&hideUnavailableItems=true`
    });

    return { rangePriceData: data } ?? { rangePriceData: {minPrice: 0, maxPrice: 500000, }};
};

export default loader;
  