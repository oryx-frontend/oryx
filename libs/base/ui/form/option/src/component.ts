import { componentDef } from '@oryx-frontend/utilities';

export const optionComponent = componentDef({
  name: 'oryx-option',
  impl: () => import('./option.component').then((m) => m.OptionComponent),
});
