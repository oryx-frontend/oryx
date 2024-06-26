import { CheckoutMixin } from '@oryx-frontend/checkout';
import { resolve } from '@oryx-frontend/di';
import { RouterService } from '@oryx-frontend/router';
import { hydrate, I18nMixin } from '@oryx-frontend/utilities';
import { html, LitElement, TemplateResult } from 'lit';
import { checkoutPlaceOrder } from './place-order.styles';

@hydrate({ event: 'window:load' })
export class CheckoutPlaceOrderComponent extends I18nMixin(
  CheckoutMixin(LitElement)
) {
  static styles = checkoutPlaceOrder;
  protected router = resolve(RouterService);

  protected override render(): TemplateResult | void {
    if (this.$isEmpty()) return;

    return html`<oryx-button
      .text=${this.i18n('checkout.place-order')}
      ?inert=${this.$isBusy()}
      ?loading=${this.$isBusy()}
      @click="${this.onClick}"
    ></oryx-button>`;
  }

  protected onClick(): void {
    this.checkoutService.placeOrder().subscribe((response) => {
      if (response.redirectUrl) {
        this.redirect(response.redirectUrl);
      }
    });
  }

  protected redirect(url: string): void {
    if (url) this.router.navigate(url);
  }
}
