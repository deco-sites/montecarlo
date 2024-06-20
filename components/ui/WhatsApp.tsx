import ButtonWhatsapp from "deco-sites/montecarlo/islands/WhatsAppButton/WhatsApp.tsx";

export interface Props {
  comercialTimeNumber: string;
  notComercialTimeNumber: string;
}

function WhatsApp({ comercialTimeNumber, notComercialTimeNumber }: Props) {
  return (
    <ButtonWhatsapp
      comercialTimeNumber={comercialTimeNumber}
      notComercialTimeNumber={notComercialTimeNumber}
    />
  );
}

export default WhatsApp;
