interface Props {
  text?: string | undefined;
}

function SubTitle({ text }: Props) {
  if (text) {
    return (
      <span
        dangerouslySetInnerHTML={{ __html: text }}
        class=" font-medium text-center text-sm lg:text-base px-1 lg:px-0"
      >
      </span>
    );
  }

  return <></>;
}

export default SubTitle;
