import { componentDef } from '@oryx-frontend/utilities';

export const checkoutHeadingComponent = componentDef({
  name: 'oryx-checkout-heading',
  impl: () =>
    import('./heading.component').then((m) => m.CheckoutHeadingComponent),
});
