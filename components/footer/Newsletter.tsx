import { useSignal } from "@preact/signals";
import type { JSX } from "preact";
import type { HTMLWidget } from "apps/admin/widgets.ts";
import Icon from "deco-sites/montecarlo/components/ui/Icon.tsx";

import {
  SendEventOnClick,
  SendEventOnView,
} from "../../components/Analytics.tsx";
import { useId } from "../../sdk/useId.ts";

interface Form {
  fields: Field[];
  termsAndConditions?: HTMLWidget;
  submitButtonText?: string;
}

interface Field {
  name: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  helpText?: string;
  pattern?: string;
}

interface Layout {
  bgColor?: string;
  textColor?: string;
  submitButton?: {
    bgColor?: string;
    textColor?: string;
  };
}

interface SuccessMessage {
  testSuccessMessage?: boolean;
  // testErrorMessage?: boolean;
  coupon?: {
    label?: string;
    code?: string;
    description?: string;
  };
  links?: {
    label: string;
    href: string;
  }[];
}

export interface Props {
  title?: string;
  description?: string;
  successMessage?: SuccessMessage;
  form?: Form;
  layout?: Layout;
  viewMessage?: true;
}

function Newsletter({
  title = "Que bom que você veio!",
  description =
    "Preparamos um presente especial pra você brilhar na sua primeira compra com 10% off. E fique por dentro das novidades e ofertas valiosas em primeira mão na nossa lista VIP.",
  form = {
    fields: [{
      name: "nome",
      type: "text",
      placeholder: "nome",
      required: true,
      helpText: "",
      pattern: "",
    }, {
      name: "e-mail",
      type: "email",
      placeholder: "e-mail",
      required: true,
      helpText: "",
      pattern: "",
    }],
    termsAndConditions:
      "Li e concordo com os <a href='#termos'>Termos e Condições</a>, e com a <a href='#politica'>Política de privacidade</a> da Monte Carlo.",
    submitButtonText: "Cadastrar",
  },
  layout = {
    bgColor: "#CAC7B6",
    textColor: "#000",
    submitButton: {
      bgColor: "#FFC72C",
      textColor: "#000",
    },
  },
  successMessage,
}: Props) {
  const loading = useSignal(false);

  const emailFounded = useSignal(false);
  const registered = useSignal(successMessage?.testSuccessMessage || false);
  const registeredError = useSignal(false);

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;

      const fields = form.fields.map((field) => field.name);

      const formData: { [key: string]: string | boolean } = {};

      for (const field of fields) {
        const input = e.currentTarget.elements.namedItem(
          field,
        ) as RadioNodeList;
        formData[field] = input.value;
      }

      if (form.termsAndConditions) {
        formData["termsAndConditions"] = (e.currentTarget.elements.namedItem(
            "termsAndConditions",
          ) as RadioNodeList)?.value === "true"
          ? true
          : false;
      }

      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
      const day = ("0" + currentDate.getDate()).slice(-2);

      formData["creation_date"] = `${year}-${month}-${day}`;

      formData["page"] = "lead_newsletter_footer";

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
            registered.value = true;

            if (vtexNewsletter.status === 404 && leadsMktCloud.status === 404) {
              registeredError.value = true;
            } else {
              registeredError.value = false;
            }
          }
        } else if (emailAlreadyExists.data) {
          emailFounded.value = true;
        }
      }
    } finally {
      loading.value = false;
    }
  };

  const termsAndConditionsCheckBox = (
    <div>
      <label
        class="relative flex items-center rounded-full cursor-pointer"
        htmlFor="termsAndConditions"
      >
        <input
          type="checkbox"
          class="peer relative h-5 w-5 cursor-pointer appearance-none border-2 transition-all checked:border-[#FFC72C] checked:bg-[#FFC72C]"
          name="termsAndConditions"
          checked={false}
          value="true"
          required
        />
        <span class="absolute text-black transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-3.5 w-3.5"
            viewBox="0 0 20 20"
            fill="currentColor"
            stroke="currentColor"
            stroke-width="1"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            >
            </path>
          </svg>
        </span>
      </label>
    </div>
  );

  const id = useId();

  return (
    <div
      class="px-5 py-10"
      id={id}
      style={{ backgroundColor: layout.bgColor, color: layout.textColor }}
    >
      <div class="flex flex-col items-center container gap-5 lg:gap-7 max-w-[700px]">
        {registered.value === true ? null : (
          <>
            <div class="flex flex-col gap-1 px-4 font-poppins text-center max-w-[660px]">
              <h3 class="text-xl lg:text-2xl font-semibold">{title}</h3>
              <p class="text-sm font-medium">{description}</p>
            </div>
            <form
              onSubmit={handleSubmit}
              class="flex flex-col gap-5 items-center font-poppins w-full"
            >
              <div class="flex flex-col lg:flex-row items-start gap-2.5 lg:gap-2 w-full">
                {form.fields.map((field) => (
                  <label
                    for={field.name}
                    class="flex flex-col gap-1 flex-1 w-full"
                  >
                    <input
                      class={`flex-1 p-3 text-xs placeholder-black font-medium peer focus:outline-none ${
                        (field.name === "email" && emailFounded.value === true)
                          ? "border border-red-500"
                          : ""
                      }`}
                      name={field.name}
                      type={field.type}
                      placeholder={field.placeholder}
                      required={field.required}
                      pattern={field.pattern}
                    />
                    <span
                      class={`hidden text-xs text-red-500 ${
                        (field.name === "email" && emailFounded.value === true)
                          ? "!block"
                          : "peer-[&:not(:placeholder-shown):not(:focus):invalid]:block"
                      }`}
                    >
                      {field.name === "email" && emailFounded.value === true
                        ? "E-mail já cadastrado."
                        : field.helpText}
                    </span>
                  </label>
                ))}
              </div>

              <div class="flex flex-col lg:flex-row gap-5 lg:gap-2.5 w-full">
                {form.termsAndConditions &&
                  (
                    <div class="flex flex-1 lg:items-center gap-3">
                      {termsAndConditionsCheckBox}
                      <label
                        for="termsAndConditions"
                        class="flex-1 text-xs"
                        dangerouslySetInnerHTML={{
                          __html: form.termsAndConditions
                            ? form.termsAndConditions
                            : "",
                        }}
                      />
                    </div>
                  )}

                <div class="flex flex-1 self-center">
                  <input
                    class="w-fit text-sm p-3.5 cursor-pointer disabled:loading hover:opacity-80"
                    style={{
                      backgroundColor: layout?.submitButton?.bgColor,
                      color: layout?.submitButton?.textColor,
                    }}
                    type="submit"
                    value={form.submitButtonText}
                    disabled={loading}
                  />
                </div>
              </div>
            </form>
          </>
        )}

        <div class={`${registered.value === true ? "" : "hidden"}`}>
          <div class="flex w-fit flex-col justify-center items-center gap-4 font-poppins">
            {registeredError.value === true
              ? (
                <div class="flex flex-col gap-2 justify-center items-center">
                  <span class="text-red-500">
                    Houve um erro ao cadastrar o email.
                  </span>
                  <span class="text-red-500">
                    Verifique se você já é cadastrado.
                  </span>
                  <button
                    class="underline"
                    onClick={() => {
                      registeredError.value = false;
                      registered.value = false;
                    }}
                  >
                    Tente novamente
                  </button>
                </div>
              )
              : (
                <>
                  <span>Obrigado!</span>

                  <div class="flex gap-2">
                    <div>
                      <svg
                        width="30"
                        height="29"
                        viewBox="0 0 39 38"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19.5 0C9.012 0 0.5 8.512 0.5 19C0.5 29.488 9.012 38 19.5 38C29.988 38 38.5 29.488 38.5 19C38.5 8.512 29.988 0 19.5 0ZM15.7 28.5L6.2 19L8.879 16.321L15.7 23.123L30.121 8.702L32.8 11.4L15.7 28.5Z"
                          fill="#CAAF8A"
                        >
                        </path>
                      </svg>
                    </div>
                    <span>E-mail cadastrado com sucesso</span>
                  </div>
                  {successMessage?.coupon?.label
                    ? (
                      <div class="flex flex-col gap-2 justify-center items-center">
                        <span>Use o cupom</span>
                        <button
                          class="bg-[#333435] hover:bg-black py-2 px-6 text-[#F6F8F9] uppercase font-semibold flex gap-2 justify-center items-center"
                          onClick={() => {
                            navigator.clipboard.writeText(
                              successMessage?.coupon?.code || "",
                            );
                          }}
                        >
                          {successMessage?.coupon?.label}
                          <Icon id="FileCopy" size={18} />
                        </button>
                        {successMessage?.coupon?.description
                          ? <span>{successMessage?.coupon?.description}</span>
                          : null}
                      </div>
                    )
                    : null}

                  {successMessage?.links && successMessage?.links?.length > 0
                    ? successMessage.links.map((link, index) => {
                      return (
                        <a
                          key={index}
                          target="_blank"
                          class="underline text-sm"
                          href={link.href}
                        >
                          {link.label}
                        </a>
                      );
                    })
                    : null}
                </>
              )}
          </div>
        </div>
      </div>
      {
        /* <SendEventOnView
        id={id}
        event={{
          name: "view_promotion",
          params: {
            creative_name: title,
            creative_slot: id,
            promotion_id: id,
            promotion_name: title,
            items: [],
          },
        }}
      /> */
      }
    </div>
  );
}

export default Newsletter;
