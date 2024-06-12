import { AppFeature } from '@oryx-frontend/core';
import * as components from './components';

export const productComponents = Object.values(components);

export const bazaarvoiceFeature: AppFeature = {
  components: productComponents,
};
