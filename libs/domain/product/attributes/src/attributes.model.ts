export interface ProductAttributesOptions {
  columnCount?: string;
  /**
   * Highlighted variant attributes will clarify the uniqueness of the value among
   * the variants. If the attribute is unqieu to the variant, a highlight attribute
   * is added, so that the stylesheet can mark the attribute value.
   *
   * @since 1.5
   */
  highlightVariantAttribute?: boolean;
}
