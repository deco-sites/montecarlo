export { default, loader } from "../../components/product/ShelfCollection.tsx";

export function LoadingFallback() {
  return (
    <div style={{ height: "480px" }} class="flex justify-center items-center">
      <span class="loading loading-spinner" />
    </div>
  );
}
