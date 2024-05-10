import Breadcrumb from "../../components/ui/Breadcrumb.tsx";
import AddToCartButtonLinx from "../../islands/AddToCartButton/linx.tsx";
import AddToCartButtonShopify from "../../islands/AddToCartButton/shopify.tsx";
import AddToCartButtonVNDA from "../../islands/AddToCartButton/vnda.tsx";
import AddToCartButtonVTEX from "../../islands/AddToCartButton/vtex.tsx";
import AddToCartButtonWake from "../../islands/AddToCartButton/wake.tsx";
import AddToCartButtonNuvemshop from "../../islands/AddToCartButton/nuvemshop.tsx";
import OutOfStock from "../../islands/OutOfStock.tsx";
import ShippingSimulation from "../../islands/ShippingSimulation.tsx";
import WishlistButtonVtex from "../../islands/WishlistButton/vtex.tsx";
import WishlistButtonWake from "../../islands/WishlistButton/wake.tsx";
import { formatPrice } from "../../sdk/format.ts";
import {
  formatInstallments,
  percentageDiscount,
  returnCollection,
} from "../../sdk/usePropertyValue.ts";
import { useId } from "../../sdk/useId.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductSelector from "./ProductVariantSelector.tsx";
import Icon from "deco-sites/montecarlo/components/ui/Icon.tsx";
import BenefitsList from "deco-sites/montecarlo/components/product/Benefits/Benefits.tsx";
import type { Props as Benefit } from "deco-sites/montecarlo/components/product/Benefits/Benefits.tsx";
import type { GroupVariants } from "deco-sites/montecarlo/loaders/Product/SimilarProduct.ts";
import { SelectVariants } from "deco-sites/montecarlo/components/product/Similar/VariantGroup.tsx";
import { Material } from "deco-sites/montecarlo/loaders/Layouts/MaterialProduct.tsx";
import { Losses } from "deco-sites/montecarlo/loaders/Layouts/RockProduct.tsx";
import ModalBonus from "deco-sites/montecarlo/components/product/Modal/Bonus.tsx";
import type { Props as ModalBonusProps } from "deco-sites/montecarlo/components/product/Modal/Bonus.tsx";

import ProductDescription from "./ProductDescription.tsx";
import { useUI } from "deco-sites/montecarlo/sdk/useUI.ts";

import {
  SendEventOnClick,
  SendEventOnView,
} from "../../components/Analytics.tsx";

export interface ExtraInformation {
  /** @description value of the pix discount, for example if the discount is 7% then you must enter 7 */
  pixDiscont: number;
  bonus: ModalBonusProps;
  nameGuia: string;
  cepLink: { label: string; url: string };
  benefit: Benefit;
  groups: GroupVariants[] | null;
  materialImages?: Material[];
  lossesImage?: Losses[];
}
interface Props {
  page: ProductDetailsPage | null;
  layout?: {
    /**
     * @title Product Name
     * @description How product title will be displayed. Concat to concatenate product and sku names.
     * @default product
     */
    name?: "concat" | "productGroup" | "product";
  };
  extraInformations: ExtraInformation;
}

