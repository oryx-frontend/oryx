import { componentDef } from '@oryx-frontend/utilities';

export const dataList = componentDef({
  name: 'oryx-data-list',
  impl: () => import('./data-list.component').then((m) => m.DataListComponent),
  schema: () => import('./data-list.schema').then((m) => m.dataListSchema),
});
