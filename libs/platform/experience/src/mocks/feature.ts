import { AppFeature } from '@oryx-frontend/core';
import { experienceFeature } from '@oryx-frontend/experience';
import { mockExperienceProviders } from './src';

export const mockExperienceFeature: AppFeature = {
  components: experienceFeature.components,
  providers: mockExperienceProviders,
};
