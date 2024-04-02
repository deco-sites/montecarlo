export interface Props {
  title?: string;
  placeholderState?: string;
  placeholderCity?: string;
  button?: string;
}

export default function FormStore({ formState }: { formState?: Props }) {
  return (
    <form class="w-full flex-col flex items-center lg:items-start font-semibold text-sm">
      <h4 class="mb-6">
        {formState?.title}
      </h4>
      <select
        className="select select-bordered w-full max-w-xs bg-primary border-b pl-0 text-sm outline-none"
        style={{
          border: "none",
          borderBottom: "1px solid black",
          borderRadius: "0px",
        }}
      >
        <option disabled selected>{formState?.placeholderState}</option>
        <option>Han Solo</option>
        <option>Greedo</option>
      </select>
      <select
        className="select select-bordered w-full max-w-xs bg-primary border-b pl-0 text-sm  outline-none"
        style={{
          border: "none",
          borderBottom: "1px solid black",
          borderRadius: "0px",
        }}
      >
        <option disabled selected>{formState?.placeholderCity}</option>
        <option>Han Solo</option>
        <option>Greedo</option>
      </select>

      <button
        type={"submit"}
        class="mt-6  bg-[#F5F3E7] px-[10px] py-[14px] text-xs"
      >
        {formState?.button}
      </button>
    </form>
  );
}
