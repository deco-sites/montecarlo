import type { HTMLWidget } from "apps/admin/widgets.ts";
import Newsletter from "../../islands/Newsletter.tsx";

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
  /*
   * @description Enable this option only for testing purpose. Don't forget to disable before publish
   */
  testSuccessMessage?: boolean;
  // testErrorMessage?: boolean;
  coupon?: {
    label?: string;
    code?: string;
    description?: string;
  }
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
}

export default function NewsletterSection({
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
  return (
    <Newsletter
      title={title}
      description={description}
      form={form}
      layout={layout}
      successMessage={successMessage}
    />
  );
}
