import { ImageWidget } from "apps/admin/widgets.ts";

import Image from "apps/website/components/Image.tsx";
import {
  SendEventOnClick,
  SendEventOnView,
} from "../../components/Analytics.tsx";
import { useId } from "../../sdk/useId.ts";

interface ImageProps {
  /**@description Image size 246px x 246px */
  image?: ImageWidget;
  altText?: string;
  preload?: boolean;
}

export interface LinkProps {
  label: string;
  href: string;
  image?: ImageProps;
}

export interface Props {
  filter?: string;
  links: LinkProps[];
}

function ListLinks(props: Props) {
  const { links, filter } = props;

  const handleHref = (href: string) => {
    if (filter !== "") {
      const queryParams = new URLSearchParams(window.location.search);
      queryParams.set("filter." + filter, href);

      return `${window.location.origin}${window.location.pathname}?${queryParams}`;
    } else return href;
  };

  const id = useId();

  return (
    <div class="container flex flex-col gap-4 md:grid md:grid-cols-3 lg:flex lg:gap-8 lg:flex-row flex-wrap md:px-10 lg:px-10 py-10 lg:py-20 justify-center max-w-[80vw] md:items-center w-full md:max-w-fit">
      {links.map((link, index) => (
        <a
          key={index}
          href={handleHref(link.href)}
          id={id + index}
          class="flex gap-3 group border border-transparent hover:border-[#FFC72C] transition-all p-2"
        >
          <SendEventOnClick
            id={id + index}
            event={{
              name: "select_promotion",
              params: {
                promotion_id: link.href,
                promotion_name: link.label,
                creative_name: link.label,
                creative_slot: index.toString(),
                items: [],
              },
            }}
          />
          <div class="w-[45px] h-[45px]">
            {link.image?.image && (
              <Image
                class="w-full object-cover aspect-square min-w-[45px] lg:min-w-full group-hover:opacity-80"
                src={link.image.image}
                alt={link.image.altText}
                width={45}
                height={45}
                loading={link.image.preload ? "eager" : "lazy"}
                fetchPriority={link.image.preload ? "high" : "low"}
              />
            )}
          </div>
          <div class="mt-2">
            <span class="text-base font-medium font-poppins">{link.label}</span>
          </div>
          <SendEventOnView
            id={id + index}
            event={{
              name: "view_promotion",
              params: {
                creative_name: link.label,
                creative_slot: index.toString(),
                promotion_id: link.href,
                promotion_name: link.label,
                items: [],
              },
            }}
          />
        </a>
      ))}
    </div>
  );
}

export default ListLinks;
