interface Props {
  id: number;
}

export interface ProductData {
  id?: number;
  image?: string;
  productName?: string;
  listPrice?: string;
  price?: string;
}

/** @title Product ID (Dot Info) */
const loader = async ({...props}: Props): Promise<ProductData> => {

  const data = await fetch(
    `https://montecarlo.vtexcommercestable.com.br/api/catalog_system/pub/products/offers/${props.id}`
  ).then(
    response => { return response.json() }
  ).catch(
    error => {
      console.log(error);
      return null
    }
  );

  const formatNumber = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });

  console.log("loader", {data})

  return data ? {
    id: props.id,
    image: `https://montecarlo.vteximg.com.br/arquivos/ids/${data[0].MainImage.ImageId
      }`,
    productName: data[0].Name,
    listPrice: formatNumber.format(
      data[0].Offers[0].OffersPerSalesChannel[0].ListPrice,
    ),
    price: formatNumber.format(
      data[0].Offers[0].OffersPerSalesChannel[0].Price,
    ),
  } : {
    id: props.id,
    image: `https://placehold.co/112x112`,
    productName: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  };
};

export default loader;
