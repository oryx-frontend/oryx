import { componentDef } from '@oryx-frontend/utilities';
import { DataLinkComponentOptions } from './data-link.model';

declare global {
  interface FeatureOptions {
    'oryx-data-link'?: DataLinkComponentOptions;
  }
}

export const dataLink = componentDef({
  name: 'oryx-data-link',
  impl: () => import('./data-link.component').then((m) => m.DataLinkComponent),
  schema: () => import('./data-link.schema').then((m) => m.dataLinkSchema),
});
