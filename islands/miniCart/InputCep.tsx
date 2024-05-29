import Component from "deco-sites/montecarlo/components/minicart/common/inputCep.tsx";
import type { Props } from "deco-sites/montecarlo/components/minicart/common/inputCep.tsx";

export default function Islands(props: Props) {
  return <Component orderFormId={props.orderFormId} items={props.items} />;
}
