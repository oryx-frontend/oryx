import { AppFeature } from '@oryx-frontend/core';
import * as components from './components';
import { searchProviders } from './services';
export * from './components';

export const searchComponents = Object.values(components);

export const searchFeature: AppFeature = {
  providers: searchProviders,
  components: searchComponents,
};
