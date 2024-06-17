import { componentDef } from '@oryx-frontend/utilities';

export const dateComponent = componentDef({
  name: 'oryx-date',
  impl: () => import('./date.component').then((m) => m.DateComponent),
  schema: import('./date.schema').then((m) => m.siteDateSchema),
});
