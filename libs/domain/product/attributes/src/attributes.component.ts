import { ContentMixin, defaultOptions } from '@oryx-frontend/experience';
import { PRODUCT, ProductContext, ProductMixin } from '@oryx-frontend/product';
import { featureVersion, hydrate, ssrShim } from '@oryx-frontend/utilities';
import { LitElement, TemplateResult, html } from 'lit';
import { ProductAttributesOptions } from './attributes.model';
import { productAttributeStyles } from './attributes.styles';

@ssrShim('style')
@defaultOptions({
  columnCount: '2',
  ...(featureVersion >= '1.5' ? { highlightVariantAttribute: true } : {}),
})
@hydrate({ context: featureVersion >= '1.4' ? PRODUCT : ProductContext.SKU })
export class ProductAttributesComponent extends ProductMixin(
  ContentMixin<ProductAttributesOptions>(LitElement)
) {
  static styles = [productAttributeStyles];

  protected override render(): TemplateResult | void {
    const { attributeNames: names, attributes: values } = this.$product() ?? {};

    if (!names || !values) return;

    return html`
      <dl style="--column-count: ${this.$options().columnCount}">
        ${Object.keys(names).map(
          (key) => html`
            <dt>${this.getName(names, key)}</dt>
            <dd ?highlight=${this.isHighlighted(key)}>${values[key]}</dd>
          `
        )}
      </dl>
    `;
  }

  /**
   * Highlighted attributes will clarify the uniqueness of the value among
   * the variants.
   *
   * Indicates whether the attribute value should be highlighted, based on
   * a global component configuration and if the attribute is part of the
   * variant definition.
   *
   * @since 1.5
   */
  protected isHighlighted(key: string): boolean {
    const { variantDefinition } = this.$product() ?? {};
    return (
      !!this.$options().highlightVariantAttribute && !!variantDefinition?.[key]
    );
  }

  protected getName(
    names: Record<string, string>,
    key: string
  ): TemplateResult {
    const name = names[key];
    return name.startsWith('product.attribute.')
      ? html`${this.i18n(name)}`
      : html`${names[key]}`;
  }
}
