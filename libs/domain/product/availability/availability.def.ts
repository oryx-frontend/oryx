import { componentDef } from '@oryx-frontend/utilities';

export const productAvailabilityComponent = componentDef({
  name: 'oryx-product-availability',
  impl: () =>
    import('./availability.component').then(
      (m) => m.ProductAvailabilityComponent
    ),
  schema: () =>
    import('./availability.schema').then((m) => m.ProductAvailabilitySchema),
});
