import { ImageWidget } from "apps/admin/widgets.ts";

export interface CollectionProps {
  /**
   * @description size Image mobile:334x357 size Image desktop: 377x403
   */
  image?: {
    mobile?: ImageWidget;
    desktop?: ImageWidget;
    alt?: string;
  };
  /** @format rich-text */
  title: string;
  /** @format rich-text */
  titleAccordion?: string;
  /** @format rich-text */
  description?: string;
  cta?: {
    text?: string;
    href?: string;
    /** @format color */
    color?: string;
    /** @format color */
    backgroundColor?: string;
  };
  style?: {
    /** @format color */
    color?: string;
    /** @format color */
    backgroundColor?: string;
  };
}

/**
 * @titleBy collectionName
 */
export interface Collection {
  collectionName: string;
  Banner: CollectionProps;
}

/** @title Banner Collection */
export interface Props {
  /** @title Banner Collection*/
  collections: Collection[];
}

/**@title Banner Collection*/
const loader = ({ collections }: Props): Collection[] => collections;

export default loader;
