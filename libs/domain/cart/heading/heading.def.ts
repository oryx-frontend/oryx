import { componentDef } from '@oryx-frontend/utilities';

export const cartHeadingComponent = componentDef({
  name: 'oryx-cart-heading',
  impl: () => import('./heading.component').then((m) => m.CartHeadingComponent),
});
