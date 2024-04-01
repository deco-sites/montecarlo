import { PropertyValue } from "apps/commerce/types.ts";

export function useMaterialProducts(
  propertyValue: PropertyValue[],
) {
  const arrayMaterial: Array<string> = [];

  propertyValue.map((item) => {
    if (item.name === "Material") {
      arrayMaterial.push(item.value || "");
    }
  });

  return arrayMaterial;
}
