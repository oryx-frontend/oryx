import { componentDef } from '@oryx-frontend/utilities';

export const checkoutManageAddressComponent = componentDef({
  name: 'oryx-checkout-manage-address',
  impl: () =>
    import('./manage-address.component').then(
      (m) => m.CheckoutManageAddressComponent
    ),
});
