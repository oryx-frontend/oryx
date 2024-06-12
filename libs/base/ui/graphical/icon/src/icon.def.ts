import { componentDef } from '@oryx-frontend/utilities';

export const iconComponent = componentDef({
  name: 'oryx-icon',
  impl: () => import('./icon.component').then((m) => m.IconComponent),
});
