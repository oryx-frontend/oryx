import { AppFeature } from '@oryx-frontend/core';
import * as components from './components';
import { productProviders } from './services';
export * from './components';

export const productComponents = Object.values(components);

export const productFeature: AppFeature = {
  providers: productProviders,
  components: productComponents,
};
