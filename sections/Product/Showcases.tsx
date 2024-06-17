export { default } from "../../components/product/Showcases.tsx";

export function LoadingFallback() {
  return (
    <div style={{ height: "800px" }} class="flex justify-center items-center">
      <span class="loading loading-spinner" />
    </div>
  );
}
