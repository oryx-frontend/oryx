import { CartComponentMixin } from '@oryx-frontend/cart';
import { resolve } from '@oryx-frontend/di';
import { RouteType } from '@oryx-frontend/router';
import { LinkService } from '@oryx-frontend/site';
import { hydrate, I18nMixin, signal } from '@oryx-frontend/utilities';
import { html, LitElement, TemplateResult } from 'lit';
import { checkoutLinkStyles } from './link.styles';

@hydrate({ event: ['window:load'] })
export class CheckoutLinkComponent extends I18nMixin(
  CartComponentMixin(LitElement)
) {
  static styles = [checkoutLinkStyles];

  protected semanticLinkService = resolve(LinkService);

  protected $link = signal(
    this.semanticLinkService.get({ type: RouteType.Checkout })
  );

  protected override render(): TemplateResult | void {
    if (this.$isEmpty()) return;

    return html`
      <oryx-button
        .text=${this.i18n('cart.checkout')}
        .href=${this.$link()}
        ?loading=${this.$isBusy()}
        repeatable="click"
      ></oryx-button>
    `;
  }
}
