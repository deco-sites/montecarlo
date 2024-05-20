import { ImageWidget } from "apps/admin/widgets.ts";

import Title from "./../product/Shelf/Title.tsx";
import SubTitle from "./../product/Shelf/SubTitle.tsx";

import Slider from "../../components/ui/Slider.tsx";
import { clx } from "../../sdk/clx.ts";
import Image from "apps/website/components/Image.tsx";

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
  links: LinkProps[];
}

function ListLinks(props: Props) {
  const { links } = props;

  return (
    <div class="container flex flex-col gap-4 md:grid md:grid-cols-3 md:gap-5 lg:flex lg:gap-10 lg:flex-row flex-wrap px-10 py-10 lg:py-20 justify-center items-center max-w-fit">
      {links.map((link, index) => (
        <a href={link.href} class="flex gap-3">
          <div class="w-[45px] h-[45px]">
            {link.image?.image && (
              <Image
                class="w-full object-cover aspect-square min-w-[45px] lg:min-w-full"
                src={link.image.image}
                alt={link.image.altText}
                width={45}
                height={45}
                loading={link.image.preload ? "eager" : "lazy"}
                fetchPriority={link.image.preload ? "high" : "low"}
              />
            )}
          </div>
          <div class="text-center mt-2">
            <span class="text-base font-medium font-poppins">{link.label}</span>
          </div>
        </a>
      ))}
    </div>
  );
}

export default ListLinks;
