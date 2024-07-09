interface TitleProps {
  /** @format rich-text */
  text?: string | undefined;
}

function Title({ text }: TitleProps) {
  if (text) {
    return (
      <h3
        class="font-semibold text-center text-1.5xl lg:text-3xl"
        dangerouslySetInnerHTML={{ __html: text }}
      />
    );
  } else return <></>;
}

export default Title;
