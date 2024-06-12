import { AppFeature } from '@oryx-frontend/core';
import { searchComponents } from '@oryx-frontend/search';
import { mockSearchProviders } from './src';

export const mockSearchFeature: AppFeature = {
  components: searchComponents,
  providers: mockSearchProviders,
};
