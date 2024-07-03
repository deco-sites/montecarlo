import { useRef } from "preact/compat";
import { invoke } from "deco-sites/montecarlo/runtime.ts";
import { useState } from "preact/hooks";
import { useUI } from "deco-sites/montecarlo/sdk/useUI.ts";

interface PropsNewsletterPopup {
  /*
   * @description Titulo do popup
   */
  title?: string;
  /*
   * @description ativar campo de telefone
   */
  phone?: boolean;
  /*
   * @description primeiro texto
   */
  primaryMessageSucess?: string;
  /*
   * @description Nome do cupom
   */
  cupom?: string;
  /*
   * @description texto abaixo do cupom
   */
  secordMessageSucess?: string;
  /*
   * @description Texto acima do CTA
   */
  thirdMessageSucess?: string;
}

const NewsletterPopupForm = ({
  title,
  phone,
  primaryMessageSucess,
  cupom,
  secordMessageSucess,
  thirdMessageSucess,
}: PropsNewsletterPopup) => {
  const refName = useRef<HTMLInputElement>(null);
  const refEmail = useRef<HTMLInputElement>(null);
  const refPhone = useRef<HTMLInputElement>(null);
  const refCheckbox = useRef<HTMLInputElement>(null);

  const [newsletterConfirm, setNewsletterConfirm] = useState(true); //inicia como true
  const [userExists, setUserExists] = useState(false); //inicia como false

  const { showPopup } = useUI();

  const getCurrentDate = () => {
    const dataAtual = new Date();
    const ano = dataAtual.getFullYear();
    const mes = ("0" + (dataAtual.getMonth() + 1)).slice(-2);
    const dia = ("0" + dataAtual.getDate()).slice(-2);
    return `${ano}-${mes}-${dia}`;
  };

  const sandForm = async () => {
    console.log("click");
    if (refName.current && refEmail.current && refCheckbox.current) {
      console.log("validado");
      try {
        const ras = await invoke[
          "deco-sites/montecarlo"
        ].actions.newsletter.sendForm({
          name: refName.current.value,
          email: refEmail.current.value,
          dataCreate: getCurrentDate(),
        });

        console.log("Resposta da API:", ras);

        if (ras.status === "success") {
          setNewsletterConfirm(true);
          console.log("Enviado com sucesso");
        } else if (ras.status === "user_exists") {
          console.log("Já existe");
          setUserExists(true);
        } else {
          console.log("Erro inesperado:", ras);
        }
      } catch (error) {
        console.log("Erro na requisição:", error);
        setUserExists(true);
      }
    }
  };

  return (
    <div class="max-w-[380px] md:w-full bg-[#FFC72C] flex flex-col items-center self-center px-4 py-12 md:p-16 relative h-[480px]">
      <button
        class="absolute top-1 right-2 text-[#F8F7F3] font-bold"
        onClick={() => {
          showPopup.value = false;
        }}
      >
        ✕
      </button>
      {newsletterConfirm && !userExists
        ? (
          <>
            <h1 class="text-3xl font-bold text-center text-black mb-4 px-8">
              {title ? title : "10% OFF DE PRESENTE"}
              {" "}
            </h1>
            <p class="text-black mb-4 text-center text-sm">
              Muito bom te ver por aqui!
              <br />
              Cadastre-se pra brilhar na sua primeira compra e acompanhar nossas
              novidades.
            </p>
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
                <label
                  for="terms"
                  class="text-xs text-black ml-2 text-left pl-2"
                >
                  Li e concordo com os Termos e Condições, e com a Política de
                  Privacidade de Monte Carlo
                </label>
              </div>
              <button
                onClick={() => {
                  sandForm();
                  setUserExists(true);
                  setNewsletterConfirm(false);
                }}
                type="button"
                class="min-w-24 flex m-auto bg-[#F5F3E7] text-black py-2 px-3 text-sm text-center justify-center items-center"
              >
                Cadastrar
              </button>
            </form>
          </>
        )
        : (
          <>
            {userExists
              ? (
                <>
                  <div class="">
                    <p class="text-xl text-black font-bold ml-2 text-center m-auto">
                      Obrigado!
                      <br />
                      E-mail cadastrado com sucesso.
                    </p>
                    {primaryMessageSucess
                      ? (
                        <p class="text-base text-black text-center m-auto my-2">
                          {primaryMessageSucess}
                        </p>
                      )
                      : null}
                    {cupom
                      ? (
                        <p
                          onClick={() => {
                            navigator.clipboard.writeText(cupom || "");
                          }}
                          class="text-3xl text-black text-center m-auto my-2 borde border-dashed border-2 border-black p-2 cursor-pointer"
                        >
                          <strong className="text-black">
                            {cupom}
                          </strong>
                        </p>
                      )
                      : null}
                    {secordMessageSucess
                      ? (
                        <p class="text-lg text-black text-center m-auto my-2">
                          {secordMessageSucess}
                        </p>
                      )
                      : null}
                    {thirdMessageSucess
                      ? (
                        <p class="text-xs text-black text-center m-auto my-2">
                          {thirdMessageSucess}
                        </p>
                      )
                      : null}
                    <a
                      class="flex justify-center text-sm text-black text-center m-auto my-2"
                      href="https://montecarlojoias.zendesk.com/hc/pt-br/articles/360041259091-Conhe%C3%A7a-as-regras-Cupons-e-Promo%C3%A7%C3%B5es-"
                      target="_blank"
                    >
                      Saiba Mais.
                    </a>
                  </div>
                </>
              )
              : <></>}
          </>
        )}
    </div>
  );
};

export default NewsletterPopupForm;
