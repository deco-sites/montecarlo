import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import NewsletterPopupForm from "../../islands/NewsletterForm/NewsletterPopup.tsx";
import ClosedPopup from "../../islands/NewsletterForm/ButtonClosePopup.tsx";

interface PropsNewsletterPopup {
  /*
   * @description Titulo do popup
   */
  title?: string;
  /*
   * @description imagem do popup
   */
  image: ImageWidget;
  /*
   * @description legenda da imagem
   */
  alt?: string;
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

function NewsletterPopup({ title, image, alt, phone }: PropsNewsletterPopup) {

  return (
    <>
      <ClosedPopup>
        <div class="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50" style="background: hsla(0, 0%, 0%, 0.5);">
          <div
            class="bg-white shadow-lg flex overflow-hidden max-w-4xl w-full"
            style="max-width: 760px;"
          >
            {/* Left side with image */}
            <div
              class="w-full min-w-[340px]"
              style={{
                backgroundImage: image ? `url(${image})` : "",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <NewsletterPopupForm phone={phone} />
          </div>
        </div>
      </ClosedPopup>
    </>
  );
}

export default NewsletterPopup;
