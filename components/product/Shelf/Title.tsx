interface TitleProps {
  text?: string | undefined;
}

function Title({ text }: TitleProps) {
  if (text) {
    return (
      <h3 class=" font-semibold text-center text-xl lg:text-3xl">
        {text}
      </h3>
    );
  }

  return <></>;
}

export default Title;
