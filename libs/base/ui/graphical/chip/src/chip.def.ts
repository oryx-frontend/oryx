import { componentDef } from '@oryx-frontend/utilities';

export const chipComponent = componentDef({
  name: 'oryx-chip',
  impl: () => import('./chip.component').then((m) => m.ChipComponent),
});
