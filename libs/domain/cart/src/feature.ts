import { AppFeature } from '@oryx-frontend/core';
import * as components from './components';
import { cartProviders } from './services';
export * from './components';

export const cartComponents = Object.values(components);

export const cartFeature: AppFeature = {
  providers: cartProviders,
  components: cartComponents,
};
