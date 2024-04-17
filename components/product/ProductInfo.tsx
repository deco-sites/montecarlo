import { SendEventOnView } from "../../components/Analytics.tsx";
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

export interface ExtraInformation {
  /** @description value of the pix discount, for example if the discount is 7% then you must enter 7 */
  pixDiscont: number;
  bonus: string;
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

  console.log("product", product.additionalProperty);

  const eventItem = mapProductToAnalyticsItem({
    product,
    breadcrumbList: breadcrumb,
    price,
    listPrice,
  });

  return (
    <div class="flex flex-col gap-1" id={id}>
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
          {layout?.name === "concat"
            ? `${isVariantOf?.name} ${name}`
            : layout?.name === "productGroup"
            ? isVariantOf?.name
            : name}
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
              <span class=" ">em</span>
              <span class=" font-semibold ">{stringIstallments}</span>
            </>
          )}
        </div>
        <span class="bg-perola-intermediario px-1 py-2 text-sm w-fit">
          {"ou " + formatPrice(valuePix, offers?.priceCurrency) + " com "}
          <strong>{extraInformations.pixDiscont + "% OFF no PIX"}</strong>
        </span>
        <div class="underline-offset-2 decoration-primary underline text-sm flex flex-row gap-1 items-center">
          {extraInformations.bonus} <Icon id="alertBonus" size={15} />
        </div>
      </div>
      {/* Sku Selector */}
      <div class="mt-4 sm:mt-6">
        <ProductSelector product={product} />
      </div>
      {/* Add to Cart and Favorites button */}
      <div class="mt-4 sm:mt-10 flex flex-col gap-2">
        {availability === "https://schema.org/InStock"
          ? (
            <>
              {platform === "vtex" && (
                <>
                  <AddToCartButtonVTEX
                    eventParams={{ items: [eventItem] }}
                    productID={productID}
                    seller={seller}
                  />
                  <WishlistButtonVtex
                    variant="full"
                    productID={productID}
                    productGroupID={productGroupID}
                  />
                </>
              )}
              {platform === "wake" && (
                <>
                  <AddToCartButtonWake
                    eventParams={{ items: [eventItem] }}
                    productID={productID}
                  />
                  <WishlistButtonWake
                    variant="full"
                    productID={productID}
                    productGroupID={productGroupID}
                  />
                </>
              )}
              {platform === "linx" && (
                <AddToCartButtonLinx
                  eventParams={{ items: [eventItem] }}
                  productID={productID}
                  productGroupID={productGroupID}
                />
              )}
              {platform === "vnda" && (
                <AddToCartButtonVNDA
                  eventParams={{ items: [eventItem] }}
                  productID={productID}
                  additionalProperty={additionalProperty}
                />
              )}
              {platform === "shopify" && (
                <AddToCartButtonShopify
                  eventParams={{ items: [eventItem] }}
                  productID={productID}
                />
              )}
              {platform === "nuvemshop" && (
                <AddToCartButtonNuvemshop
                  productGroupID={productGroupID}
                  eventParams={{ items: [eventItem] }}
                  additionalProperty={additionalProperty}
                />
              )}
            </>
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
          />
        )}
      </div>
      {/* Description card */}
      <div class="mt-4 sm:mt-6">
        <span class="text-sm">
          {description && (
            <details>
              <summary class="cursor-pointer">Descrição</summary>
              <div
                class="ml-2 mt-2"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </details>
          )}
        </span>
      </div>
      {/* Analytics Event */}
      <SendEventOnView
        id={id}
        event={{
          name: "view_item",
          params: {
            item_list_id: "product",
            item_list_name: "Product",
            items: [eventItem],
          },
        }}
      />
    </div>
  );
}

export default ProductInfo;
