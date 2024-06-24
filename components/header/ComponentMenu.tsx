import { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import {
  SendEventOnClick,
  SendEventOnView,
} from "../../components/Analytics.tsx";
import { useId } from "../../sdk/useId.ts";

/**
 * @titleBy href
 */
export interface Link {
  label: string;
  href: string;
}

/**
 * @titleBy title
 */
export interface ListLinks {
  title: string;
  listLinks: Link[];
  linkShowMore: {
    label: string;
    href: string;
  };
}

/**
 * @titleBy href
 */
export interface Image {
  /**
   * @description size Image in aspectRatio 2/1 = 500x250, or aspectRatio 1/1 = 250x250
   */
  img: {
    src: ImageWidget;
    alt: string;
    aspectRatio: "2/1" | "1/1";
  };
  href: string;
  title: string;
  /**
   * @title Content
   */
  conter: HTMLWidget;
}

export interface Props {
  listlinks?: ListLinks;
  image?: Image;
  index: number;
}

const WIDTH = {
  "2/1": 500,
  "1/1": 250,
};

const ASPECTRATIO = {
  "2/1": "aspect-[2/1] ",
  "1/1": "aspect-square h-[250px] w-[250px]",
};

export default function ListLinksOurImage({ listlinks, image, index }: Props) {
  const id = useId();

  if (image) {
    return (
      <a
        href={image.href}
        class="cursor-pointer hover:opacity-70 flex"
        id={id + "image"}
        style={{
          gridColumnStart: index.toString(),
          gridColumnEnd: image.img.aspectRatio == "2/1"
            ? (2 + index).toString()
            : (1 + index).toString(),
        }}
      >
        <div class="flex flex-col justify-center items-start ">
          <Image
            loading={"lazy"}
            fetchPriority="low"
            src={image.img.src}
            alt={image.img.alt}
            width={WIDTH[image.img.aspectRatio]}
            height={250}
            class={`${ASPECTRATIO[image.img.aspectRatio]} mb-3 h-[250px]`}
          >
          </Image>
          <span class=" text-base font-semibold">{image.title}</span>
          <span dangerouslySetInnerHTML={{ __html: image.conter }}></span>
        </div>
        <SendEventOnClick
          id={id + "image"}
          event={{
            name: "select_promotion",
            params: {
              item_list_name: image.img.alt,
              item_list_id: id + "image",
              promotion_name: image.img.alt,
            },
          }}
        />
      </a>
    );
  } else if (listlinks) {
    return (
      <div class="flex flex-col justify-start text-sm gap-5 pr-5">
        <span class="font-semibold ">
          {listlinks?.title}
        </span>
        <ul class={"flex flex-col gap-5"}>
          {listlinks?.listLinks.map((links) => (
            <li>
              <a href={links.href} class="hover:opacity-70" id={id + "links"}>
                {links.label}
                <SendEventOnClick
                  id={id + "links"}
                  event={{
                    name: "login",
                    params: {
                      method: links.href,
                    },
                  }}
                />
              </a>
            </li>
          ))}
        </ul>
        <a
          href={listlinks?.linkShowMore.href}
          class="text-[#A7A59B] hover:underline"
          id={id + "showMoreshowMore"}
        >
          {listlinks?.linkShowMore.label}
          <SendEventOnClick
            id={id + "showMoreshowMore"}
            event={{
              name: "login",
              params: {
                method: listlinks?.linkShowMore.href,
              },
            }}
          />
        </a>
      </div>
    );
  } else {
    return null;
  }
}
