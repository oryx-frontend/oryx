import { CartComponentMixin, CartService } from '@oryx-frontend/cart';
import {
  QuantityEventDetail,
  QuantityInputComponent,
} from '@oryx-frontend/cart/quantity-input';
import { resolve } from '@oryx-frontend/di';
import { ContentMixin, defaultOptions } from '@oryx-frontend/experience';
import { ProductMixin } from '@oryx-frontend/product';
import { ButtonComponent, ButtonType } from '@oryx-frontend/ui/button';
import { IconTypes } from '@oryx-frontend/ui/icon';
import {
  Size,
  computed,
  elementEffect,
  hydrate,
} from '@oryx-frontend/utilities';
import { LitElement, TemplateResult, html } from 'lit';
import { query, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { CartAddOptions } from './add.model';
import { styles } from './add.styles';

@defaultOptions({
  enableLabel: true,
})
@hydrate()
export class CartAddComponent extends ProductMixin(
  CartComponentMixin(ContentMixin<CartAddOptions>(LitElement))
) {
  static styles = styles;

  protected cartService = resolve(CartService);

  @state() protected isInvalid = false;
  @query('oryx-button') protected button?: ButtonComponent;
  @query('oryx-cart-quantity-input') protected input?: QuantityInputComponent;

  protected override render(): TemplateResult | void {
    if (!this.$product()?.sku) return;
    return html`${this.renderQuantity()} ${this.renderButton()}`;
  }

  protected renderQuantity(): TemplateResult | void {
    if (this.$options().hideQuantityInput) return;

    return html`<oryx-cart-quantity-input
      .min=${this.$availableQuantity() ? 1 : 0}
      .max=${this.$availableQuantity()}
      @update=${this.onUpdate}
      @submit=${this.onSubmit}
    ></oryx-cart-quantity-input>`;
  }

  protected renderButton(): TemplateResult | void {
    const { outlined, enableLabel } = this.$options();
    const type = outlined ? ButtonType.Outline : ButtonType.Solid;
    const text = this.i18n('cart.add-to-cart') as string;

    return html`<oryx-button
      size=${Size.Md}
      type=${type}
      text=${ifDefined(enableLabel ? text : undefined)}
      label=${ifDefined(enableLabel ? undefined : text)}
      icon=${IconTypes.CartAdd}
      ?disabled=${this.isInvalid || !this.$availableQuantity()}
      @click=${this.onSubmit}
      @mouseup=${this.onMouseUp}
      hydration-events="click"
    ></oryx-button>`;
  }

  protected onMouseUp(e: Event): void {
    e.stopPropagation();
  }

  @elementEffect()
  protected reset = (): void => {
    if (this.$product()) this.input?.reset?.();
  };

  /**
   * The available quantity is the sum of the product's availability quantity
   * and the quantity of all entries in the cart with the same sku.
   * If the product is discontinued, the available quantity is 0.
   * If the product is never out of stock, the available quantity is Infinity.
   */
  protected $availableQuantity = computed(() => {
    const { availability, sku, discontinued } = this.$product() ?? {};
    const { quantity = 0, isNeverOutOfStock } = availability ?? {};

    if (!quantity && (discontinued || !isNeverOutOfStock)) {
      return 0;
    }

    if (isNeverOutOfStock) return Infinity;

    return (
      quantity -
      this.$entries()
        .filter((entry) => entry.sku === sku)
        .reduce((cumulated, { quantity }) => cumulated + Number(quantity), 0)
    );
  });

  /**
   * @deprecated Use $availableQuantity instead.
   */
  protected $hasStock = computed(() => {
    return !!this.$availableQuantity();
  });

  /**
   * @deprecated Use $availableQuantity instead.
   */
  protected $min = computed(() => {
    return this.$availableQuantity() ? 1 : 0;
  });

  /**
   * @deprecated Use $availableQuantity instead.
   */
  protected $max = computed(() => {
    return this.$availableQuantity();
  });

  protected onUpdate(e: CustomEvent<QuantityEventDetail>): void {
    this.isInvalid = !!e.detail.isInvalid;
  }

  protected onSubmit(e: Event | CustomEvent<QuantityEventDetail>): void {
    e.preventDefault();
    e.stopPropagation();
    const productQualifier = this.$productQualifier();
    if (!productQualifier || !this.button) return;

    const quantity =
      (e as CustomEvent).detail?.quantity ?? this.input?.value ?? this.$min();
    const button = this.button;

    this.button.loading = true;
    this.cartService.addEntry({ ...productQualifier, quantity }).subscribe({
      next: () => {
        button.confirmed = true;
        setTimeout(() => {
          button.confirmed = false;
        }, 800);
      },
      error: (e) => {
        button.confirmed = false;
        button.loading = false;
        throw e;
      },
      complete: () => {
        button.loading = false;
      },
    });
  }
}
