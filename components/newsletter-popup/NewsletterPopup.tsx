import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import NewsletterPopupForm from "../../islands/NewsletterForm/NewsletterPopup.tsx";

interface Props {
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
}

function NewsletterPopup({ title, image, alt, phone }: Props) {
  const isVisible = true; // Sempre visível

  if (!isVisible) return null;

  return (
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 w-full h-full">
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
        {/* Right side with form */}
        <div class="max-w-[480px] bg-[#FFC72C] flex flex-col items-center self-center p-16 relative h-[480px]">
          <button
            class="absolute top-1 right-2 text-[#F8F7F3] font-bold"
            onClick={() => {
              /* função que pode desativar o popup */
            }}
          >
            ✕
          </button>
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
          <NewsletterPopupForm phone={phone} />
        </div>
      </div>
    </div>
  );
}

export default NewsletterPopup;
