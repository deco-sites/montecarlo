export interface Discount {
  initialText?: string;
  finalText?: string;
  /** @format color-input */
  backgroundColor?: string;
  /** @format color-input */
  fontColor?: string;
  oldPrice: number | undefined;
  newPrice: number | undefined;
  isProductPage?: boolean;
}

function DiscountFlag(
  {
    initialText,
    finalText,
    backgroundColor,
    fontColor,
    oldPrice,
    newPrice,
    isProductPage,
  }: Discount,
) {
  if (oldPrice && newPrice && oldPrice > 0 && newPrice > 0) {
    const percentage = 100 - ((100 * newPrice) / oldPrice);

    if (percentage > 0) {
      return (
        <div
          style={{
            backgroundColor: backgroundColor ? backgroundColor : "transparent",
            color: fontColor ? fontColor : "#ff5555",
            borderColor: fontColor && isProductPage ? fontColor : "transparent",
          }}
          class={`max-h-6 font-semibold text-xs text-center flex items-center gap-1 justify-center h-5 py-1 px-2 absolute right-3 z-10 ${
            isProductPage ? `top-[-15px] border rounded` : "top-11"
          }`}
        >
          <p>{initialText ? initialText : ""}</p>
          <p>{percentage.toFixed(0) + "%"}</p>
          <p>{finalText ? finalText : " off"}</p>
        </div>
      );
    } else {
      return <></>;
    }
  } else {
    return <></>;
  }
}

export default DiscountFlag;
