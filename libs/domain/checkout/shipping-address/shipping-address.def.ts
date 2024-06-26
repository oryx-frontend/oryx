import { componentDef } from '@oryx-frontend/utilities';

export const checkoutShippingAddressComponent = componentDef({
  name: 'oryx-checkout-shipping-address',
  impl: () =>
    import('./shipping-address.component').then(
      (m) => m.CheckoutShippingAddressComponent
    ),
  schema: () =>
    import('./shipping-address.schema').then(
      (m) => m.checkoutShippingAddressSchema
    ),
});
