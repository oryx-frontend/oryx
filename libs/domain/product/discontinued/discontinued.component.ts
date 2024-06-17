import { ContentMixin } from '@oryx-frontend/experience';
import { PRODUCT, ProductMixin } from '@oryx-frontend/product';
import { hydrate } from '@oryx-frontend/utilities';
import { LitElement, TemplateResult, html } from 'lit';

@hydrate({ context: PRODUCT })
export class ProductDiscontinuedComponent extends ProductMixin(
  ContentMixin(LitElement)
) {
  protected override render(): TemplateResult | void {
    const { discontinued, discontinuedNote } = this.$product() || {};
    if (!discontinued) return;
    return html`${discontinuedNote || this.i18n('product.discontinued')}`;
  }
}
