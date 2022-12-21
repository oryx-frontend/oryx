import { CartComponentMixin, CartController } from '@spryker-oryx/cart';
import { ContentController } from '@spryker-oryx/experience';
import { resolve } from '@spryker-oryx/injector';
import { SemanticLinkService, SemanticLinkType } from '@spryker-oryx/site';
import { hydratable } from '@spryker-oryx/utilities';
import { i18n } from '@spryker-oryx/utilities/i18n';
import { asyncValue } from '@spryker-oryx/utilities/lit-rxjs';
import { html, TemplateResult } from 'lit';
import { combineLatest, map } from 'rxjs';
import { CartSummaryOptions } from './summary.model';
import { styles } from './summary.styles';

@hydratable('window:load')
export class CartSummaryComponent extends CartComponentMixin<CartSummaryOptions>() {
  static styles = styles;

  protected contentController = new ContentController(this);
  protected cartController = new CartController(this);

  protected link = resolve(SemanticLinkService).get({
    type: SemanticLinkType.Cart,
  });

  protected quantity$ = combineLatest([
    this.cartController.getTotalQuantity(),
    this.contentController.getOptions(),
  ]).pipe(
    map(([quantity, options]) => this.populateQuantity(quantity, options))
  );

  protected override render(): TemplateResult {
    return html`
      <a href=${asyncValue(this.link)}>
        <oryx-icon type="cart"></oryx-icon>
        ${asyncValue(this.quantity$, (quantity) =>
          quantity === 0 ? html`` : html`<mark>${quantity}</mark>`
        )}
        <span class="subtitle">${i18n('cart.cart')}</span>
      </a>
    `;
  }

  protected populateQuantity(
    quantity: number | null,
    options: CartSummaryOptions
  ): string | number {
    return quantity &&
      options.maxVisibleQuantity &&
      quantity > options.maxVisibleQuantity
      ? `${options.maxVisibleQuantity}+`
      : Number(quantity);
  }
}