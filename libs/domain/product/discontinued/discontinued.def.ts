import { componentDef } from '@oryx-frontend/utilities';

export const productDiscontinuedComponent = componentDef({
  name: 'oryx-product-discontinued',
  impl: () =>
    import('./discontinued.component').then(
      (m) => m.ProductDiscontinuedComponent
    ),
  schema: () =>
    import('./discontinued.schema').then((m) => m.ProductDiscontinuedSchema),
});
