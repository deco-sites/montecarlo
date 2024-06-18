import type { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";

/**
 * @titleBy name
 */
export interface Losses {
  image: ImageWidget;
  imageLarge?: ImageWidget;
  name: string;
  description?: HTMLWidget;
}

/** @titleBy name */
export interface LossesProps {
  /**
   * @description image small size, appears on the product card and PDP variants 26x26px
   */
  image: ImageWidget;
  /**
   * @description image large size, appears in the description of the stones, for example in the PDP 45x45px
   */
  imageLarge?: ImageWidget;
  name: string;
  /**
   * @description appears in the description of the stones, for example in the PDP
   */
  description?: HTMLWidget;
}
/** @title Product losses */
export interface Props {
  /** @title Product losses */
  material: LossesProps[];
}

/**@title Product losses */
const loader = ({ material }: Props): Losses[] => material;

export default loader;
