import { usePartialSection } from "deco/hooks/usePartialSection.ts";

export default function BtnTeste() {
  return (
    <button
      {...usePartialSection({
        href: "?filter.category-2=aneis",
      })}
    >
      Clique Aqui
    </button>
  );
}
