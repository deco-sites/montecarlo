interface Props {
  text?: string | undefined;
}

function SubTitle({ text }: Props) {
  if (text) {
    return (
      <span
        dangerouslySetInnerHTML={{ __html: text }}
        class=" font-medium text-center text-sm lg:text-base"
      >
      </span>
    );
  }

  return <></>;
}

export default SubTitle;
