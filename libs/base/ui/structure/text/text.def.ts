import { componentDef } from '@oryx-frontend/utilities';

export const textComponent = componentDef({
  name: 'oryx-text',
  impl: () => import('./text.component').then((m) => m.TextComponent),
});
