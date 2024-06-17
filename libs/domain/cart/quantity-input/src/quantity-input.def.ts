import { QuantityInputAttributes } from '@oryx-frontend/ui/quantity-input';
import { componentDef } from '@oryx-frontend/utilities';

declare global {
  interface FeatureOptions {
    'oryx-cart-quantity-input'?: QuantityInputAttributes;
  }
}

/** @deprecated since 1.3. Use oryx-quantity-input from @oryx-frontend/ui/quantity-input*/
export const quantityInputComponent = componentDef({
  name: 'oryx-cart-quantity-input',
  impl: () =>
    import('./quantity-input.component').then((m) => m.QuantityInputComponent),
});
