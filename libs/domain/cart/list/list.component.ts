import { CartService } from '@oryx-frontend/cart';
import { resolve } from '@oryx-frontend/di';
import { ContentMixin, LayoutMixin } from '@oryx-frontend/experience';
import { signal } from '@oryx-frontend/utilities';
import { LitElement, TemplateResult, html } from 'lit';
import { repeat } from 'lit/directives/repeat.js';

export class CartListComponent extends LayoutMixin(ContentMixin(LitElement)) {
  protected cartService = resolve(CartService);
  protected $carts = signal(this.cartService.getCarts());

  protected override render(): TemplateResult | void {
    const carts = this.$carts();

    if (!carts?.length) return;

    return this.renderLayout({
      template: html`
        ${repeat(
          carts,
          ({ id }) => id,
          ({ id }) =>
            html`<oryx-cart-list-item cartId=${id}></oryx-cart-list-item>`
        )}
      `,
    });
  }
}
