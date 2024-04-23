import DataLayer, { EventsClick } from "../../islands/DataLayer.tsx";

export interface Props {
  href: string;
  label: string;
}

const ItemFooter = ({ href, label }: Props) => {
  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        EventsClick({
          event: "click_menu",
          props: {
            menu_name: label,
            menu_url: href,
          },
        });
      }}
      className="block py-1 link link-hover text-xs"
    >
      {label}
    </a>
  );
};

export default ItemFooter;
