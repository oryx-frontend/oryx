import { componentDef } from '@oryx-frontend/utilities';

export const searchFacetComponent = componentDef({
  name: 'oryx-search-facet',
  impl: () => import('./facet.component').then((m) => m.SearchFacetComponent),
});
