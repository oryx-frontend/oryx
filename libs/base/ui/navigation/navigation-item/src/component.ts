import { componentDef } from '@oryx-frontend/utilities';

export const navigationItemComponent = componentDef({
  name: 'oryx-navigation-item',
  impl: () =>
    import('./navigation-item.component').then(
      (m) => m.NavigationItemComponent
    ),
});
