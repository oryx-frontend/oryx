import { multiCartFeature } from '@oryx-frontend/cart';
import { AppFeature } from '@oryx-frontend/core';
import { provideExperienceData } from '@oryx-frontend/experience';
import { storefrontFeatures } from '@oryx-frontend/presets/storefront';
import { contactPage } from './experience/contact-page';
import { HeaderTemplate } from './experience/header';

const StaticB2BExperienceFeature: AppFeature = {
  providers: [provideExperienceData([contactPage, HeaderTemplate])],
};

export const b2bStorefrontFeatures: AppFeature[] = [
  ...storefrontFeatures,
  multiCartFeature,
  StaticB2BExperienceFeature,
];
