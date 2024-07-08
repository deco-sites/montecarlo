interface Props {
    /** @format rich-text */
    text?: string | undefined;
  }
  
  function SubTitle({ text }: Props) {
    if (text) {
      return (
        <span
          class=" font-medium text-center text-sm lg:text-base px-1 lg:px-0"
          dangerouslySetInnerHTML={{ __html: text }}
        >
        </span>
      );
    } else return <></>;
  }
  
  export default SubTitle;
  