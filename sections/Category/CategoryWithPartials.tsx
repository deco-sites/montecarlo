import { SectionProps } from "deco/mod.ts";
import { usePartialSection } from "https://denopkg.com/deco-cx/deco@1.60.25/hooks/usePartialSection.ts";
import SearchResult, {
  Props as SearchResultProps,
} from "../../components/search/SearchResult.tsx";
import BtnTeste from "../../components/ui/btnTest.tsx";
import CategoryAnchorComponent from "../../components/ui/CategoryAnchor.tsx";

export type Props = SearchResultProps;

function CategoryWithPartials(props: SectionProps<typeof loader>) {
  return (
    <>
      <CategoryAnchorComponent {...props} />
      <BtnTeste />
      <div id="teste">
        <SearchResult {...props} />
      </div>
    </>
  );
}

export const loader = (props: Props, req: Request) => {
  return {
    ...props,
    url: req.url,
  };
};

export default CategoryWithPartials;
