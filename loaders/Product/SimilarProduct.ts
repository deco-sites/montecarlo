import { ProductDetailsPage, PropertyValue } from "apps/commerce/types.ts";
import { ImageWidget } from "apps/admin/widgets.ts";

export interface property {
  name: string;
  values: string[];
}

export interface specification {
  name: string;
  originalName: string;
  values: string[];
}
export interface category {
  href: string;
  id: number;
  name: string;
}

export interface variationCard {
  // deno-lint-ignore no-explicit-any
  variations: any;
  atualProduct: property;
}

export interface PropsLoader {
  product: ProductDetailsPage | null;
  teste: string;
}

interface Variants {
  link: string;
  message: string;
  urlImage?: ImageWidget;
  productId: number;
  active: boolean;
}

export interface GroupVariants {
  type: string;
  variants: Variants[];
}

export interface Props {
  props: string[];
}

const loader = async (props: PropsLoader): Promise<GroupVariants[] | null> => {
  console.log("iniciou o loader ");
  // console.log("props", props);

  if (props.product === null) {
    return null;
  }
  //Recebe produto
  const { product } = props.product;
  const { isVariantOf, additionalProperty, inProductGroupWithID } = product;
  //Pega os codigos agrupadores
  const grouperCodes: string | null =
    isVariantOf?.additionalProperty?.find((especification: PropertyValue) =>
      especification.name == "Codigo Agrupador"
    )?.value || null;

  //pega o cluster do produto
  //   const clustersName = additionalProperty.find

  // deno-lint-ignore no-explicit-any
  const getSimilarProducts = async (grouperCode: string): Promise<any> => {
    const response = await fetch(
      `https://montecarlo.myvtex.com/api/catalog_system/pub/products/search?_from=0&_to=49&fq=specificationFilter_173:${grouperCode}`,
    ).then((r) => r.json());
    return response;
  };

  //array de tipo
  const typesToBeRendered: string[] = [];

  const result = grouperCodes && await getSimilarProducts(grouperCodes);

  // deno-lint-ignore no-explicit-any
  const currentProduct = result.find((product: any) =>
    product.productId == inProductGroupWithID
  );

  //Pega a categoria
  const currentCategory: number = parseInt(currentProduct.categoryId);

  console.log("currentCategory", currentCategory);
  //Define as variações

  const materialProperty: string | null = isVariantOf &&
      isVariantOf.additionalProperty?.find((property: PropertyValue) =>
        property.name == "Material"
      )?.value || null;
  const stoneProperty: string | null = isVariantOf &&
      isVariantOf.additionalProperty?.find((property: PropertyValue) =>
        property.name == "Pedra Principal"
      )?.value || null;
  const sizeCorrenteProperty: string | null = additionalProperty &&
      isVariantOf?.additionalProperty?.find((property: PropertyValue) =>
        property.name == "Colar/Corrente (cm)"
      )?.value || null;
  const sizeProperty: string | null = isVariantOf &&
      isVariantOf.additionalProperty?.find((property: PropertyValue) =>
        property.name == "Tamanho"
      )?.value || null;
  const LetterProperty: string | null = isVariantOf &&
      isVariantOf.additionalProperty?.find((property: PropertyValue) =>
        property.name == "Letras"
      )
        ?.value || null;
  const ctsProperty: string | null = isVariantOf &&
      isVariantOf.additionalProperty?.find((property: PropertyValue) =>
        property.name == "Cts Diamantes"
      )?.value || null;

  //Veriafica as categorias

  const showThumbsIds = [133, 168, 171, 152, 167, 150, 151, 149, 147, 148];

  const isAneis = currentCategory == 3 || currentCategory == 37;
  const isAliancas = currentCategory == 2 || currentCategory == 143;
  const isCorrentes = currentCategory == 100;
  const isPingente = currentCategory == 7 || currentCategory == 107;
  const isColares = currentCategory == 5 || currentCategory == 42;
  const isPiercings = currentCategory == 79 || currentCategory == 119;
  const isBrincos = currentCategory == 4 || currentCategory == 43;
  const isPulseira = currentCategory == 8 || currentCategory == 40;
  const isTornozeleiras = currentCategory == 80 ||
    currentCategory == 82;
  const isCharm = currentCategory == 41;
  const isArgolas = currentCategory == 101 || currentCategory == 120;
  const isSolitarios = currentCategory == 118;
  const isThumb = showThumbsIds.includes(currentCategory);

  //const isDestineeCollection = clusterName == "COLEÇÃO DESTINÉE";
  //const isForeverCollection = clusterName == "COLEÇÃO FOREVER";
  //const isSolitariosCollection = clusterName == "COLEÇÃO SOLITÁRIOS";

  const isAlfabetoCollection =
    currentProduct?.items[0]?.complementName == "COLEÇÃO ALFABETO";
  const isFeCollection =
    currentProduct?.items[0]?.complementName == "COLEÇÃO FÉ";

  console.log("categoory", isThumb, currentCategory, product.category);

  //Caso nçao tenha produtos similares
  if (result === null) {
    return null;
  }

  if (isCorrentes) {
    typesToBeRendered.push("Cor do metal", "Tamanho", "Espessura");
  }

  if (isPingente && !isAlfabetoCollection) {
    typesToBeRendered.push("Cor do metal", "Tamanho", "pedra");
  }

  if (isPingente && isAlfabetoCollection) {
    typesToBeRendered.push("Cor do metal", "Letra", "pedra");
  }

  if (isPingente && isFeCollection) {
    typesToBeRendered.push("Cor do metal", "Tamanho");
  }

  if (isAneis && !stoneProperty) {
    typesToBeRendered.push("Cor do metal", "pedra");
  }

  if (isAliancas) {
    typesToBeRendered.push("Cor do metal", "pedra");
  }

  if (isAneis && stoneProperty) {
    typesToBeRendered.push("Cor do metal", "pedra");
  }

  if (isArgolas) {
    typesToBeRendered.push("Cor do metal", "Tamanho", "pedra");
  }

  if (
    isSolitarios
    //&& (isForeverCollection || isDestineeCollection || isSolitariosCollection)
  ) {
    typesToBeRendered.push("Cor do metal", "cts");
    console.log("entrou aqui ");
  }

  if (isColares) {
    typesToBeRendered.push("Cor do metal", "Tamanho", "pedra");
  }

  if (isPiercings) {
    typesToBeRendered.push("Cor do metal", "pedra");
  }

  if (isBrincos) {
    typesToBeRendered.push("Cor do metal", "Tamanho", "pedra");
  }

  if (isPulseira) {
    typesToBeRendered.push("Cor do metal", "Tamanho", "pedra");
  }

  if (isTornozeleiras) {
    typesToBeRendered.push("Cor do metal", "Tamanho", "pedra");
  }

  if (isCharm) {
    typesToBeRendered.push("Cor do metal", "pedra");
  }

  if (isThumb) {
    typesToBeRendered.push("variacoes");
  }

  console.log("typesToBeRendered", typesToBeRendered, typesToBeRendered.length);

  typesToBeRendered.map((type) => {
    console.log("types", type);
  });

  if (typesToBeRendered && result && typesToBeRendered.length > 0) {
    const arrayVariant: GroupVariants[] = [];
    //Percorre os tipos
    typesToBeRendered.map((type) => {
      console.log("currentProduct", materialProperty, type);
      //verifica o tipo
      if (type == "Cor do metal" && materialProperty) {
        const materials = [materialProperty];
        const productsToBeRendered = [currentProduct];

        // deno-lint-ignore no-explicit-any
        result.forEach((product: any) => {
          const material = product?.Material?.[0];

          const hasMaterial = material;
          const hasMaterialOnList = materials.includes(material);
          if (sizeCorrenteProperty) {
            const size = product?.["Colar/Corrente (cm)"]?.[0];
            const hasSize = size;

            const isSameSize = size == sizeCorrenteProperty;
            if (hasMaterial && hasSize && isSameSize && !hasMaterialOnList) {
              materials.push(material);
              productsToBeRendered.push(product);
            }
          } else if (sizeProperty) {
            const size = product?.["Tamanho"]?.[0];
            const hasSize = size;

            const isSameSize = size == sizeProperty;
            if (hasMaterial && hasSize && isSameSize && !hasMaterialOnList) {
              if (LetterProperty) {
                const letter = product?.["Letras"]?.[0];
                const isSameLetter = letter == LetterProperty;
                if (isSameLetter) {
                  materials.push(material);
                  productsToBeRendered.push(product);
                }
              } else {
                materials.push(material);
                productsToBeRendered.push(product);
              }
            } else {
              if (hasMaterial && !hasMaterialOnList) {
                materials.push(material);
                productsToBeRendered.push(product);
              }
            }
          } else {
            if (hasMaterial && !hasMaterialOnList) {
              materials.push(material);
              productsToBeRendered.push(product);
            }
          }
        });
        productsToBeRendered.sort((productA, productB) => {
          const a = productA?.Material?.[0];
          const b = productB?.Material?.[0];

          return a.localeCompare(b);
        });

        const variants: Variants[] = [];

        productsToBeRendered.map((variant) => {
          let active: boolean = false;
          if (variant.productId == inProductGroupWithID) {
            active = true;
          }
          variants.push({
            link: variant.link,
            message: variant?.["Material"]?.[0],
            productId: variant.productId,
            active: active,
          });
        });

        arrayVariant.push({ type: "Material", variants: variants });
      }
      if (type == "pedra" && stoneProperty) {
        const stones = [stoneProperty];
        const productsToBeRendered = [currentProduct];

        // deno-lint-ignore no-explicit-any
        result.forEach((product: any) => {
          const stone = product?.["Pedra Principal"]?.[0];
          const material = product?.["Material"]?.[0];
          const size = product?.["Colar/Corrente (cm)"]?.[0] ||
            product?.["Tamanho"]?.[0];

          const hasMaterial = material;
          const isSameMaterial = material == materialProperty;
          const hasStone = stone;
          const hasStoneOnList = stones.includes(stone);
          if (hasStone && hasMaterial && isSameMaterial && !hasStoneOnList) {
            const hasSizesProperty = sizeCorrenteProperty || sizeProperty;
            if (
              hasSizesProperty &&
              (sizeCorrenteProperty == size || sizeProperty == size)
            ) {
              stones.push(stone);
              productsToBeRendered.push(product);
            } else if (!hasSizesProperty) {
              stones.push(stone);
              productsToBeRendered.push(product);
            }
          }
        });
        productsToBeRendered.sort((productA, productB) => {
          const a = productA?.["Pedra Principal"]?.[0];
          const b = productB?.["Pedra Principal"]?.[0];

          return a.localeCompare(b);
        });

        const variants: Variants[] = [];

        productsToBeRendered.map((variant) => {
          let active: boolean = false;
          if (variant.productId == inProductGroupWithID) {
            active = true;
          }
          variants.push({
            link: variant.link,
            message: variant?.["Pedra Principal"]?.[0],
            productId: variant.productId,
            active: active,
          });
        });

        arrayVariant.push({ type: "Pedras", variants: variants });
      }
      if (type == "Tamanho" && (sizeCorrenteProperty || sizeProperty)) {
        const sizes = [sizeCorrenteProperty || sizeProperty];
        const productsToBeRendered = [currentProduct];

        // deno-lint-ignore no-explicit-any
        result.forEach((product: any) => {
          const material = product?.Material?.[0];
          const hasMaterial = material;
          const size = product?.["Colar/Corrente (cm)"]?.[0] ||
            product?.["Tamanho"]?.[0];

          const isSameMaterial = material == materialProperty;
          const hasSize = size;
          const hasSizeOnList = sizes.includes(size);
          if (hasSize && hasMaterial && isSameMaterial && !hasSizeOnList) {
            sizes.push(size);
            productsToBeRendered.push(product);
          }
        });

        productsToBeRendered.sort((productA, productB) => {
          const a = productA?.["Colar/Corrente (cm)"]?.[0] ||
            productA?.["Tamanho"]?.[0];
          const b = productB?.["Colar/Corrente (cm)"]?.[0] ||
            productB?.["Tamanho"]?.[0];

          // deno-lint-ignore no-explicit-any
          function extractNumber(str: any) {
            const match = str.match(/\d+/);
            return match ? parseInt(match[0], 10) : NaN;
          }

          const numA = extractNumber(a);
          const numB = extractNumber(b);

          if (!isNaN(numA) && !isNaN(numB)) {
            return numA - numB;
          } else if (a && b) {
            return a.localeCompare(b);
          } else if (a) {
            return -1;
          } else if (b) {
            return 1;
          } else {
            return 0;
          }
        });

        const variants: Variants[] = [];

        productsToBeRendered.map((variant) => {
          let active: boolean = false;
          if (variant.productId == inProductGroupWithID) {
            active = true;
          }
          variants.push({
            link: variant.link,
            message: variant?.["Colar/Corrente (cm)"]?.[0] ||
              variant?.["Tamanho"]?.[0],
            productId: variant.productId,
            active: active,
          });
        });

        arrayVariant.push({ type: "Tamanho", variants: variants });
      }
      if (type == "Letra" && LetterProperty) {
        const letters = [LetterProperty];
        const productsToBeRendered = [currentProduct];

        // deno-lint-ignore no-explicit-any
        result.forEach((product: any) => {
          const material = product?.Material?.[0];
          const hasMaterial = product?.Material?.[0];
          const letter = product?.["Letras"]?.[0];

          const isSameMaterial = material == materialProperty;
          const hasLetter = letter;
          const hasLetterOnList = letters.includes(letter);
          if (hasLetter && hasMaterial && isSameMaterial && !hasLetterOnList) {
            letters.push(letter);
            productsToBeRendered.push(product);
          }
        });

        productsToBeRendered.sort((productA, productB) => {
          const a = productA?.["Letras"]?.[0];
          const b = productB?.["Letras"]?.[0];

          return a.localeCompare(b);
        });

        const variants: Variants[] = [];

        productsToBeRendered.map((variant) => {
          let active: boolean = false;
          if (variant.productId == inProductGroupWithID) {
            active = true;
          }
          variants.push({
            link: variant.link,
            message: variant?.["Letras"]?.[0] || variant?.["Tamanho"]?.[0],
            productId: variant.productId,
            active: active,
          });
        });

        arrayVariant.push({ type: "Letras", variants: variants });
      }
      if (type == "cts" && ctsProperty) {
        const diamondPoints = [ctsProperty];
        const productsToBeRendered = [currentProduct];

        // deno-lint-ignore no-explicit-any
        result.forEach((product: any) => {
          const stone = product?.["Pedra Principal"]?.[0];
          const material = product?.["Material"]?.[0];
          const cts = product?.["Cts Diamantes"]?.[0];

          const hasMaterial = material;
          const isSameMaterial = material == materialProperty;
          const hasStone = stone;
          const isSameStone = stone == stoneProperty;
          const hasDiamondPointsOnList = diamondPoints.includes(cts);
          if (
            hasStone && hasMaterial && isSameMaterial && isSameStone &&
            !hasDiamondPointsOnList
          ) {
            diamondPoints.push(cts);
            productsToBeRendered.push(product);
          }
        });

        productsToBeRendered.sort((productA, productB) => {
          const a = productA?.["Cts Diamantes"]?.[0];
          const b = productB?.["Cts Diamantes"]?.[0];

          // deno-lint-ignore no-explicit-any
          function extractNumber(str: any) {
            const match = str.match(/\d+/);
            return match ? parseInt(match[0], 10) : NaN;
          }

          const numA = extractNumber(a);
          const numB = extractNumber(b);

          if (!isNaN(numA) && !isNaN(numB)) {
            return numA - numB;
          } else if (a && b) {
            return a.localeCompare(b);
          } else if (a) {
            return -1;
          } else if (b) {
            return 1;
          } else {
            return 0;
          }
        });

        const variants: Variants[] = [];

        productsToBeRendered.map((variant) => {
          let active: boolean = false;
          if (variant.productId == inProductGroupWithID) {
            active = true;
          }
          variants.push({
            link: variant.link,
            message: variant?.["Cts Diamantes"]?.[0],
            productId: variant.productId,
            active: active,
          });
        });

        arrayVariant.push({ type: "Cts Diamantes", variants: variants });
      }
      if (type == "variacoes" && result.length > 1) {
        const variants: Variants[] = [];

        // deno-lint-ignore no-explicit-any
        result.map((variant: any) => {
          let active: boolean = false;
          if (variant.productId == inProductGroupWithID) {
            active = true;
          }
          // deno-lint-ignore no-explicit-any
          const img = variant?.items[0]?.images.find((image: any) =>
            image?.imageLabel === "Principal"
          )?.imageUrl || variant?.items?.[0]?.images[0]?.imageUrl;
          variants.push({
            link: variant.link,
            message: variant.productName,
            urlImage: img,
            productId: variant.productId,
            active: active,
          });
        });
        arrayVariant.push({ type: "Variações", variants: variants });
      }
    });
    console.log("variants", arrayVariant);
    return arrayVariant;
  }
  return null;
};

export default loader;
