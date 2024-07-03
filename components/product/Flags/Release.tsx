export interface Release {
    text?: string;
    /** @format color-input */
    backgroundColor?: string;
    /** @format color-input */
    fontColor?: string;
    isProductPage?: boolean;
}

function ReleaseFlag({ text, backgroundColor, fontColor, isProductPage }: Release) {
    if (!isProductPage) {
        return (
            <div style={{ backgroundColor: backgroundColor ? backgroundColor : '#f5f3e7', color: fontColor ? fontColor : '#000' }} class={'font-normal text-sm text-center flex items-center justify-center h-5 max-w-[89] py-1 px-2'}>
                <p>{text ? text : 'Lançamento'}</p>
            </div>
        );
    } else {
        return <></>;
    }
}

export default ReleaseFlag;