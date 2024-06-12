import { componentDef } from '@oryx-frontend/utilities';

export const navigationComponent = componentDef({
  name: 'oryx-navigation',
  impl: () =>
    import('./navigation.component').then((m) => m.NavigationComponent),
});
