import { componentDef } from '@oryx-frontend/utilities';

export const pageNavigationItemComponent = componentDef({
  name: 'oryx-page-navigation-item',
  impl: () =>
    import('./page-navigation-item.component').then(
      (m) => m.PageNavigationItemComponent
    ),
});
