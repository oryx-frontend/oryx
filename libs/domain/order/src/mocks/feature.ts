import { AppFeature } from '@oryx-frontend/core';
import { orderComponents } from '@oryx-frontend/order';
import { mockOrderProviders } from './src';

export const mockOrderFeature: AppFeature = {
  providers: mockOrderProviders,
  components: orderComponents,
};
