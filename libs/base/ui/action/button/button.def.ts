import { componentDef } from '@oryx-frontend/utilities';

export const buttonComponent = componentDef({
  name: 'oryx-button',
  impl: () => import('./button.component').then((m) => m.ButtonComponent),
});
