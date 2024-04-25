import type { ImageWidget } from "apps/admin/widgets.ts";

/**
 * @titleBy name
 */
export interface Losses {
  image: ImageWidget;
  name: string;
}

/** @titleBy name */
export interface LossesProps {
  image: ImageWidget;
  name: string;
}
/** @title Product losses */
export interface Props {
  /** @title Product losses */
  material: LossesProps[];
}

/**@title Product losses */
const loader = ({ material }: Props): Losses[] => material;

export default loader;
