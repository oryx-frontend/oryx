import { componentDef } from '@spryker-oryx/core';

export const searchBoxComponent = componentDef({
  name: 'search-box',
  impl: () => import('./box.component').then((m) => m.SearchBoxComponent),
  stylesheets: [
    {
      rules: () =>
        import('./styles').then((m) => [
          ...m.screenStyles,
          ...m.searchboxScreenStyles,
        ]),
    },
  ],
});