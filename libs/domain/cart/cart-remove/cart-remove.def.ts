import { componentDef } from '@oryx-frontend/utilities';

export const cartRemoveComponent = componentDef({
  name: 'oryx-cart-remove',
  impl: () =>
    import('./cart-remove.component').then((m) => m.CartRemoveComponent),
  schema: () =>
    import('./cart-remove.schema').then((m) => m.cartRemoveComponentSchema),
});
