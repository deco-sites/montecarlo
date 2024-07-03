import Button from "../../../components/ui/Button.tsx";
import Icon from "../../../components/ui/Icon.tsx";
import { useUI } from "../../../sdk/useUI.ts";
import { useRef } from "preact/compat";

export default function SearchButton() {
  const { displaySearchDrawer, displaySearchPopup, activeS } = useUI();
  const refSearch = useRef<HTMLButtonElement>(null);
  const refClose = useRef<HTMLButtonElement>(null);

  function actiiveSearch() {
    displaySearchDrawer.value = !displaySearchDrawer.value;
    activeS.value = !activeS.value;
    if (refSearch.current && refClose.current) {
      refSearch.current.disabled = displaySearchDrawer.value;
      refClose.current.disabled = !displaySearchDrawer.value;
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
        class="btn-circle btn-sm btn-ghost sm:hidden disabled:hidden flex justify-center items-center w-auto"
        aria-label="search icon button"
        disabled
        data="search-icon"
        ref={refSearch}
        onClick={() => actiiveSearch()}
      >
        <Icon id="SearchIcon" size={22} strokeWidth={0.05} />
      </Button>
      <Button
        class="btn-circle btn-sm btn-ghost sm:hidden disabled:hidden flex justify-center items-center w-auto"
        aria-label="search icon button close"
        data="search-icon-close"
        disabled
        ref={refClose}
        onClick={() => actiiveSearch()}
      >
        <Icon id="Close" size={22} strokeWidth={0.05} />
      </Button>
    </>
  );
}
