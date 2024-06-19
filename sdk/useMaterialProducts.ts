import { PropertyValue } from "apps/commerce/types.ts";

export function useMaterialProducts(
  propertyValue: PropertyValue[],
) {
  const arrayMaterial: Array<string> = [];

  propertyValue.map((item) => {
    if (item.name === "Material") {
      if (arrayMaterial.findIndex((array) => array === item.value)) {
        arrayMaterial.push(item.value || "");
      }
    }
  });

  return arrayMaterial;
}
