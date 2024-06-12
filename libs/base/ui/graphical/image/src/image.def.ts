import { componentDef } from '@oryx-frontend/utilities';

export const imageComponent = componentDef({
  name: 'oryx-image',
  impl: () => import('./image.component').then((m) => m.ImageComponent),
});
