import type { ImageWidget } from "apps/admin/widgets.ts";

/**
 * @titleBy name
 */
export interface Material {
  image: ImageWidget;
  name: string;
}

/** @titleBy name */
export interface MaterialProps {
  image: ImageWidget;
  name: string;
}
/** @title Materials of Products */
export interface Props {
  /** @title Materials of Products */
  material: MaterialProps[];
}

/**@title Material of Products */
const loader = ({ material }: Props): Material[] => material;

export default loader;
