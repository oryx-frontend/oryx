import { componentDef } from '@oryx-frontend/utilities';

export const tagComponent = componentDef({
  name: 'oryx-tag',
  impl: () => import('./tag.component').then((m) => m.TagComponent),
});
