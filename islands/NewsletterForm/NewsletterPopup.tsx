import { useRef } from "preact/compat";
import { invoke } from "deco-sites/montecarlo/runtime.ts";

const NewsletterPopupForm = ({ phone }: { phone?: boolean }) => {
  const refName = useRef<HTMLInputElement>(null);
  const refEmail = useRef<HTMLInputElement>(null);
  const refPhone = useRef<HTMLInputElement>(null);
  const refCheckbox = useRef<HTMLInputElement>(null);

  const getCurrentDate = () => {
    const dataAtual = new Date();

    const ano = dataAtual.getFullYear();
    const mes = ("0" + (dataAtual.getMonth() + 1)).slice(-2); // Os meses são indexados a partir de zero
    const dia = ("0" + dataAtual.getDate()).slice(-2);

    const dataFormatada = ano + "-" + mes + "-" + dia;

    return dataFormatada;
  };

  const sandForm = async () => {
    console.log("click");
    if (refName.current && refEmail.current && refCheckbox.current) {
      console.log("validado");
      const ras = await invoke[
        "deco-sites/montecarlo"
      ].actions.newsletter.sendForm({
        name: refName.current.value,
        email: refEmail.current.value,
        dataCreate: getCurrentDate(),
      });
      console.log(ras);
    }
  };

  return (
    <form class="space-y-4">
      <input
        type="text"
        placeholder="Nome"
        class="w-full text-[12px] px-4 py-2 border border-[#F5F3E7] bg-[#F5F3E7] focus:outline-none"
        style="width: 346px; height: 40px;"
        ref={refName}
      />
      <input
        type="email"
        placeholder="e-mail"
        class="w-full text-[12px] px-4 py-2 border border-[#F5F3E7] bg-[#F5F3E7] focus:outline-none"
        style="width: 346px; height: 40px;"
        ref={refEmail}
      />
      {phone && (
        <input
          type="tel"
          placeholder="Telefone"
          class="w-full text-[12px] px-4 py-2 border border-[#F5F3E7] bg-[#F5F3E7] focus:outline-none"
          style="width: 346px; height: 40px;"
          ref={refPhone}
        />
      )}
      <div class="flex items-center">
        <input
          type="checkbox"
          id="terms"
          class="form-checkbox h-5 w-5 text-yellow-500 rounded-none bg-transparent border-white"
          ref={refCheckbox}
        />
        <label for="terms" class="text-xs text-black ml-2 text-left pl-2">
          Li e concordo com os Termos e Condições, e com a Política de
          Privacidade de Monte Carlo
        </label>
      </div>
      <button
        onClick={() => sandForm()}
        type="button"
        class="min-w-24 flex m-auto bg-[#F5F3E7] text-black py-2 px-3 text-sm text-center"
      >
        Cadastrar
      </button>
    </form>
  );
};

export default NewsletterPopupForm;
