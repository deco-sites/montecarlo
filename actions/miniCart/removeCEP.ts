export interface Props {
  orderFormId?: string;
}

const loader = async ({ orderFormId }: Props) => {
  console.log("response", orderFormId);

  if (!orderFormId) {
    return null;
  }

  const requestData = {
    "clearAddressIfPostalCodeNotFound": false,
    "selectedAddresses": [],
  };

  const response = await fetch(
    `https://montecarlo.myvtex.com/api/checkout/pub/orderForm/${orderFormId}/attachments/shippingData`,
    {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    },
  )
    .then((res: Response) => res.json());

  console.log("response", response);

  return response;
};

export default loader;
