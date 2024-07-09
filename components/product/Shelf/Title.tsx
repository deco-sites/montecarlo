interface TitleProps {
  text?: string | undefined;
}

function Title({ text }: TitleProps) {
  if (text) {
    return (
      <h2 class=" font-semibold text-center text-1.5xl lg:text-3xl">
        {text}
      </h2>
    );
  }

  return <></>;
}

export default Title;
