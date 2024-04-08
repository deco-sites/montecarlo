export interface LocationStore {
  city: string;
  state: string;
  uf: string;
}

interface States {
  city: string[];
  state?: string;
  uf: string;
}

export interface Data {
  data: States[];
}

/**@title Search Store Props */
export interface Props {
  locationStore: LocationStore[];
}

/**@title Search Store */
const loader = async (): Promise<Data> => {
  const link = "/api/dataentities/NL/search?_fields=city,state,uf";

  const settings = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "REST-Range": "resources=0-99",
    },
  };

  const storesMD: LocationStore[] = await fetch(link, settings).then((data) => {
    return data.json();
  }).catch((error) => {
    return [
      { city: "Campinas", state: "São Paulo", uf: "SP" },
      { city: "Curitiba", state: "Paraná", uf: "PR" },
      { city: "São Paulo", state: "São Paulo", uf: "SP" },
      { city: "Belo Horizonte", state: "Minas Gerais", uf: "MG" },
      { city: "São Paulo", state: "São Paulo", uf: "SP" },
      { city: "Rio de Janeiro", state: "Rio de Janeiro", uf: "RJ" },
      { city: "Balneário Camboriú", state: "Santa Catarina", uf: "SC" },
      { city: "Fortaleza", state: "Ceará", uf: "CE" },
      { city: "Rio de Janeiro", state: "Rio de Janeiro", uf: "RJ" },
      { city: "Rio de Janeiro", state: "Rio de Janeiro", uf: "RJ" },
      { city: "Rio de Janeiro", state: "Rio de Janeiro", uf: "RJ" },
      { city: "São Carlos", state: "São Paulo", uf: "SP" },
      { city: "Rio de Janeiro", state: "Rio de Janeiro", uf: "RJ" },
      { city: "São José dos Campos", state: "São Paulo", uf: "SP" },
      { city: "Salvador", state: "Bahia", uf: "BA" },
      { city: "Guará", state: "Brasília", uf: "DF" },
      { city: "Santos", state: "São Paulo", uf: "SP" },
      { city: "Belo Horizonte", state: "Minas Gerais", uf: "MG" },
      { city: "São Paulo", state: "São Paulo", uf: "SP" },
      { city: "Ribeirão Preto", state: "São Paulo", uf: "SP" },
      { city: "Goiânia", state: "Goiás", uf: "GO" },
      { city: "Rio de Janeiro", state: "Rio de Janeiro", uf: "RJ" },
      { city: "Rio de Janeiro", state: "Rio de Janeiro", uf: "RJ" },
      { city: "São Paulo", state: "São Paulo", uf: "SP" },
      { city: "Santo André", state: "São Paulo", uf: "SP" },
      { city: "Rio de Janeiro", state: "Rio de Janeiro", uf: "RJ" },
      { city: "Campinas", state: "São Paulo", uf: "SP" },
      { city: "São Paulo", state: "São Paulo", uf: "SP" },
      { city: "São Caetano do Sul", state: "São Paulo", uf: "SP" },
      { city: "Rio de Janeiro", state: "Rio de Janeiro", uf: "RJ" },
      { city: "São Paulo", state: "São Paulo", uf: "SP" },
      { city: "São Paulo", state: "São Paulo", uf: "SP" },
      { city: "Rio de Janeiro", state: "Rio de Janeiro", uf: "RJ" },
      { city: "Barueri", state: "São Paulo", uf: "SP" },
      { city: "Recife", state: "Pernambuco", uf: null },
      { city: "Rio de Janeiro", state: "Rio de Janeiro", uf: "RJ" },
      { city: "Cuiabá", state: "Mato Grosso", uf: "MT" },
      { city: "Barueri", state: "São Paulo", uf: "SP" },
      { city: "São Paulo", state: "São Paulo", uf: "SP" },
      { city: "Vitória", state: "Espirito Santo", uf: "ES" },
      { city: "Rio de Janeiro", state: "Rio de Janeiro", uf: "RJ" },
      { city: "Rio de Janeiro", state: "Rio de Janeiro", uf: "RJ" },
      { city: "Belo Horizonte", state: "Minas Gerais", uf: "MG" },
      { city: "São Paulo", state: "São Paulo", uf: "SP" },
      { city: "Rio de Janeiro", state: "Rio de Janeiro", uf: "RJ" },
      { city: "Campo Grande", state: "Mato Grosso do Sul", uf: "MS" },
      { city: "São Paulo", state: "São Paulo", uf: "SP" },
      { city: "Niterói", state: "Rio de Janeiro", uf: "RJ" },
    ];
  });

  const states: Array<States> = [];

  storesMD.forEach((item) => {
    const state = states.find((r) => r.state === item.state);
    if (state) {
      const city = states.find((r) => r.city.find((rc) => rc === item.city));
      if (!city) {
        state.city.push(item.city);
      }
    } else {
      const citys = [];
      citys.push(item.city);
      states.push({ city: citys, state: item.state, uf: item.uf });
    }
  });

  return { data: states };
};

export default loader;
