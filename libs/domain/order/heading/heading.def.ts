import { componentDef } from '@oryx-frontend/utilities';

export const orderHeadingComponent = componentDef({
  name: 'oryx-order-heading',
  impl: () =>
    import('./heading.component').then((m) => m.OrderHeadingComponent),
});
