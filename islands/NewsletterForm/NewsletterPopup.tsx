import { useRef } from "preact/compat";
import { invoke } from "deco-sites/montecarlo/runtime.ts";
import { useState } from "preact/hooks";
import { useUI } from "deco-sites/montecarlo/sdk/useUI.ts";
import { useSignal } from "@preact/signals";
import type { JSX } from "preact";

interface PropsNewsletterPopup {
  /*
   * @description Titulo do popup
   */
  title?: string;
  /*
  * @description Descrição do popup
  */
    description?: string;
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
  description,
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
  const emailFounded = useSignal(false);
  const registered = useSignal(false);
  const registeredError = useSignal(false);
  const loading = useSignal(false);

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
    if (refName.current?.value !== "" && refEmail.current?.value !=="" && refCheckbox.current?.value !== "") {
      console.log("validado");
      try {
        const ras = await invoke[
          "deco-sites/montecarlo"
        ].actions.newsletter.sendForm({
          name: refName.current?.value ? refName.current.value : "",
          email: refEmail.current?.value ? refEmail.current.value : "",
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

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;

      const fields = ["name", "email", "phone"];

      const formData: { [key: string]: string | boolean } = {};

      for (const field of fields) {
        const input = e.currentTarget.elements.namedItem(
          field,
        ) as RadioNodeList;
        formData[field] = input?.value;
      }

      
      formData["termsAndConditions"] = (e.currentTarget.elements.namedItem(
          "termsAndConditions",
        ) as RadioNodeList)?.value === "true"
        ? true
        : false;
      

      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
      const day = ("0" + currentDate.getDate()).slice(-2);

      formData["creation_date"] = `${year}-${month}-${day}`;

      formData["page"] = "lead_newsletter_popup";

      const emailAlreadyExists = await fetch(
        "https://mid--montecarlo.myvtex.com/_v/newsletter?email=" +
          formData.email,
      )
        .then((response) => {
          return response.json();
        })
        .catch((error) => {
          console.error(error);
          return error;
        });
      if (emailAlreadyExists) {
        if (emailAlreadyExists.status === 404) {
          const leadsMktCloud = await fetch(
            "https://rckmiddleware--montecarlo.myvtex.com/_v/register-leads-mkt-cloud",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            },
          )
            .then((response) => {
              return response.json();
            })
            .catch((error) => {
              console.error(error);
              return false;
            });

          const vtexNewsletter = await fetch(
            "https://mid--montecarlo.myvtex.com/_v/newsletter",
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: formData.email,
                firstName: formData.name,
                termsofuse: formData.termsAndConditions,
              }),
            },
          )
            .then((response) => {
              return response.json();
            })
            .catch((error) => {
              console.error(error);
              return false;
            });

          if (vtexNewsletter || leadsMktCloud) {
            // registered.value = true;
            if (vtexNewsletter.status === 404 && leadsMktCloud.status === 404) {
              registeredError.value = true;
            } 
            else {
              setUserExists(true);
              registered.value = true;
              registeredError.value = false;
            }
          }
        } else if (emailAlreadyExists.data) {
            // emailFounded.value = true;
            registeredError.value = true;
        }
      }
    } finally {
      loading.value = false;
    }
  };

  return (
    <div class="max-w-[380px] md:w-full bg-[#FFC72C] flex flex-col items-center self-center px-4 py-12 md:p-16 relative">
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
            {
              title ? (
                <h1 class="text-3xl font-bold text-center text-black mb-4 px-8">
                  {title}
                </h1>
              ) : null
            }
            {
              description ? (
                <p class="text-black mb-4 text-center text-sm" dangerouslySetInnerHTML={{__html: description}} />
              ) : null
            }
            <form
              class="space-y-4"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                name="name"
                placeholder="Nome"
                class="w-full text-[12px] px-4 py-2 border border-[#F5F3E7] bg-[#F5F3E7] focus:outline-none"
                style="width: 346px; height: 40px;"
                required={true}
                // ref={refName}
              />
              <input
                type="email"
                name="email"
                placeholder="e-mail"
                class="w-full text-[12px] px-4 py-2 border border-[#F5F3E7] bg-[#F5F3E7] focus:outline-none"
                style="width: 346px; height: 40px;"
                required={true}
                // ref={refEmail}
              />
              {phone && (
                <input
                  type="tel"
                  name="phone"
                  placeholder="Telefone"
                  class="w-full text-[12px] px-4 py-2 border border-[#F5F3E7] bg-[#F5F3E7] focus:outline-none"
                  style="width: 346px; height: 40px;"
                  required={true}
                  // ref={refPhone}
                />
              )}
              {
                registeredError.value === true ? (
                  <span class={`text-red-500 text-sm mt-2 leading-none`}>
                    Email já cadastrado
                  </span>
                ) : null
              }
              <div class="flex items-center">
                <input
                  type="checkbox"
                  id="terms"
                  name="termsAndConditions"
                  class="form-checkbox h-5 w-5 text-yellow-500 rounded-none bg-transparent border-white"
                  required={true}
                  // ref={refCheckbox}
                />
                <label
                  for="terms"
                  class="text-xs text-black ml-2 text-left pl-2"
                >
                  Li e concordo com os Termos e Condições, e com a Política de
                  Privacidade de Monte Carlo
                </label>
              </div>
              <input
                // onClick={() => {
                //   // sandForm();
                //   // setUserExists(true);
                //   // setNewsletterConfirm(false);
                // }}
                type="submit"
                value="Cadastrar"
                class="min-w-24 flex m-auto bg-[#F5F3E7] text-black py-2 px-3 text-sm text-center justify-center items-center cursor-pointer hover:opacity-80"
                disabled={loading}
              />
            </form>
          </>
        )
        : (
          <>
            {registered.value === true
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
