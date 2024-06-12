import { CartComponentMixin } from '@oryx-frontend/cart';
import { ContentMixin } from '@oryx-frontend/experience';
import { hydrate } from '@oryx-frontend/utilities';
import { LitElement, TemplateResult, html } from 'lit';
import { styles } from './heading.styles';

@hydrate({ event: 'window:load' })
export class CheckoutHeadingComponent extends CartComponentMixin(
  ContentMixin(LitElement)
) {
  static styles = styles;

  protected override render(): TemplateResult | void {
    if (this.$isEmpty()) return;

    return html`<oryx-checkout-header>
      <h2>
        ${this.i18n('checkout.totals.<count>-items', {
          count: this.$totalQuantity(),
        })}
      </h2>
    </oryx-checkout-header> `;
  }
}
