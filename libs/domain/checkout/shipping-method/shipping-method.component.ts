import {
  CheckoutMixin,
  isValid,
  ShipmentMethod,
} from '@oryx-frontend/checkout';
import { ContentMixin } from '@oryx-frontend/experience';
import { IconTypes } from '@oryx-frontend/ui/icon';
import {
  computed,
  elementEffect,
  hydrate,
  signal,
  signalAware,
  ssrShim,
} from '@oryx-frontend/utilities';
import { html, LitElement, TemplateResult } from 'lit';
import { query } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import { styles } from './shipping-method.styles';

@ssrShim('style')
@signalAware()
@hydrate({ event: 'window:load' })
export class CheckoutShippingMethodComponent
  extends CheckoutMixin(ContentMixin(LitElement))
  implements isValid
{
  static styles = styles;

  protected shipments = signal(this.checkoutDataService.get('shipments'));
  protected selected = signal(this.checkoutStateService.get('shipment'));

  @query('form')
  protected form?: HTMLFormElement;

  isValid(report: boolean): boolean {
    if (!this.form?.checkValidity() && report) {
      this.form?.reportValidity();
    }
    return !!this.form?.checkValidity();
  }

  protected $hasMethods = computed(() => {
    const carriers = this.shipments()?.[0]?.carriers;

    return !!carriers?.find((carrier) => !!carrier.shipmentMethods?.length);
  });

  @elementEffect()
  protected $toggleNoMethods = (): void => {
    this.toggleAttribute('no-methods', !this.$hasMethods());
  };

  protected override render(): TemplateResult | void {
    if (!this.$hasMethods()) return this.renderEmpty();

    const carriers = this.shipments()?.[0]?.carriers;

    return html`
      <oryx-checkout-header>
        <h2>${this.i18n('checkout.shipping-methods')}</h2>
      </oryx-checkout-header>
      <form>
        ${carriers?.map(
          (carrier) => html`
            ${when(carriers.length > 1, () => html`<h3>${carrier.name}</h3>`)}
            ${carrier.shipmentMethods.map((method) =>
              this.renderMethod(method)
            )}
          `
        )}
      </form>
    `;
  }

  protected renderMethod(method: ShipmentMethod): TemplateResult {
    const isSelected = this.isSelected(method.id);
    return html`<oryx-tile ?selected=${isSelected}>
      <oryx-radio>
        <input
          name="shipment"
          type="radio"
          value=${method.id}
          required
          ?checked=${isSelected}
          @change=${this.onChange}
        />
        <div>
          <span>${method.name}</span>
          <oryx-site-price .value=${method.price}></oryx-site-price>
        </div>
        <oryx-date
          slot="subtext"
          .stamp=${method.deliveryTime}
          .i18nToken=${'checkout.delivered-at-<date>'}
        ></oryx-date>
      </oryx-radio>
    </oryx-tile>`;
  }

  /**
   * Evaluates whether the given method id is the selected method.
   * If there's no method selected, a method can be auto selected.
   */
  protected isSelected(methodId: string): boolean {
    if (!this.selected()) this.autoSelect(methodId);
    return this.selected()?.idShipmentMethod === methodId;
  }

  protected onChange(e: Event): void {
    this.select((e.target as HTMLInputElement).value);
  }

  protected autoSelect(methodId: string): void {
    if (
      methodId ===
      this.shipments()?.[0]?.carriers?.[0]?.shipmentMethods?.[0]?.id
    ) {
      this.select(methodId);
    }
  }

  protected select(id: string): void {
    this.checkoutStateService.set('shipment', {
      value: { idShipmentMethod: id },
      valid: true,
    });
  }

  protected renderEmpty(): TemplateResult {
    return html`<oryx-icon .type=${IconTypes.Carrier}></oryx-icon>
      <p>${this.i18n('checkout.no-shipment-methods-available')}</p>`;
  }
}
