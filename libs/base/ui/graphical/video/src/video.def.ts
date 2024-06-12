import { componentDef } from '@oryx-frontend/utilities';

export const videoComponent = componentDef({
  name: 'oryx-video',
  impl: () => import('./video.component').then((m) => m.default),
});
