import { ContentMixin, defaultOptions } from '@oryx-frontend/experience';
import { PRODUCT, ProductContext, ProductMixin } from '@oryx-frontend/product';
import { featureVersion, hydrate } from '@oryx-frontend/utilities';
import { LitElement, TemplateResult } from 'lit';
import { html } from 'lit/static-html.js';
import { ProductIdOptions } from './id.model';

@defaultOptions({ prefix: 'SKU: ' })
@hydrate({ context: featureVersion >= '1.4' ? PRODUCT : ProductContext.SKU })
export class ProductIdComponent extends ProductMixin(
  ContentMixin<ProductIdOptions>(LitElement)
) {
  protected override render(): TemplateResult {
    return html`<span part="prefix">${this.$options()?.prefix}</span>
      ${this.$product()?.sku}`;
  }
}
