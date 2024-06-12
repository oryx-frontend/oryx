import { AppFeature } from '@oryx-frontend/core';
import { productComponents } from '@oryx-frontend/product';
import { mockProductProviders } from './src/mock-product.providers';

export const mockProductFeature: AppFeature = {
  components: productComponents,
  providers: mockProductProviders,
};
