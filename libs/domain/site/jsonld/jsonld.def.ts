import { componentDef } from '@oryx-frontend/utilities';

export const siteJsonLdComponent = componentDef({
  name: 'oryx-site-jsonld',
  impl: () => import('./jsonld.component').then((m) => m.SiteJsonLdComponent),
  schema: () => import('./jsonld.schema').then((m) => m.siteJsonLdSchema),
});
