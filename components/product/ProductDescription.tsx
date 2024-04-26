import { Picture, Source } from "apps/website/components/Picture.tsx";
import Image from "apps/website/components/Image.tsx";

import Accordion from "../ui/Accordion.tsx";

interface Props {
  // deno-lint-ignore no-explicit-any
  product: any | null;
}

interface AdditionalPropertyProps {
  "@type": string;
  name: string;
  value: string;
  valueReference: string;
}

export default function ProductDescription({ product }: Props) {
  const {
    name = "",
    description,
    isVariantOf,
  } = product;

  const newName = parseInt(name) ? isVariantOf?.name : name;

  const technicalInfo: { [key: string]: string[] } = {};

  isVariantOf?.additionalProperty.forEach((item: AdditionalPropertyProps) => {
    if (item.name === "Coleção") {
      technicalInfo["Coleção"] = technicalInfo["Coleção"]
        ? [...technicalInfo["Coleção"], item.value]
        : [item.value];
    }
    if (item.name === "Material") {
      technicalInfo["Metal"] = technicalInfo["Metal"]
        ? [...technicalInfo["Metal"], item.value]
        : [item.value];
    }
    if (item.name === "Pedra") {
      technicalInfo["Pedra"] = technicalInfo["Pedra"]
        ? [...technicalInfo["Pedra"], item.value]
        : [item.value];
    }
    if (item.name === "Altura") {
      technicalInfo["Altura"] = technicalInfo["Altura"]
        ? [...technicalInfo["Altura"], item.value]
        : [item.value];
    }
    if (item.name === "RefId") {
      technicalInfo["RefId"] = technicalInfo["RefId"]
        ? [...technicalInfo["RefId"], item.value]
        : [item.value];
    }
  });

  return (
    <div class="">
      <div class="w-full flex flex-col gap-5 lg:gap-8 px-2 lg:px-0">
        <Accordion
          open
          title="Descrição"
          titleClass="font-inter text-[#000000]"
        >
          <h3 class="font-poppins text-lg lg:text-xl text-black mb-2">
            {newName}
          </h3>
          {description && (
            <div class="font-poppins text-sm lg:text-base text-black flex flex-col">
              <p
                dangerouslySetInnerHTML={{
                  __html: description.match(/<p>[\s\S]*?<\/p>/g)?.join(""),
                }}
              />
            </div>
          )}
        </Accordion>
        {Object.keys(technicalInfo).length > 0 && (
          <Accordion
            title="Informações Técnicas"
            titleClass="font-inter text-[#000000]"
          >
            <ul class="list-disc ml-6 font-poppins text-sm text-black flex flex-col gap-2 lg:mt-5">
              {Object.keys(technicalInfo).map((key: string) => {
                if (
                  key === "Altura" ||
                  key === "RefId"
                ) return <li>{key}: {technicalInfo[key][0]}</li>;
                else return <li>{key}: {technicalInfo[key].join(", ")}</li>;
              })}
            </ul>
          </Accordion>
        )}
        <Accordion
          title="Coleção Tulum"
          titleClass="font-inter text-[#000000]"
        >
          <Collection
            title="Coleção <b>Tulum</b>"
            description="Joias em <b>Prata</b> com banho de Ouro Rosé 18k e pedras preciosas que capturam as cores do entardecer."
            image={{
              mobile: "https://placehold.co/334x357",
              desktop: "https://placehold.co/377x403",
              alt: "",
            }}
            cta={{
              text: "Explore",
              href: "#",
              color: "#000000",
              backgroundColor: "#FFFFFF",
            }}
            style={{
              color: "#000000",
              backgroundColor: "#F5F3E7",
            }}
          />
        </Accordion>
        <Accordion
          title="Pedras"
          titleClass="font-inter text-[#000000]"
        >
          <div class="flex flex-col gap-5">
            <Material
              name="lolita"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non leo eu erat viverra dignissim. Nam commodo justo purus, at tincidunt nibh eleifend non. Ut leo massa, accumsan non odio ut, auctor laoreet risus. Suspendisse ut nunc quis eros ullamcorper semper sit amet vel nulla. Proin ac nulla luctus, placerat erat non."
              image={{
                source: "https://placehold.co/45x45",
                alt: "",
              }}
            />
            <Material
              name="Amestia"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non leo eu erat viverra dignissim. Nam commodo justo purus, at tincidunt nibh eleifend non. Ut leo massa, accumsan non odio ut, auctor laoreet risus. Suspendisse ut nunc quis eros ullamcorper semper sit amet vel nulla. Proin ac nulla luctus, placerat erat non."
              image={{
                source: "https://placehold.co/45x45",
                alt: "",
              }}
            />
          </div>
        </Accordion>
      </div>
    </div>
  );
}

interface CollectionProps {
  image?: {
    mobile?: string;
    desktop?: string;
    alt?: string;
  };
  title?: string;
  description?: string;
  cta?: {
    text?: string;
    href?: string;
    color?: string;
    backgroundColor?: string;
  };
  style?: {
    color?: string;
    backgroundColor?: string;
  };
}

function Collection(props: CollectionProps) {
  return (
    <div
      class={`flex flex-col-reverse bg-[${props.style?.backgroundColor}] lg:grid lg:grid-cols-2`}
    >
      <div
        class={`font-poppins text-[${props.style?.color}] flex flex-col gap-5 p-16 justify-center`}
      >
        {props.title && (
          <h3
            class="text-[2.5rem] lg:text-[1.563rem] max-w-[213px]"
            dangerouslySetInnerHTML={{ __html: props.title }}
          />
        )}
        {props.description && (
          <p
            class="font-light text-xl lg:text-base max-w-[213px]"
            dangerouslySetInnerHTML={{ __html: props.description }}
          />
        )}

        <a class="text-sm" href={props.cta?.href}>
          <button
            class={`px-3 py-2 bg-[${props.cta?.backgroundColor}] text-[${props.cta?.color}] transition-opacity hover:opacity-80`}
          >
            {props.cta?.text}
          </button>
        </a>
      </div>
      <div class="w-full h-full">
        <Picture>
          <Source
            media="(max-width: 1279px)"
            src={props.image?.mobile || ""}
            width={334}
            height={357}
            class="w-full object-cover"
          />
          <Source
            media="(min-width: 1280px)"
            src={props.image?.desktop || ""}
            width={377}
            height={403}
            class="w-full object-cover"
          />
          <img
            class="w-full h-full object-cover"
            src={props.image?.desktop || ""}
            alt={props.image?.alt}
          />
        </Picture>
      </div>
    </div>
  );
}

interface MaterialProps {
  name?: string;
  description?: string;
  image?: {
    source?: string;
    alt?: string;
  };
}

function Material(props: MaterialProps) {
  return (
    <div class="flex flex-col font-poppins text-black gap-2">
      <div class="flex gap-2 lg:gap-5 items-center">
        {props.image?.source && (
          <Image
            class="h-auto min-w-[45px] w-[45px] lg:min-w-[77px] lg:w-[77px] rounded-full"
            width={45}
            height={45}
            src={props.image.source}
            alt={props.image.alt}
          />
        )}
        {props.name && (
          <h3
            class="font-medium text-base lg:text-xl"
            dangerouslySetInnerHTML={{ __html: props.name }}
          />
        )}
      </div>
      {props.description && (
        <p
          class="font-light text-sm ml-[51px] lg:ml-[97px]"
          dangerouslySetInnerHTML={{ __html: props.description }}
        />
      )}
    </div>
  );
}
