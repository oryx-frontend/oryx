import { componentDef, featureVersion } from '@oryx-frontend/utilities';
import { ProductTitleOptions } from './title.model';

declare global {
  interface FeatureOptions {
    'oryx-product-title'?: ProductTitleOptions;
  }
}

export const productTitleComponent = componentDef({
  name: 'oryx-product-title',
  impl: () => import('./title.component').then((m) => m.ProductTitleComponent),
  schema: () => import('./title.schema').then((m) => m.productTitleSchema),
  stylesheets:
    featureVersion >= '1.4'
      ? []
      : [
          {
            rules: () =>
              import('@oryx-frontend/ui/heading').then((m) => m.headingStyles),
          },
          {
            rules: () =>
              import('@oryx-frontend/ui/heading').then(
                (m) => m.headingScreenStyles
              ),
          },
        ],
});
