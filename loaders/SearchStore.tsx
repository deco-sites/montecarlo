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
