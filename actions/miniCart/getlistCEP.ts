interface optionsRetirada {
  value: number;
  label: string;
  shippingEstimate: string;
  deliveryChannel: string;
  price: number;
}

interface Options {
  type: "delivery" | "pickup-in-point";
  options: optionsRetirada[];
}

interface Cep {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

interface MiniCart {
  id: string;
  quantity: number;
  seller: string;
}

export interface Props {
  cep: string;
  miniCart?: MiniCart[];
  orderFormId: string;
}

const loader = async (props: Props) => {
  if (props.miniCart === undefined || props.miniCart?.length === 0) {
    return null;
  }

  const cepRegex = /^\d{5}-?\d{3}$/;

  const isValidCep = async () => {
    if (!cepRegex.test(props.cep)) {
      return null;
    } else {
      const url = `https://viacep.com.br/ws/${props.cep}/json/`;
      try {
        const response = await fetch(url);
        const data: Cep = await response.json();
        // deno-lint-ignore no-prototype-builtins
        return !data.hasOwnProperty("erro");
        // deno-lint-ignore no-unused-vars
      } catch (error) {
        return false;
      }
    }
  };

  const responseCep = await isValidCep();

  if (responseCep) {
    const requestData = {
      "items": props.miniCart,
      "country": "BRA",
      "postalCode": props.cep,
    };

    const res = await fetch(
      "https://montecarlo.myvtex.com/api/checkout/pub/orderForms/simulation",
      {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      },
    ).then((r: Response) => r.json())
      .then((response) => {
        const options: Options[] = [];

        const deliveryChannels = response.logisticsInfo[0].slas.filter((
          // deno-lint-ignore no-explicit-any
          sla: any,
        ) => sla.deliveryChannel == "delivery");
        // deno-lint-ignore no-explicit-any
        deliveryChannels.forEach((item: any) => {
          const optionsEntrega = () => {
            const novoArray = [];
            const novoItem = {
              value: item.id,
              label: item.name,
              shippingEstimate: item.shippingEstimate,
              deliveryChannel: item.deliveryChannel,
              price: item.price,
            };
            novoArray.push(novoItem);
            return novoArray;
          };
          const res = optionsEntrega();
          options.push({ type: "delivery", options: res });
        });

        // deno-lint-ignore no-explicit-any
        const pickupPoints = response.logisticsInfo[0].slas.filter((sla: any) =>
          sla.deliveryChannel == "pickup-in-point"
        );

        // deno-lint-ignore no-explicit-any
        const uniquePickupPoints: Array<any> = [];
        // deno-lint-ignore no-explicit-any
        pickupPoints.forEach((item: any) => {
          // deno-lint-ignore prefer-const
          let city = item.pickupStoreInfo.friendlyName.includes("*")
            ? item.pickupStoreInfo.friendlyName.replace("*", "")
            : item.pickupStoreInfo.friendlyName;
          if (!uniquePickupPoints[city]) {
            uniquePickupPoints[city] = item;
          }
        });

        // deno-lint-ignore no-explicit-any
        const filteredPickupPoints: any = [];

        Object.values(uniquePickupPoints).forEach((item) => {
          if (item.pickupStoreInfo.friendlyName.includes("*")) {
            if (
              !(Object.values(uniquePickupPoints).filter((pickup) =>
                pickup.pickupStoreInfo.friendlyName.indexOf(
                  item.pickupStoreInfo.friendlyName.replace("*", ""),
                ) >= 0
              ).length > 1)
            ) {
              filteredPickupPoints.push(item);
            }
          } else {
            filteredPickupPoints.push(item);
          }
        });

        // deno-lint-ignore no-explicit-any
        filteredPickupPoints.forEach((item: any) => {
          const optionsEntrega = () => {
            const novoArray = [];
            const novoItem = {
              value: item.id,
              label: item.pickupStoreInfo.friendlyName,
              shippingEstimate: item.transitTime,
              deliveryChannel: item.deliveryChannel,
              price: item.price,
            };
            novoArray.push(novoItem);
            return novoArray;
          };
          const res = optionsEntrega();
          options.push({ type: "pickup-in-point", options: res });
        });

        console.log("all Options", options);
        return options;
      });
    return res;
  } else {
    return null;
  }
};

export default loader;
