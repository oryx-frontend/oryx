import {
  CartComponentMixin,
  CartService,
  PriceMode,
} from '@oryx-frontend/cart';
import { resolve } from '@oryx-frontend/di';
import { LinkService, RouteType } from '@oryx-frontend/router';
import { AlertType } from '@oryx-frontend/ui';
import { I18nMixin, Size, signal } from '@oryx-frontend/utilities';
import { LitElement, TemplateResult, html } from 'lit';
import { when } from 'lit/directives/when.js';
import { cartListItemStyles } from './list-item.styles';

const size = Size.Md;

export class CartListItemComponent extends CartComponentMixin(
  I18nMixin(LitElement)
) {
  static styles = cartListItemStyles;

  protected cartService = resolve(CartService);
  protected linkService = resolve(LinkService);

  protected setDefault(): void {
    this.cartService.updateCart({
      cartId: this.$cart()?.id,
      isDefault: true,
    });
  }

  protected override render(): TemplateResult | void {
    const cart = this.$cart();

    if (!cart) return;

    return html`
      <oryx-collapsible>
        ${this.renderHeading()} ${this.renderEntries()} ${this.renderControls()}
      </oryx-collapsible>
    `;
  }

  protected $cartLink = signal(this.linkService.get({ type: RouteType.Cart }));

  protected renderHeading(): TemplateResult {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const cart = this.$cart()!;

    return html`
      <span slot="heading">
        ${cart.name}
        ${this.i18n('carts.totals.<count>-items', {
          count: this.$totalQuantity() ?? 0,
        })}
      </span>
      ${when(
        cart.isDefault,
        () =>
          html`<oryx-chip slot="heading" .appearance=${AlertType.Success}>
            ${this.i18n('default')}
          </oryx-chip>`
      )}

      <oryx-site-price
        slot="heading"
        .value=${cart.totals?.priceToPay ?? 0}
        .currency=${cart.currency}
      ></oryx-site-price>

      <span slot="heading">
        ${this.i18n(
          cart.priceMode === PriceMode.GrossMode
            ? 'carts.price-mode.gross'
            : 'carts.price-mode.net'
        )}
      </span>
    `;
  }

  protected renderControls(): TemplateResult {
    const disabled = !this.$totalQuantity();
    const cartId = this.$cart()?.id;

    return html`
      <div class="meta">
        ${when(
          this.$cart()?.isDefault,
          () => {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const link = this.$cartLink()!;

            return html`<oryx-button type="outline" size=${size} href=${link}>
              ${this.i18n('carts.open-cart')}
            </oryx-button> `;
          }
          //TODO: uncomment when FRW-6905 will be resolved
          // () =>
          //   html`<oryx-button
          //     type="outline"
          //     size=${size}
          //     @click=${this.setDefault}
          //   >
          //     ${this.i18n('carts.make-default')}
          //   </oryx-button>`
        )}

        <div class="actions">
          <!-- TODO: uncomment during implementation of buttons logic -->
          <!-- <oryx-button icon="edit" type="icon" .size=${size}></oryx-button>
          <oryx-button
            icon="content_copy"
            type="icon"
            .size=${size}
            ?disabled=${!disabled}
          ></oryx-button>
          <oryx-button
            icon="playlist_add"
            type="icon"
            .size=${size}
            ?disabled=${!disabled}
          ></oryx-button>
          <oryx-button icon="share" type="icon" .size=${size}></oryx-button>
          <oryx-button
            icon="download"
            type="icon"
            .size=${size}
            ?disabled=${!disabled}
          ></oryx-button>
          <oryx-button icon="delete" type="icon" .size=${size}></oryx-button> -->
          <oryx-cart-remove .cartId=${cartId}></oryx-cart-remove>
        </div>
      </div>
    `;
  }

  protected renderEntries(): TemplateResult {
    if (!this.$totalQuantity()) {
      return html`<p>${this.i18n('carts.list.no-cart-entries')}</p>`;
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const cartId = this.$cart()!.id;

    return html`<oryx-cart-entries cartId=${cartId}></oryx-cart-entries>`;
  }
}
