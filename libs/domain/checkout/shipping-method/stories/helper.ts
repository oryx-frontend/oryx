// import { CheckoutShipmentService } from '@oryx-frontend/checkout';
import { ShipmentProviderType } from '@oryx-frontend/checkout/mocks';
// import { resolve } from '@oryx-frontend/di';
import { html, TemplateResult } from 'lit';

export const renderSelector = (type: ShipmentProviderType): TemplateResult => {
  // const shipmentService = resolve(
  //   CheckoutShipmentService
  // ) as unknown as MockShipmentService;
  // shipmentService.changeProviderType(type);
  return html`<oryx-checkout-shipping-method></oryx-checkout-shipping-method>`;
};
