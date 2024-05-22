import Button from "../../../components/ui/Button.tsx";
import Icon from "../../../components/ui/Icon.tsx";
import { useUI } from "../../../sdk/useUI.ts";
import { useRef } from "preact/compat";

export default function SearchButton() {
  const { displaySearchDrawer, displaySearchPopup } = useUI();
  const refSearch = useRef<HTMLButtonElement>(null);

  function actiiveSearch() {
    displaySearchDrawer.value = !displaySearchDrawer.value;
    if (refSearch.current) {
      refSearch.current.disabled = displaySearchDrawer.value;
    }
  }

  return (
    <>
      <Button
        class="btn-circle btn-sm btn-ghost hidden sm:flex"
        aria-label="search icon button"
        onClick={() => {
          displaySearchPopup.value = !displaySearchPopup.value;
        }}
      >
        <Icon id="MagnifyingGlass" size={20} strokeWidth={0.1} />
      </Button>
      <Button
        class="btn-circle btn-sm btn-ghost sm:hidden disabled:hidden"
        aria-label="search icon button"
        data="search-icon"
        ref={refSearch}
        onClick={() => actiiveSearch()}
      >
        <Icon id="MagnifyingGlass" size={20} strokeWidth={0.1} />
      </Button>
    </>
  );
}
