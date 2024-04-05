import { useSignal } from "@preact/signals";
import type { JSX } from "preact";
import type { HTMLWidget } from "apps/admin/widgets.ts";

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

export interface Props {
  title?: string;
  description?: string;
  form?: Form;
  layout?: Layout;
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
}: Props) {
  const loading = useSignal(false);

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

      // if (form.termsAndConditions) {
      //   formData["termsAndConditions"] = (e.currentTarget.elements.namedItem("termsAndConditions") as RadioNodeList)?.value === "true" ? true : false;
      // }

      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
      const day = ("0" + currentDate.getDate()).slice(-2);

      formData["creation_date"] = `${year}-${month}-${day}`;

      formData["page"] = "lead_newsletter_footer";

        const emailAlreadyExists = await fetch("https://mid--montecarlo.myvtex.com/_v/newsletter?email=" + formData.email)
          .then((response) => {
            return response.json();
          })
          .catch((error) => {
            console.error(error);
            return error;
          });
          if (emailAlreadyExists) {

            if (emailAlreadyExists.status === 404) {
              await fetch(
                "https://rckmiddleware--montecarlo.myvtex.com/_v/register-leads-mkt-cloud",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(formData),
                }
              )
                .then((response) => {
                  return response.json();
                })
                .catch((error) => {
                  console.error(error);
                });

              await fetch(
                "https://mid--montecarlo.myvtex.com/_v/newsletter",
                {
                  method: "PATCH",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    email: formData.email,
                    firstName: formData.name
                  }),
                }
              )
                .then((response) => {
                  return response.json();
                })
                .catch((error) => {
                  console.error(error);
                });
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

  return (
    <div
      class="px-5 py-10"
      style={{ backgroundColor: layout.bgColor, color: layout.textColor }}
    >
      <div class="flex flex-col items-center container gap-5 lg:gap-7 max-w-[700px]">
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
              <label for={field.name} class="flex flex-col gap-1 flex-1 w-full">
                <input
                  class="flex-1 p-3 text-xs placeholder-black font-medium peer focus:outline-none"
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  required={field.required}
                  pattern={field.pattern}
                />
                <span class="hidden text-xs text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                  {field.helpText}
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
                class="w-fit text-sm p-3.5 cursor-pointer disabled:loading"
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
      </div>
    </div>
  );
}

export default Newsletter;
