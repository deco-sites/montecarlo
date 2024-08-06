interface Props {
  ctaCollection: string | undefined;
  hrefCollection: string | undefined;
  showOnDesktop?: boolean;
  showOnMobile?: boolean;
  customClass?: string;
}

function CtaCollection(
  { ctaCollection, hrefCollection, showOnDesktop, showOnMobile, customClass }:
    Props,
) {

  if (ctaCollection) {
    return (
      <a
        href={hrefCollection || ""}
        aria-label="view product"
        class={`py-[10px] px-[14px] bg-primary text-black text-sm  ${
          showOnMobile ? "block" : "hidden"
        } lg:px-4 lg:py-2 lg:text-lg lg:${showOnDesktop ? "block" : "hidden"} ${
          customClass ? customClass : ""
        }`}
      >
        {ctaCollection}
      </a>
    );
  }

  return <></>;
}

export default CtaCollection;
