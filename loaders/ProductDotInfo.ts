interface Props {
  id: number;
}

export interface ProductData {
  id?: number;
  image?: string;
  productName?: string;
  oldPrice?: string;
  price?: string;
}

/** @title Product ID (Dot Info) */
const loader = async ({ id }: Props): Promise<ProductData> => {
  let productData = {};

  try {
    const response = await fetch(
      `https://montecarlo.vtexcommercestable.com.br/api/catalog_system/pub/products/offers/${id}`,
    );
    const data = await response.json();

    const formatNumber = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    });

    productData = {
      id: id,
      image: `https://montecarlo.vteximg.com.br/arquivos/ids/${
        data[0].MainImage.ImageId
      }`,
      productName: data[0].Name,
      oldPrice: formatNumber.format(
        data[0].Offers[0].OffersPerSalesChannel[0].PriceWithoutDiscount,
      ),
      price: formatNumber.format(
        data[0].Offers[0].OffersPerSalesChannel[0].ListPrice,
      ),
    };
  } catch (err) {
    console.error(err);
  }

  return productData;
};

export default loader;
