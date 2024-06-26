import { AppFeature } from '@oryx-frontend/core';
import * as components from './components';
export * from './components';

const multiCartComponents = Object.values(components);

export const multiCartFeature: AppFeature = {
  defaultOptions: { cart: { multi: true } },
  components: multiCartComponents,
};
