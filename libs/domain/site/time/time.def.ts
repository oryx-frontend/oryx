import { componentDef } from '@oryx-frontend/utilities';

export const siteTimeComponent = componentDef({
  name: 'oryx-site-time',
  impl: () => import('./time.component').then((m) => m.SiteTimeComponent),
});
