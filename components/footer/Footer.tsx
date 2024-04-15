import BackToTop from "../../components/footer/BackToTop.tsx";
import Divider from "../../components/footer/Divider.tsx";
import ExtraLinks from "../../components/footer/ExtraLinks.tsx";
import FooterItems from "../../components/footer/FooterItems.tsx";
import Logo from "../../components/footer/Logo.tsx";
import MobileApps from "../../components/footer/MobileApps.tsx";
import PaymentMethods from "../../components/footer/PaymentMethods.tsx";
import RegionSelector from "../../components/footer/RegionSelector.tsx";
import Social from "../../components/footer/Social.tsx";
import { clx } from "../../sdk/clx.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import PoweredByDeco from "apps/website/components/PoweredByDeco.tsx";
import FormStore from "./FormStore.tsx";
import type { Props as FormStoreProps } from "./FormStore.tsx";
import type { Security } from "./Security.tsx";
import type { PaymentItem } from "./PaymentMethods.tsx";
import type { Stack } from "./Stacks.tsx";
import Stacks from "./Stacks.tsx";
import Securitys from "./Security.tsx";
import Image from "apps/website/components/Image.tsx";

export type Item = {
  label: string;
  href: string;
};

export type Section = {
  label: string;
  items: Item[];
};

export interface SocialItem {
  label:
    | "Discord"
    | "Facebook"
    | "Instagram"
    | "Linkedin"
    | "Tiktok"
    | "Twitter";
  link: string;
}

export interface Props {
  sections?: Section[];
  social?: {
    title?: string;
    items: SocialItem[];
  };
  formState?: FormStoreProps;
  /**
   * @format html
   */
  copyWrite?: string;
  logo: {
    src: ImageWidget;
    alt?: string;
  };
  payments?: {
    title?: string;
    items: PaymentItem[];
  };
  security?: {
    title?: string;
    items: Security[];
  };
  stacks?: {
    title?: string;
    items: Stack[];
  };
}

function Footer({
  sections = [{
    "label": "Sobre",
    "items": [
      {
        "href": "/quem-somos",
        "label": "Quem somos",
      },
      {
        "href": "/termos-de-uso",
        "label": "Termos de uso",
      },
      {
        "href": "/trabalhe-conosco",
        "label": "Trabalhe conosco",
      },
    ],
  }, {
    "label": "Atendimento",
    "items": [
      {
        "href": "/centraldeatendimento",
        "label": "Central de atendimento",
      },
      {
        "href": "/whatsapp",
        "label": "Fale conosco pelo WhatsApp",
      },
      {
        "href": "/trocaedevolucao",
        "label": "Troca e devolução",
      },
    ],
  }],
  social = {
    title: "Redes sociais",
    items: [{ label: "Instagram", link: "/" }, { label: "Tiktok", link: "/" }],
  },
  payments,
  stacks,
  formState,
  logo,
  copyWrite,
  security,
}: Props) {
  return (
    <footer
      class={clx(
        "w-full flex flex-col gap-10",
      )}
    >
      <div class="bg-primary w-full lg:mx-auto pt-12 sm">
        <div class="flex flex-col gap-10">
          <div class="flex flex-col lg:flex-row gap-10 lg:gap-20 lg:justify-between px-2 max-w-[1408px] w-full lg:mx-auto">
            <FooterItems
              sections={sections}
              justify={false}
            />
            <div class="flex flex-col md:flex-row lg:flex-col gap-10 lg:gap-7 lg:w-[30%]">
              <FormStore formState={formState} />
              <Social content={social} />
              <div class="flex w-full items-center lg:items-start flex-col gap-2">
                {logo.src && (
                  <Image
                    width={25}
                    height={28}
                    alt={logo.alt}
                    src={logo.src}
                    loading="lazy"
                    class="flex lg:hidden object-contain"
                  />
                )}
                {copyWrite && (
                  <span
                    class="font-semibold text-sm text-center lg:text-start"
                    dangerouslySetInnerHTML={{ __html: copyWrite }}
                  >
                  </span>
                )}
              </div>
            </div>
          </div>
          <div class="w-full bg-white">
            <div class="flex flex-col md:flex-row md:justify-between gap-10 md:items-center bg-white px-2 pt-8 pb-12 max-w-[1408px] w-full lg:mx-auto">
              <Securitys content={security} />
              <Stacks content={stacks} />
              <PaymentMethods content={payments} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
