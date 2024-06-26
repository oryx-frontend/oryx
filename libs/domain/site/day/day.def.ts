import { componentDef } from '@oryx-frontend/utilities';

export const siteDayComponent = componentDef({
  name: 'oryx-site-day',
  impl: () => import('./day.component').then((m) => m.SiteDayComponent),
  schema: import('./day.schema').then((m) => m.siteDaySchema),
});
