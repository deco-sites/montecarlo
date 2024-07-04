import type { BreadcrumbList } from "apps/commerce/types.ts";

interface Props {
  itemListElement: BreadcrumbList["itemListElement"];
  class?: string;
}

function Breadcrumb({ itemListElement = [], class: _class = "" }: Props) {
  const items = [...itemListElement];

  return (
    <div
      class={`breadcrumbs py-0 text-[#AAA89C] lg:text-sm font-poppins text-sm ` +
        _class}
    >
      <ul>
        {items
          .filter(({ name, item }) => name && item)
          .map(({ name, item }) => (
            <li>
              <a href={item}>{name}</a>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Breadcrumb;
