import { componentDef } from '@oryx-frontend/utilities';

export const checkoutHeaderComponent = componentDef({
  name: 'oryx-checkout-header',
  impl: () =>
    import('./header.component').then((m) => m.CheckoutHeaderComponent),
});
