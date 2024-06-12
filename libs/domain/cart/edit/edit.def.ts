import { componentDef } from '@oryx-frontend/utilities';

export const cartEditComponent = componentDef({
  name: 'oryx-cart-edit',
  impl: () => import('./edit.component').then((m) => m.CartEditComponent),
});
