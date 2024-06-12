import { checkoutComponents } from '@oryx-frontend/checkout';
import { AppFeature } from '@oryx-frontend/core';
import { mockCheckoutProviders } from './src';

export const mockCheckoutFeature: AppFeature = {
  providers: mockCheckoutProviders,
  components: checkoutComponents,
};
