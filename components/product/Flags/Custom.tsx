export interface Custom {
    text?: string;
    textColor?: string;
    backgroundColor?: string;
    isProductPage?: boolean;
}

function CustomFlag ({ isProductPage, text, textColor, backgroundColor }: Custom) {
    return (
        <div style={{ backgroundColor: backgroundColor ? backgroundColor : '#ffc72c', color: textColor ? textColor : '#000' }} class={'font-normal text-[10px] mt-[5px] text-center flex items-center justify-center h-5 max-w-[89] py-1 px-2'}>
            <p>{text ? text : 'Exclusivo'}</p>
        </div>
    );
}

export default CustomFlag;