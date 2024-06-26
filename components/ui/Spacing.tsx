import { useUI } from "../../sdk/useUI.ts";

export interface Props {
    /**
     * @description Espaçamento em Pixels que será aplicado para Mobile. Por exemplo "20"
    */
    mobileSpacing: number;
    /**
     * @description Espaçamento em Pixels que será aplicado para Desktop. Por exemplo "40"
    */
    desktopSpacing: number;
}

export default function Spacing({ mobileSpacing, desktopSpacing }: Props) {
    const { isMobile } = useUI();
    
    if (isMobile.value) {
        return (<div style={'height: '+mobileSpacing+'px'} />)
    }

    return (
        <div style={'height: '+desktopSpacing+'px'} />
    )
}