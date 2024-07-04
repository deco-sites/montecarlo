import { useSignal } from "@preact/signals";
import { ComponentChildren } from "preact";
import { useEffect } from "preact/hooks";
import { useId } from "deco-sites/montecarlo/sdk/useId.ts";

interface Props {
  onClose?: () => void;
  open?: boolean;
  class?: string;
  loading?: "eager" | "lazy";
  children: ComponentChildren;
  aside: ComponentChildren;
  id?: string;
}

function Drawer(props: Props) {
  const {
    children,
    aside,
    open,
    onClose,
    class: _class = "",
    loading = "lazy",
    id = useId(),
  } = props;
  const lazy = useSignal(loading === "lazy" && !open); // false

  useEffect(() => {
    const handler = (e: KeyboardEvent) =>
      (e.key === "Escape" || e.keyCode === 27) && open && onClose?.();

    addEventListener("keydown", handler);

    return () => {
      removeEventListener("keydown", handler);
    };
  }, [open]);

  useEffect(() => {
    lazy.value = false;
  }, []);

  console.log("lazy ", id, !lazy.value)

  return (
    <div class={`drawer ${_class}`}>
      <input
        id={id}
        checked={open}
        type="checkbox"
        class="drawer-toggle"
        onChange={(e) => e.currentTarget.checked === false && onClose?.()}
        aria-label={open ? "open drawer" : "closed drawer"}
      />

      <div class="drawer-content">
        {children}
      </div>

      <aside class="drawer-side h-full overflow-hidden z-[100]">
        <label for={id} class="drawer-overlay" />
        {!lazy.value && aside}
      </aside>
    </div>
  );
}

export default Drawer;
