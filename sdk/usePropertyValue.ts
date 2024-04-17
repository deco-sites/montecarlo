import { PropertyValue } from "apps/commerce/types.ts";
import { formatPrice } from "./format.ts";

export function returnCollection(propertys?: PropertyValue[]) {
  if (!propertys) {
    return null;
  }

  const name = "Coleção";
  const arrayCollection: Array<PropertyValue> | null = [];

  propertys.map((item) => {
    if (item.name === name) {
      arrayCollection.push(item);
    }
  });
  console.log("propertys", arrayCollection);
  return arrayCollection;
}

export function formatInstallments(installments: string) {
  const caracter = "R$";

  const indice = installments.indexOf(caracter);
  const indiceDe = installments.indexOf("de");

  if (indice !== -1) {
    const replacement = installments.replace(" sem juros", "");
    const stringInstallments = installments.substring(0, indiceDe - 1);

    const price = replacement.substring(indice + 3);
    const float = parseInt(price);

    const formatPriceString = formatPrice(float, "BRL");

    const format = stringInstallments + " " + formatPriceString;

    return format;
  }
}

export function percentageDiscount(price: number, discont: number) {
  const valuePercentage = price / 100 * discont;
  const discountedPrice = price - valuePercentage;

  return discountedPrice;
}
