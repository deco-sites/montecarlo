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
import type { Security } from "./Security.tsx";
import type { PaymentItem } from "./PaymentMethods.tsx";
import type { Stack } from "./Stacks.tsx";
import Stacks from "./Stacks.tsx";
import Securitys from "./Security.tsx";

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

export interface MobileApps {
  /** @description Link to the app */
  apple?: string;
  /** @description Link to the app */
  android?: string;
}

export interface RegionOptions {
  currency?: Item[];
  language?: Item[];
}

export interface Layout {
  backgroundColor?:
    | "Primary"
    | "Secondary"
    | "Accent"
    | "Base 100"
    | "Base 100 inverted";
  variation?:
    | "Variation 1"
    | "Variation 2"
    | "Variation 3"
    | "Variation 4"
    | "Variation 5";
  hide?: {
    logo?: boolean;
    sectionLinks?: boolean;
    socialLinks?: boolean;
    paymentMethods?: boolean;
    mobileApps?: boolean;
    regionOptions?: boolean;
    extraLinks?: boolean;
    backToTheTop?: boolean;
  };
}

interface FormStore {
  title?: string;
  placeholderState?: string;
  placeholderCity?: string;
  button?: string;
}

export interface Props {
  logo?: {
    image: ImageWidget;
    description?: string;
  };
  sections?: Section[];
  social?: {
    title?: string;
    items: SocialItem[];
  };
  formState?: FormStore;
  /**
   * @format html
   */
  copyWrite?: string;
  payments?: {
    title?: string;
    items: PaymentItem[];
  };
  mobileApps?: MobileApps;
  extraLinks?: Item[];
  backToTheTop?: {
    text?: string;
  };
  layout?: Layout;
  security?: {
    title?: string;
    items: Security[];
  };
  stacks?: {
    title?: string;
    items: Stack[];
  };
}

const LAYOUT = {
  "Primary": "bg-primary text-primary-content",
  "Secondary": "bg-secondary text-secondary-content",
  "Accent": "bg-accent text-accent-content",
  "Base 100": "bg-base-100 text-base-content",
  "Base 100 inverted": "bg-base-content text-base-100",
};

function Footer({
  logo,
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
  mobileApps = { apple: "/", android: "/" },
  extraLinks = [],
  formState,
  copyWrite,
  security,
  layout = {
    backgroundColor: "Primary",
    variation: "Variation 1",
    hide: {
      logo: false,
      sectionLinks: false,
      socialLinks: false,
      paymentMethods: false,
      mobileApps: false,
      regionOptions: false,
      extraLinks: false,
      backToTheTop: false,
    },
  },
}: Props) {
  const _logo = layout?.hide?.logo ? <></> : <Logo logo={logo} />;
  const _sectionLinks = layout?.hide?.sectionLinks ? <></> : (
    <FooterItems
      sections={sections}
      justify={layout?.variation == "Variation 2" ||
        layout?.variation == "Variation 3"}
    />
  );
  const _social = layout?.hide?.socialLinks
    ? <></>
    : <Social content={social} vertical={layout?.variation == "Variation 3"} />;
  const _payments = layout?.hide?.paymentMethods
    ? <></>
    : <PaymentMethods content={payments} />;
  const _apps = layout?.hide?.mobileApps
    ? <></>
    : <MobileApps content={mobileApps} />;
  const _links = layout?.hide?.extraLinks
    ? <></>
    : <ExtraLinks content={extraLinks} />;

  return (
    <footer
      class={clx(
        "w-full flex flex-col pt-10 gap-10 bg-primary",
      )}
    >
      <div class="max-w-[1408px] w-full lg:mx-auto">
        {(!layout?.variation || layout?.variation == "Variation 1") && (
          <div class="flex flex-col gap-10">
            <div class="flex flex-col md:flex-row md:justify-between md:flex-wrap lg:flex-nowrap gap-8 lg:gap-12">
              {_logo}
              {_sectionLinks}
            </div>
            <Divider />
            <div class="flex flex-col md:flex-row gap-10 md:gap-14 md:items-end">
              {_payments}
              {_social}
              <div class="flex flex-col lg:flex-row gap-10 lg:gap-14 lg:items-end">
                {_apps}
              </div>
            </div>
            <Divider />
            <div class="flex flex-col-reverse md:flex-row md:justify-between gap-10">
              <PoweredByDeco />
              {_links}
            </div>
          </div>
        )}
        {layout?.variation == "Variation 2" && (
          <div class="flex flex-col gap-10">
            <div class="flex flex-col md:flex-row gap-10">
              <div class="flex flex-col gap-10 lg:w-1/2">
                {_logo}
                {_social}
                {_payments}
                {_apps}
              </div>
              <div class="flex flex-col gap-10 lg:gap-20 lg:w-1/2 lg:pr-10">
                {_sectionLinks}
              </div>
            </div>
            <Divider />
            <div class="flex flex-col-reverse md:flex-row md:justify-between gap-10">
              <PoweredByDeco />
              {_links}
            </div>
          </div>
        )}
        {layout?.variation == "Variation 3" && (
          <div class="flex flex-col gap-10">
            {_logo}
            <div class="flex flex-col lg:flex-row gap-14">
              <div class="flex flex-col md:flex-row lg:flex-col md:justify-between lg:justify-normal gap-10 lg:w-2/5">
                <div class="flex flex-col gap-10">
                  {_payments}
                  {_apps}
                </div>
              </div>
              <div class="flex flex-col gap-10 lg:gap-20 lg:w-3/5 lg:items-end">
                <div class="flex flex-col md:flex-row gap-10">
                  {_sectionLinks}
                  {_social}
                </div>
              </div>
            </div>
            <Divider />
            <div class="flex flex-col-reverse md:flex-row md:justify-between gap-10">
              <PoweredByDeco />
              {_links}
            </div>
          </div>
        )}
        {layout?.variation == "Variation 4" && (
          <div class="flex flex-col gap-10">
            <div class="flex flex-col lg:flex-row gap-10 lg:gap-20 lg:justify-between px-2">
              {_sectionLinks}
              <div class="flex flex-col md:flex-row lg:flex-col gap-10 lg:gap-7 lg:w-[30%]">
                <FormStore formState={formState} />
                {_social}
                {copyWrite && (
                  <span
                    class="font-semibold text-sm text-center lg:text-start"
                    dangerouslySetInnerHTML={{ __html: copyWrite }}
                  >
                  </span>
                )}
              </div>
            </div>
            <div class="flex flex-col md:flex-row md:justify-between gap-10 md:items-center bg-white px-2 pt-8 pb-12">
              <Securitys content={security} />
              <Stacks content={stacks} />
              {_payments}
            </div>
          </div>
        )}
        {layout?.variation == "Variation 5" && (
          <div class="flex flex-col gap-10">
            {_logo}
            <div class="flex flex-col md:flex-row gap-10 lg:gap-20 md:justify-between">
              {_sectionLinks}
              <div class="flex flex-col gap-10 md:w-2/5 lg:pl-10">
                {_payments}
                {_social}
                {_apps}
              </div>
            </div>
            <Divider />
            <div class="flex flex-col-reverse md:flex-row md:justify-between gap-10 md:items-center">
              <PoweredByDeco />
              <div class="flex flex-col md:flex-row gap-10 md:items-center">
                {_links}
              </div>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
}

export default Footer;
