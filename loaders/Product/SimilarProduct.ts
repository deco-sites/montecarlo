import {
  Product,
  ProductDetailsPage,
  PropertyValue,
} from "apps/commerce/types.ts";

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

export interface optionCard {
  variations: any;
  type: string;
  atualProduct: string;
}

export interface letterCard {
  variations: any;
  type: string;
  atualProduct: property;
}

export interface variationCard {
  variations: any;
  atualProduct: property;
}

export interface PropsLoader {
  product: ProductDetailsPage | null;
  teste: string;
}

const loader = async (props: PropsLoader): Promise<any> => {
  console.log("iniciou o loader ");
  console.log("props", props);

  if (props.product === null) {
    return null;
  }
  //Recebe produto
  const { product } = props.product;
  const { isVariantOf, additionalProperty, productID } = product;
  //Pega os codigos agrupadores
  const grouperCodes: string | null =
    isVariantOf?.additionalProperty?.find((especification: PropertyValue) =>
      especification.name == "Codigo Agrupador"
    )?.value || null;

  //pega o cluster do produto
  //   const clustersName = additionalProperty.find

  //Pega a categoria
  const currentCategory: category = additionalProperty &&
    additionalProperty?.find((
      especification: PropertyValue,
    ) => especification.name == "category")?.propertyID;

  //Define as variações

  const materialProperty: PropertyValue | null = additionalProperty &&
      additionalProperty?.find((property: PropertyValue) =>
        property.name == "Material"
      )?.value || null;
  const stoneProperty: PropertyValue | null = additionalProperty &&
      additionalProperty?.find((property: PropertyValue) =>
        property.name == "Pedra Principal"
      )?.value || null;
  const sizeCorrenteProperty: PropertyValue | null = additionalProperty &&
      additionalProperty?.find((property: PropertyValue) =>
        property.name == "Colar/Corrente (cm)"
      )?.value || null;
  const sizeProperty: PropertyValue | null = additionalProperty &&
      additionalProperty?.find((property: PropertyValue) =>
        property.name == "Tamanho"
      )?.value || null;
  const LetterProperty: PropertyValue | null = additionalProperty &&
      additionalProperty?.find((property: PropertyValue) =>
        property.name == "PropertyValueas"
      )
        ?.value || null;
  const ctsProperty: PropertyValue | null = additionalProperty &&
      additionalProperty?.find((property: PropertyValue) =>
        property.name == "Cts Diamantes"
      )?.value || null;

  //Veriafica as categorias

  const showThumbsIds = [133, 168, 171, 152, 167, 150, 151, 149, 147, 148];

  const isAneis = currentCategory?.id == 3 || currentCategory?.id == 36;
  const isAliancas = currentCategory?.id == 2 || currentCategory?.id == 143;
  const isCorrentes = currentCategory?.id == 100;
  const isPingente = currentCategory?.id == 7 || currentCategory?.id == 107;
  const isColares = currentCategory?.id == 5 || currentCategory?.id == 42;
  const isPiercings = currentCategory?.id == 79 || currentCategory?.id == 119;
  const isBrincos = currentCategory?.id == 4 || currentCategory?.id == 43;
  const isPulseira = currentCategory?.id == 8 || currentCategory?.id == 40;
  const isTornozeleiras = currentCategory?.id == 80 ||
    currentCategory?.id == 82;
  const isCharm = currentCategory?.id == 41;
  const isArgolas = currentCategory?.id == 101 || currentCategory?.id == 120;
  const isSolitarios = currentCategory?.id == 118;
  const isThumb = showThumbsIds.includes(currentCategory?.id);

  console.log("categoory", isSolitarios, currentCategory);

  const isAlfabetoCollection = isVariantOf?.additionalProperty.find((r) =>
    r.value == "COLEÇÃO ALFABETO"
  );
  const isFeCollection = isVariantOf?.additionalProperty.find((r) =>
    r.value == "COLEÇÃO FÉ"
  );
  //const isDestineeCollection = clusterName == "COLEÇÃO DESTINÉE";
  //const isForeverCollection = clusterName == "COLEÇÃO FOREVER";
  //const isSolitariosCollection = clusterName == "COLEÇÃO SOLITÁRIOS";

  const getSimilarProducts = async (grouperCode: string) => {
    const response = await fetch(
      `https://montecarlo.myvtex.com/api/catalog_system/pub/products/search?_from=0&_to=49&fq=specificationFilter_173:010006`,
    ).then((r) => r.json());
    return response;
  };

  //array de tipo
  const typesToBeRendered: string[] = [];

  const result = grouperCodes && getSimilarProducts(grouperCodes);

  //Caso nçao tenha produtos similares
  if (result === null) {
    return;
  }

  if (isCorrentes) {
    typesToBeRendered.push("Cor do metal", "Tamanho", "Espessura");
  }

  if (isPingente) {
    typesToBeRendered.push("Cor do metal", "Tamanho", "pedra");
  }

  if (isPingente && isAlfabetoCollection) {
    typesToBeRendered.push("Cor do metal", "Letra", "pedra");
  }

  if (isPingente && isFeCollection) {
    typesToBeRendered.push("Cor do metal", "Tamanho");
  }

  if (isAneis) {
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

  console.log("typesToBeRendered", typesToBeRendered);

  return typesToBeRendered;
};

export default loader;
