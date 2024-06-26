import { AppFeature } from '@oryx-frontend/core';
import { checkoutProviders } from './checkout.providers';
import * as components from './components';

export const checkoutComponents = Object.values(components);

export const checkoutFeature: AppFeature = {
  providers: checkoutProviders,
  components: checkoutComponents,
};
