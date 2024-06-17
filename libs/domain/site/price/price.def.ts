import { componentDef } from '@oryx-frontend/utilities';

export const sitePriceComponent = componentDef({
  name: 'oryx-site-price',
  impl: () => import('./price.component').then((m) => m.SitePriceComponent),
  schema: import('./price.schema').then((m) => m.sitePriceSchema),
});
