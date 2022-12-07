import { HeadingTag } from '@spryker-oryx/ui/heading';

export interface ProductTitleOptions {
  /**
   * Specifies the html tag that is used to render the title.
   *
   * On a PDP, the product title is most likely rendered in a H1 to
   * get the best indexing from search engines. However, at other
   * places, the title might be rendered in a H3 or different.
   */
  tag?: HeadingTag;

  /**
   * Indicates whether to generate a link to the Product Detail Page.
   */
  link?: boolean;

  /**
   * Indicate the max number of lines that are used for the product title.
   */
  maxLines?: number;
}
