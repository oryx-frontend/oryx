import { AppFeature } from '@oryx-frontend/core';
import { userComponents } from '@oryx-frontend/user';
import { mockUserProviders } from './src';

export const mockUserFeature: AppFeature = {
  providers: mockUserProviders,
  components: userComponents,
};
