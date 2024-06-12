import { componentDef } from '@oryx-frontend/utilities';

export const swatchComponent = componentDef({
  name: 'oryx-swatch',
  impl: () => import('./swatch.component').then((m) => m.SwatchComponent),
});
