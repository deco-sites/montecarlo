import DataLayer, { EventsClick } from "../../islands/DataLayer.tsx";
import { SendEventOnClick } from "../../components/Analytics.tsx";

export interface Props {
  href: string;
  label: string;
  id?: string;
}

const ItemFooter = ({ href, label }: Props) => {
  return (
    <>
    <a
      id='item-footer'
      href={href}
      onClick={(e) => {
        e.preventDefault();
        // EventsClick({
        //   event: "click_menu",
        //   props: {
        //     menu_name: label,
        //     menu_url: href,
        //   },
        // });
      }}
      className="block py-1 link link-hover text-xs"
    >
      {label}
    </a>
      <SendEventOnClick
          id="item-footer"
          event={{
            name: "select_promotion",
            params: {
              item_list_name: label,
              items: [],
            },
          }}
    />
    </>
  );
};

export default ItemFooter;
