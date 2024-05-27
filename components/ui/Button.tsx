import { forwardRef } from "preact/compat";
import type { JSX } from "preact";
import {
  SendEventOnClick,
  SendEventOnView,
} from "../../components/Analytics.tsx";
import { useId } from "../../sdk/useId.ts";

export type Props =
  & Omit<JSX.IntrinsicElements["button"], "loading">
  & {
    loading?: boolean;
    ariaLabel?: string;
  };

const Button = forwardRef<HTMLButtonElement, Props>(({
  type = "button",
  class: _class = "",
  loading,
  disabled,
  ariaLabel,
  children,
  ...props
}, ref) => {
  const id = useId();

  return (
    <button
      {...props}
      className={` no-animation ${_class}`}
      disabled={disabled || loading}
      aria-label={ariaLabel || props["aria-label"]}
      type={type}
      ref={ref}
    >
      {loading ? <span class="loading loading-spinner" /> : children}
      <SendEventOnClick
        id={id}
        event={{
          name: "select_promotion",
          params: {
            item_list_name: ariaLabel,
            item_list_id: id,
            promotion_name: ariaLabel,
          },
        }}
      />
    </button>
  );
});

export default Button;
