import { useRef } from "preact/compat";
import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { invoke } from "deco-sites/montecarlo/runtime.ts";

interface States {
  city: string[];
  state?: string;
  uf: string;
}

interface Data {
  data: States[];
}

export interface Props {
  placeholderState?: string;
  placeholderCity?: string;
  button?: string;
  searchStore?: States[];
}

export default function Select(
  { placeholderCity, button, searchStore, placeholderState }: Props,
) {
  const city = useRef<HTMLSelectElement>(null);
  const state = useRef<HTMLSelectElement>(null);
  const obj = useSignal<States | undefined>(undefined);

  function Storange() {
    const obj = {
      selectedState: state.current?.value,
      selectedCity: city.current?.value,
    };
    localStorage.setItem("findStoresCity", JSON.stringify(obj));
  }

  if (!searchStore) {
    return null;
  }

  return (
    <>
      <select
        onChange={(event) => {
          const selectedState = event?.currentTarget.value;
          const states = searchStore?.find((r) => r.state === selectedState);
          console.log("change", states);
          obj.value = states;
          if (city.current) {
            city.current.disabled = false;
          }
        }}
        className="select select-bordered w-full  bg-primary border-b text-sm outline-none pl-2 "
        style={{
          border: "none",
          borderBottom: "1px solid black",
          borderRadius: "0px",
        }}
      >
        <option disabled selected>{placeholderState}</option>
        {searchStore?.map((item) => (
          <option class="bg-white" value={item.state}>
            {item.state}
          </option>
        ))}
      </select>
      <select
        ref={city}
        disabled
        className="select select-bordered w-full bg-primary border-b text-sm  outline-none disabled:opacity-1 disabled:bg-primary pl-2"
        style={{
          border: "none",
          borderBottom: "1px solid black",
          borderRadius: "0px",
        }}
      >
        <option disabled selected>{placeholderCity}</option>
        {obj.value?.city.map((item) => (
          <option class="bg-white" value={item}>{item}</option>
        ))}
      </select>

      {/*<button
        type="button"
        class="mt-6  bg-[#F5F3E7] px-[10px] py-[14px] text-xs"
        onClick={Storange}
      >
        {button}
      </button>
      */}

      <a href={'/nossas-lojas'} class="mt-6 bg-[#F5F3E7] px-[10px] py-[14px] text-xs">{button}</a>
    </>
  );
}
