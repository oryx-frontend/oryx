import { componentDef } from '@oryx-frontend/utilities';
import { DataWrapperComponentOptions } from './data-wrapper.model';

declare global {
  interface FeatureOptions {
    'oryx-data-wrapper'?: DataWrapperComponentOptions;
  }
}

export const dataWrapper = componentDef({
  name: 'oryx-data-wrapper',
  impl: () =>
    import('./data-wrapper.component').then((m) => m.DataWrapperComponent),
  schema: () =>
    import('./data-wrapper.schema').then((m) => m.dataWrapperSchema),
});
