import { cartComponents } from '@oryx-frontend/cart';
import { AppFeature } from '@oryx-frontend/core';
import { mockCartProviders } from './src';

export const mockCartFeature: AppFeature = {
  components: cartComponents,
  providers: mockCartProviders,
};
