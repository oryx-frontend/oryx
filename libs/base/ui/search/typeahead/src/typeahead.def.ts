import { componentDef } from '@oryx-frontend/utilities';

export const typeheadComponent = componentDef({
  name: 'oryx-typeahead',
  impl: () => import('./typeahead.component').then((m) => m.TypeaheadComponent),
  stylesheets: [
    {
      rules: () => import('./typeahead.styles').then((m) => m.screenStyles),
    },
  ],
});
