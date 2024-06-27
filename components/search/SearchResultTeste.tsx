import { useSection } from "deco/hooks/useSection.ts";
import { ProductListingPage } from "apps/commerce/types.ts";
import { SectionProps } from "deco/mod.ts";
import { usePartialSection } from "deco/hooks/usePartialSection.ts";



export interface Props {
    title?: string;
    page: ProductListingPage | null;
    startingPage?: 0 | 1;
    partial?: "hideMore" | "hideLess";
}


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

function NotFound() {
    return (
        <div>
            Nada
        </div>
    )
}
function Result(props: Props) {

    const page = props.page!

    return (
        <div id="testeR">
            {props}
        </div>
    )
}

function Teste(props: SectionProps<typeof loader>) {

    const { title, url } = props

    const buttonSearchOutOfStock = useSection({
        href: "http://localhost:8000/Joias/Masculino?map=c%2CspecificationFilter_162",
        props: { title: "testett" }
    });

    return (
        <div id="testeR">
            <h1>
                {title}
            </h1>
            <button
                class="bg-primary p-2"
                hx-swap="outerHTML show:parent:top"
                hx-get={buttonSearchOutOfStock}
                hx-target="#testeR"
                id="btnStock"
            >
                Button HTMX
            </button>
            <Result {...props} />
        </div>
    )
}

function SearchResult(
    { page, ...props }: ReturnType<typeof loader>,
) {
    if (!page) {
        return <NotFound />;
    }

    return (
        <>
            <Teste {...props} page={page} />
        </>
    );
}

export const loader = (props: Props, req: Request) => {
    return {
        ...props,
        url: req.url,
    };
};

export default SearchResult;
