import type { ImageWidget, HTMLWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";

export interface textProps {
    text?: HTMLWidget,
    /**
     * @format color-input
     * @default "#000000"
     */
    color?: string,
    fontSize?: "Small" | "Normal" | "Large",
    fontFamily?: "poppins" | "BeausiteGrand" | "sans-serif",
}

export interface Props {
    title?: textProps,
    description?: textProps,
    image: {
        mobile?: ImageWidget,
        desktop?: ImageWidget,
        alt?: string
    },
}

export default function HeroBanner({
    title,
    description,
    image = {
        mobile: "",
        desktop: "https://placehold.co/380x380",
        alt: "",
    },
}: Props) {
    
    return (
        <div class="relative flex items-end">
            <div class="bg-red w-full h-full">
                <Picture>
                    <Source
                        media="(max-width: 768px)"
                        src={image.mobile || ""}
                        width={350}
                        height={449}
                        class="w-full object-cover"
                    />
                    <Source
                        media="(min-width: 768px)"
                        src={image.desktop || ""}
                        width={1512}
                        height={700}
                        class="w-full object-cover"
                    />
                    <img
                        class="w-full h-full object-cover"
                        src={image.desktop || ""}
                        alt={image.alt}
                    />
                </Picture>
            </div>
            <div class="absolute h-fit w-full flex flex-col justify-end items-center gap-6 px-14 py-14 lg:py-24 bg-gradient-to-b from-transparent to-[rgba(0,0,0,0.4)]">
                {title && titleVariant(title)}

                {description && descriptionVariant(description)}
            </div>
        </div>
    );
}

function titleVariant(props:textProps) {
    if (props.fontSize === "Small") {
        return (
            <h1 
                class="text-xl lg:text-2xl"
                style={{ color: props.color, fontFamily: props.fontFamily }}
                dangerouslySetInnerHTML={{ __html: props.text || ""}}
            />
        )
    } else if (props.fontSize === "Normal") {
        return (
            <h1 
                class="text-3xl lg:text-4xl"
                style={{ color: props.color, fontFamily: props.fontFamily }}
                dangerouslySetInnerHTML={{ __html: props.text || ""}}
            />
        )
    } else {
        return (
            <h1 
                class="text-6xl lg:text-8xl"
                style={{ color: props.color, fontFamily: props.fontFamily }}
                dangerouslySetInnerHTML={{ __html: props.text || ""}}
            />
        )
    }
}

function descriptionVariant(props:textProps) {
    if (props.fontSize === "Small") {
        return (
            <div
                class="text-lg lg:text-xl"
                style={{ color: props.color, fontFamily: props.fontFamily }}
                dangerouslySetInnerHTML={{ __html: props.text || ""}}
            />
        )
    } else if (props.fontSize === "Normal") {
        return (
            <div
                class="text-2xl lg:text-3xl"
                style={{ color: props.color, fontFamily: props.fontFamily }}
                dangerouslySetInnerHTML={{ __html: props.text || ""}}
            />
        )
    } else {
        return (
            <div
                class="text-2xl lg:text-4xl"
                style={{ color: props.color, fontFamily: props.fontFamily }}
                dangerouslySetInnerHTML={{ __html: props.text || ""}}
            />
        )
    }
}