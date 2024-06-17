import { Picture, Source } from "apps/website/components/Picture.tsx";
import Image from "apps/website/components/Image.tsx";

interface Props {
  preload?: boolean;
  href?: string;
  image?: string;
  hoverImage?: string;
  alt?: string;
}

export default function Banner(props: Props) {
  const { image, hoverImage, alt, href, preload } = props;

  return (
    <>
      {href
        ? (
          <a href={href}>
            <div class="group relative">
              {image && (
                <Image
                  class={`h-full w-full object-cover ${hoverImage ? "" : ""}`}
                  src={image}
                  alt={alt}
                  width={616}
                  height={616}
                  loading={preload ? "eager" : "lazy"}
                  fetchPriority={preload ? "high" : "low"}
                />
              )}
              {hoverImage && (
                <Image
                  class="h-full w-full object-cover hidden group-hover:block absolute top-0 bottom-0 left-0 right-0 opacity-95"
                  src={hoverImage}
                  alt={alt}
                  width={616}
                  height={616}
                  loading={preload ? "eager" : "lazy"}
                  fetchPriority={preload ? "high" : "low"}
                />
              )}
            </div>
          </a>
        )
        : (
          <div class="group">
            {image && (
              <Image
                class={`h-full w-full object-cover ${
                  hoverImage ? "group-hover:hidden" : ""
                }`}
                src={image}
                alt={alt}
                width={616}
                height={616}
                loading={preload ? "eager" : "lazy"}
                fetchPriority={preload ? "high" : "low"}
              />
            )}
            {hoverImage && (
              <Image
                class="h-full w-full object-cover hidden group-hover:block"
                src={hoverImage}
                alt={alt}
                width={616}
                height={616}
                loading={preload ? "eager" : "lazy"}
                fetchPriority={preload ? "high" : "low"}
              />
            )}
          </div>
        )}
    </>
  );
}
