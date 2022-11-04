import { componentDef } from '@spryker-oryx/core';

export const cartEntryConfirmationComponent = componentDef({
  name: 'cart-entry-confirmation',
  impl: () =>
    import('./confirmation.component').then(
      (m) => m.CartEntryConfirmationComponent
    ),
});