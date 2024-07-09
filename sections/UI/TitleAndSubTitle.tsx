import Title from "deco-sites/montecarlo/components/ui/Title.tsx";
import SubTitle from "deco-sites/montecarlo/components/ui/SubTitle.tsx";

interface ConfigProps {
  /**
   * @format color-input
   * @default #FFFFFF;
   */
  background?: string;
  /**
   * @format color-input
   * @default #000000;
   */
  color?: string;
  /** @default 1rem; */
  paddingTop?: string;
  /** @default 1rem; */
  paddingBottom?: string;
  /** @default 1rem; */
  paddingLeft?: string;
  /** @default 1rem; */
  paddingRight?: string;
}

export interface Props {
  /** @format rich-text */
  title?: string;
  /** @format rich-text */
  subTitle?: string;
  config?: ConfigProps;
}

export default function TitleAndSubTitle({ title, subTitle, config }: Props) {
  return (
    <div
      class={`flex flex-col gap-1 px-5`}
      style={{
        backgroundColor: config?.background ? config.background : "",
        color: config?.color ? config.color : "",
        paddingTop: config?.paddingTop ? config.paddingTop : "",
        paddingLeft: config?.paddingLeft ? config.paddingLeft : "",
        paddingRight: config?.paddingRight ? config.paddingRight : "",
        paddingBottom: config?.paddingBottom ? config.paddingBottom : "",
      }}
    >
      {title ? <Title text={title} /> : null}
      {subTitle ? <SubTitle text={subTitle} /> : null}
    </div>
  );
}
