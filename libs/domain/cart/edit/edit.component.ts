import { CartComponentMixin, CARTS, CartService } from '@oryx-frontend/cart';
import { resolve } from '@oryx-frontend/di';
import {
  FormFieldDefinition,
  FormFieldType,
  FormMixin,
  FormRenderer,
  FormValues,
} from '@oryx-frontend/form';
import { LinkService, RouterService } from '@oryx-frontend/router';
import {
  CurrencyService,
  NotificationService,
  PriceModes,
  PriceModeService,
} from '@oryx-frontend/site';
import { AlertType } from '@oryx-frontend/ui';
import { computed, I18nMixin, signal } from '@oryx-frontend/utilities';
import { html, LitElement, TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';

export class CartEditComponent extends CartComponentMixin(
  FormMixin(I18nMixin(LitElement))
) {
  protected fieldRenderer = resolve(FormRenderer);
  protected cartService = resolve(CartService);
  protected notificationService = resolve(NotificationService);
  protected routerService = resolve(RouterService);
  protected linkService = resolve(LinkService);

  @state()
  protected isLoading = false;

  protected $redirectLink = signal(this.linkService.get({ type: CARTS }));

  protected $cartValues = computed(() => {
    const cart = this.$cart();

    return cart
      ? {
          name: cart.name,
          priceMode: cart.priceMode,
          currency: cart.currency,
        }
      : {};
  });

  protected currencyService = resolve(CurrencyService);
  protected $currency = signal(this.currencyService.get());
  protected $currencies = signal(this.currencyService.getAll(), {
    initialValue: [],
  });

  protected priceModeService = resolve(PriceModeService);
  protected $priceMode = signal(this.priceModeService.get());

  protected getFields(): FormFieldDefinition[] {
    const priceModeOptions = [PriceModes.GrossMode, PriceModes.NetMode].map(
      (priceMode) => ({
        value: priceMode,
        text: this.i18n('cart.mode.<mode>', {
          mode: priceMode.split('_')[0].toLowerCase(),
        }),
      })
    );

    const currencyOptions = this.$currencies().map((currency) => ({
      value: currency.code,
      text: currency.name,
    }));

    return [
      {
        id: 'name',
        type: FormFieldType.Text,
        label: this.i18n('cart.edit.name'),
        placeholder: this.i18n('cart.edit.name.placeholder'),
        required: true,
        width: 100,
      },
      {
        id: 'currency',
        type: FormFieldType.Select,
        label: this.i18n('currency'),
        required: true,
        options: currencyOptions,
      },
      {
        id: 'priceMode',
        type: FormFieldType.Select,
        label: this.i18n('cart.edit.price-mode'),
        required: true,
        options: priceModeOptions,
      },
    ];
  }

  protected $values = computed<FormValues>(() => {
    return {
      priceMode: this.$priceMode(),
      currency: this.$currency(),
      //TODO: uncomment and add additional check for edit cart mode
      // ...this.$cartValues(),
    };
  });

  protected override render(): TemplateResult {
    const fields = this.getFields();
    const values = this.$values();

    return html`<form @oryx.submit=${this.onSubmit}>
      <oryx-layout
        layout="grid"
        style="--oryx-column-count:2;--column-gap: 20px;"
      >
        ${this.fieldRenderer.buildForm(fields, values)}

        <oryx-button ?loading=${this.isLoading} @click=${() => this.submit()}
          >${this.i18n('create')}</oryx-button
        >
      </oryx-layout>
    </form>`;
  }

  protected onSubmit(e: CustomEvent): void {
    this.isLoading = true;

    this.cartService.createCart(e.detail.values).subscribe({
      next: (cart) => {
        this.notificationService.push({
          type: AlertType.Success,
          content: {
            token: 'carts.create.cart-<name>-created',
            values: { name: cart.name },
          },
        });
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.routerService.navigate(this.$redirectLink()!);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