function ProductInfo({ page, layout, extraInformations }: Props) {
  const platform = usePlatform();
  const id = useId();
  const { groups } = extraInformations;

  if (page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const { breadcrumbList, product } = page;
  const {
    productID,
    offers,
    name = "",
    gtin,
    isVariantOf,
    additionalProperty = [],
  } = product;
  const description = product.description || isVariantOf?.description;
  const {
    price = 0,
    listPrice,
    seller = "1",
    installments,
    availability,
  } = useOffer(offers);
  const productGroupID = isVariantOf?.productGroupID ?? "";
  const model = isVariantOf?.model ?? null;
  const breadcrumb = {
    ...breadcrumbList,
    itemListElement: breadcrumbList?.itemListElement.slice(0, -1),
    numberOfItems: breadcrumbList.numberOfItems - 1,
  };
  const collections = returnCollection(isVariantOf?.additionalProperty);
  const stringIstallments = installments
    ? formatInstallments(installments)
    : null;
  const valuePix = percentageDiscount(price, extraInformations.pixDiscont);

  const newName = parseInt(name) ? isVariantOf?.name : name;

  const { isMobile } = useUI();

  const eventItem = mapProductToAnalyticsItem({
    product,
    breadcrumbList: breadcrumb,
    price,
    listPrice,
  });

  return (
    <>
      <div class="col-start-4 row-span-2">
        <div class="flex flex-col gap-1 px-2 lg:px-0" id={id}>
          <Breadcrumb itemListElement={breadcrumb.itemListElement} />
          {/* Code and name */}
          <div class="flex flex-row gap-2 flex-wrap mb-5">
            {collections &&
              collections.map((item) => (
                <span class="text-xs underline-offset-2 decoration-primary underline lg:text-sm">
                  {"Coleção " + item.value}
                </span>
              ))}
          </div>
          <h1>
            <span class="font-medium text-base capitalize lg:text-xl">
              {newName}
            </span>
          </h1>
          {model && (
            <span class="text-xs text-[#AAA89C]">{"Referencia: " + model}</span>
          )}
          {/* Prices */}
          <div class="mt-5 flex flex-col gap-3">
            <div class="flex flex-row gap-1 items-center text-base lg:text-xl">
              <span class=" font-semibold ">
                {formatPrice(price, offers?.priceCurrency)}
              </span>
              {stringIstallments && (
                <>
                  <span class=" text-sm">em</span>
                  <span class=" font-semibold ">{stringIstallments}</span>
                </>
              )}
            </div>
            <span class="bg-perola-intermediario py-1 px-2 text-sm w-fit">
              {"ou " + formatPrice(valuePix, offers?.priceCurrency) + " com "}
              <strong>{extraInformations.pixDiscont + "% OFF no PIX"}</strong>
            </span>
            <ModalBonus props={extraInformations.bonus} />
          </div>
          {/* Sku Selector */}
          <div class="mt-4 sm:mt-6 flex flex-row items-end gap-x-6 gap-y-2 flex-wrap">
            {groups && (
              <div class="flex gap-2 w-full flex-wrap">
                {groups.map((group) => (
                  <SelectVariants
                    variants={group.variants}
                    type={group.type}
                    materialImages={extraInformations.materialImages}
                    losses={extraInformations.lossesImage}
                  />
                ))}
              </div>
            )}
            <ProductSelector product={product} />
            <span
              class={`text-sm underline-offset-2 decoration-primary underline lg:text-sm mb-2 cursor-pointer ${
                product.isVariantOf?.hasVariant.length == 1 &&
                " w-full text-center"
              }`}
            >
              {extraInformations.nameGuia}
            </span>
          </div>
          {/* Add to Cart and Favorites button */}
          <div class="mt-7 flex flex-col gap-2 ">
            {availability === "https://schema.org/InStock"
              ? (
                <div class="flex flex-row gap-2 flex-wrap ">
                  <AddToCartButtonVTEX
                    eventParams={{ items: [eventItem] }}
                    productID={productID}
                    seller={seller}
                    price={price}
                  />
                  <button class="w-[calc(50%-0.25rem)] bg-perola-intermediario py-3 hover:opacity-80 duration-300">
                    Quero ganhar
                  </button>
                  <WishlistButtonVtex
                    customClass="w-[calc(50%-0.25rem)] bg-perola-intermediario py-3 hover:opacity-80 duration-300"
                    productID={productID}
                    productGroupID={productGroupID}
                    productClick={product}
                  />
                </div>
              )
              : <OutOfStock productID={productID} />}
          </div>
          {/* Shipping Simulation */}
          <div class="mt-8">
            {platform === "vtex" && (
              <ShippingSimulation
                items={[
                  {
                    id: Number(product.sku),
                    quantity: 1,
                    seller: seller,
                  },
                ]}
                cepLink={extraInformations.cepLink}
              />
            )}
          </div>
          {isMobile.value &&
            <ProductDescription product={product} />}
          <BenefitsList
            title={extraInformations.benefit.title}
            benefits={extraInformations.benefit.benefits}
          />
        </div>
      </div>
      {!isMobile.value && (
        <div class="col-start-1 xl:col-start-2 col-end-4 row-start-1 lg:px-0 w-full max-w-[770px]">
          <ProductDescription product={product} />
        </div>
      )}
    </>
  );
}

export default ProductInfo;
