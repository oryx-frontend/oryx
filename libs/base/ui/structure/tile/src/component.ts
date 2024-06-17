import { componentDef } from '@oryx-frontend/utilities';

export const tileComponent = componentDef({
  name: 'oryx-tile',
  impl: () => import('./tile.component').then((m) => m.TileComponent),
});
