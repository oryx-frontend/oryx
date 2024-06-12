import { componentDef } from '@oryx-frontend/utilities';

export const checkboxComponent = componentDef({
  name: 'oryx-checkbox',
  impl: () => import('./checkbox.component').then((m) => m.CheckboxComponent),
});
