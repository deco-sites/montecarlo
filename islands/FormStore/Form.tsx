import Component from "../../components/footer/Form.tsx";
import type { Props } from "../../components/footer/Form.tsx";

export default function Island(
  { placeholderCity, button, searchStore, placeholderState }: Props,
) {
  return (
    <Component
      placeholderCity={placeholderCity}
      placeholderState={placeholderState}
      button={button}
      searchStore={searchStore}
    />
  );
}
