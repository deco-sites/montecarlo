export { default } from "../../components/ui/TrioOfImagesAndProducts.tsx";

export function LoadingFallback() {
  return (
    <div style={{ height: "580px" }} class="flex justify-center items-center">
      <span class="loading loading-spinner" />
    </div>
  );
}
