import {
  SendEventOnClick,
  SendEventOnView,
} from "../../components/Analytics.tsx";
import { useId } from "../../sdk/useId.ts";

export interface Props {
  /** @format rich-text */
  title?: string;
  /**
   * @format rich-text
   * @title Content
   */
  content?: string;
  /**
   * @title Content
   * @description default "Continar lendo"
   */
}

const DEFAULTPROPS = {
  title: "Relógios",
  content:
    "Ganhando cada vez mais destaque, os relógios se tornaram essenciais a homens e mulheres que priorizam estilo e sofisticação. Além disso, os relógios são a representação da pontualidade e do respeito ao tempo. Na Monte Carlo, você encontra uma linha completa de relógios.Confira todos os modelos e marcas em nosso site. Relógio Monte Carlo Seguindo a tradição, os relógios da Monte Carlo são mais que acessórios, são peças cheias de sofisticação e estilo que complementam todos os tipos de looks.Perfeitos para quem deseja se destacar na multidão, marcando presença com um relógio de design elegante, alto desempenho e com muita precisão.Entre destaques da nossa marca exclusiva estão",
};

export default function TextSEOCategory(props: Props) {
  const { title, content } = { ...DEFAULTPROPS, ...props };

  const id = useId();

  return (
    <div
      id={id}
      class="peer flex w-full flex-col items-center justify-center px-2 py-9 lg:py-24 gap-5 max-w-[700px] mx-auto"
    >
      <label class="bg-primary peer relative order-3 flex cursor-pointer select-none items-center justify-center px-[14px] py-[10px] mt-3">
        <input type="checkbox" name="todo[1]" class="peer" />
        <span class="before:bg-primary left-0 z-10 -ml-3 text-sm before:absolute peer-checked:after:content-['Ler_Menos'] after:content-['Continuar_Lendo'] before:left-0 before:-z-10 before:h-6 before:w-8 lg:text-sm">
        </span>
      </label>
      {title && (
        <h1
          class="text-xl order-1 text-start w-full"
          dangerouslySetInnerHTML={{ __html: title }}
        >
        </h1>
      )}
      {content && (
        <span
          class="seo-text text-base order-2 line-clamp-3 text-ellipsis peer-has-[:checked]:line-clamp-none peer-has-[:checked]:text-wrap"
          dangerouslySetInnerHTML={{ __html: content }}
        >
        </span>
      )}

      <SendEventOnView
        id={id}
        event={{
          name: "view_promotion",
          params: {
            creative_name: title,
          },
        }}
      />
    </div>
  );
}
