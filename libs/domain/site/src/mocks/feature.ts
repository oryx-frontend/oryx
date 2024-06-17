import { AppFeature } from '@oryx-frontend/core';
import { siteComponents } from '@oryx-frontend/site';
import { mockSiteProviders } from './src';

export const mockSiteFeature: AppFeature = {
  providers: mockSiteProviders,
  components: siteComponents,
};
