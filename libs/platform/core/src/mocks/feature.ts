import { AppFeature, coreFeature } from '@oryx-frontend/core';
import { mockCoreProviders } from './src';

export const mockCoreFeature: AppFeature = {
  ...coreFeature,
  providers: [...(coreFeature.providers ?? []), ...mockCoreProviders],
};
