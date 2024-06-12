import { componentDef } from '@oryx-frontend/utilities';

export const tabsComponent = componentDef({
  name: 'oryx-tabs',
  impl: () => import('./tabs.component').then((m) => m.TabsComponent),
  stylesheets: [
    {
      rules: () => import('./tabs.styles').then((m) => m.screenStyles),
    },
  ],
});
