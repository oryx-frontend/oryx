import { componentDef } from '@oryx-frontend/utilities';

export const searchColorFacetComponent = componentDef({
  name: 'oryx-search-color-facet',
  impl: () =>
    import('./facet-color.component').then((m) => m.SearchColorFacetComponent),
});
