import { componentDef } from '@oryx-frontend/utilities';

export const toggleIconComponent = componentDef({
  name: 'oryx-toggle-icon',
  impl: () =>
    import('./toggle-icon.component').then((m) => m.ToggleIconComponent),
});
