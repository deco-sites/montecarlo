import { Picture, Source } from "apps/website/components/Picture.tsx";

interface Props {
  preload?: boolean;
  href?: string;
  image?: string;
  hoverImage?: string;
  alt?: string;
}

export default function Banner(props: Props) {
  const {image, hoverImage, alt, href} = props;

  return (
    <>
      {
        href ?
          <a href={href}>
            <div class="group">
              <img class={`h-full w-full object-cover ${hoverImage ? "group-hover:hidden" : ""}`} src={image} alt={alt} />
              {hoverImage && <img class="h-full w-full object-cover hidden group-hover:block" src={hoverImage} alt={alt} /> }
            </div>
          </a>
        :
          <div class="group">
            <img class={`h-full w-full object-cover ${hoverImage ? "group-hover:hidden" : ""}`} src={image} alt={alt} />
            {hoverImage && <img class="h-full w-full object-cover hidden group-hover:block" src={hoverImage} alt={alt} /> }
          </div>
      }
    </>
  );
}
