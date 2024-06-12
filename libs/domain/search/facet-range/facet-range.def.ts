import { componentDef } from '@oryx-frontend/utilities';

export const searchRangeFacetComponent = componentDef({
  name: 'oryx-search-range-facet',
  impl: () =>
    import('./facet-range.component').then((m) => m.SearchRangeFacetComponent),
  stylesheets: [
    {
      rules: () => import('./facet-range.styles').then((m) => m.screenStyles),
    },
  ],
});
