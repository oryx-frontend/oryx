import { componentDef } from '@oryx-frontend/utilities';

export const toggleComponent = componentDef({
  name: 'oryx-toggle',
  impl: () => import('./toggle.component').then((m) => m.ToggleComponent),
});
