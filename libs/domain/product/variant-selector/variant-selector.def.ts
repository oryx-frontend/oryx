import { componentDef } from '@oryx-frontend/utilities';
import { ProductVariantSelectorComponent } from './variant-selector.component';

declare global {
  interface FeatureOptions {
    'oryx-product-variant-selector'?: ProductVariantSelectorComponent;
  }
}

export const productVariantSelectorComponent = componentDef({
  name: 'oryx-product-variant-selector',
  impl: () =>
    import('./variant-selector.component').then(
      (m) => m.ProductVariantSelectorComponent
    ),
});
