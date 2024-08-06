import ButtonLink from "deco-sites/montecarlo/components/ui/ButtonLink.tsx";
import {
  SendEventOnClick,
  SendEventOnView,
} from "../../components/Analytics.tsx";
import { useId } from "../../sdk/useId.ts";

export interface Props {
  /** @format rich-text */
  title: string;
  button: {
    label: string;
    href: string;
  };
}

const DEFAULTPROPS = {
  title: "A aliança certa para você e seu par perfeito? ",
  button: {
    label: "Faça o teste e descubra",
    href: "#",
  },
};

export default function CallForQuiz(props: Props) {
  const { title, button } = { ...DEFAULTPROPS, ...props };
  const id = useId();

  return (
    <div
      id={id}
      class="flex flex-col w-full py-9 gap-7 lg:gap-10 px-2 items-center"
    >
      <h3
        class="text-2xl font-semibold text-center lg:text-3xl"
        dangerouslySetInnerHTML={{ __html: title }}
      >
      </h3>

      <ButtonLink label={button.label} href={button.href} classCustom="" />
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
