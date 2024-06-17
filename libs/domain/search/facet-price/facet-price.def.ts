import { componentDef } from '@oryx-frontend/utilities';

export const searchPriceFacetComponent = componentDef({
  name: 'oryx-search-price-facet',
  impl: () =>
    import('./facet-price.component').then((m) => m.SearchPriceFacetComponent),
});
