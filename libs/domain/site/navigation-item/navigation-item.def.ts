import { componentDef } from '@oryx-frontend/utilities';
import { SiteNavigationItemOptions } from './navigation-item.model';

declare global {
  interface FeatureOptions {
    'oryx-site-navigation-item'?: SiteNavigationItemOptions;
  }
}

export const siteNavigationItemComponent = componentDef({
  name: 'oryx-site-navigation-item',
  impl: () =>
    import('./navigation-item.component').then(
      (m) => m.SiteNavigationItemComponent
    ),
  schema: import('./navigation-item.schema').then(
    (m) => m.siteNavigationItemSchema
  ),
});
