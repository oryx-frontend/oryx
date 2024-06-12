import { cartFeature } from '@oryx-frontend/cart';
import { AppFeature, coreFeature } from '@oryx-frontend/core';
import { Resources } from '@oryx-frontend/experience';
import { commonGraphics } from '@oryx-frontend/resources';
import { uiFeature } from '@oryx-frontend/ui';

export const backofficeNgResources: Resources = {
  graphics: commonGraphics,
};

export const backofficeNgFeatures: AppFeature[] = [
  uiFeature,
  cartFeature,
  coreFeature,
  {
    resources: backofficeNgResources,
  },
];
