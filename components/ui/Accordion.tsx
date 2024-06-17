import Icon from "deco-sites/montecarlo/components/ui/Icon.tsx";

interface Props {
  title: string;
  titleClass?: string;
  borderColor?: string;
  chevronColor?: string;
  children?: preact.ComponentChildren;
  open?: boolean;
}

export default function Accordion(props: Props) {
  return (
    <details class="group" open={props.open}>
      <summary
        class={`flex cursor-pointer items-center justify-between border-b capitalize
           border-${
          props.borderColor ? props.borderColor : "black"
        } py-4 opacity-100  group-open:border-b-[#AAA89C] `}
      >
        <h3
          dangerouslySetInnerHTML={{ __html: props.title }}
          class={props.titleClass}
        >
        </h3>
        <Icon
          class=" transform transition-transform -rotate-90 group-open:rotate-90 group-open:text-[#AAA89C]"
          size={24}
          id="arrowTop"
        >
        </Icon>
      </summary>
      <div class="py-4 lg:py-6">
        {props.children}
      </div>
    </details>
  );
}

function ArrowSVG({ fill }: { fill?: string }) {
  return (
    <svg
      class="w-4 h-auto transform transition-transform -rotate-90 group-open:rotate-45 group-open:text-[#AAA89C]"
      width="17"
      height="9"
      viewBox="0 0 17 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill={fill ? fill : "#000000"}
        d="M0.133964 8.60652L0.403389 8.86936C0.581962 9.04355 0.871507 9.04355 1.05012 8.86936L8.50002 1.60259L15.9499 8.86936C16.1285 9.04355 16.418 9.04355 16.5966 8.86936L16.8661 8.60652C17.0446 8.43233 17.0446 8.14991 16.8661 7.97572L8.82336 0.130639C8.64479 -0.0435468 8.35524 -0.0435468 8.17663 0.130639L0.133926 7.97572C-0.0446495 8.14991 -0.0446495 8.43233 0.133964 8.60652Z"
      />
    </svg>
  );
}
