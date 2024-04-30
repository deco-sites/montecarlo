import { HTMLWidget } from "apps/admin/widgets.ts";
import ButtonLink from "deco-sites/montecarlo/components/ui/ButtonLink.tsx";

export interface Props {
    title: HTMLWidget;
    button: {
        label: string;
        href: string;
    }
}

const DEFAULTPROPS = {
    title: "A aliança certa para você e seu par perfeito? ",
    button: {
        label: "Faça o teste e descubra",
        href: "#"
    }
}

export default function CallForQuiz(props: Props) {

    const { title, button } = { ...DEFAULTPROPS, ...props }

    return (
        <div class="flex flex-col w-full py-9 gap-7 lg:gap-10 px-2 items-center">
            <h3 class="text-2xl font-semibold text-center lg:text-3xl" dangerouslySetInnerHTML={{ __html: title }} ></h3>

            <ButtonLink label={button.label} href={button.href} classCustom="" />
        </div>
    )
}