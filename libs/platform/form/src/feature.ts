// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AppFeature } from '@oryx-frontend/core';
import { formProviders } from './renderers';

export const formFeature: AppFeature = {
  providers: formProviders,
};
