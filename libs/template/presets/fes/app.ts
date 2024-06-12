import { AppFeature } from '@oryx-frontend/core';
import { Resources } from '@oryx-frontend/experience';
import { backofficeFeatures } from '@oryx-frontend/presets/backoffice';
import { commonGraphics, materialDesignLink } from '@oryx-frontend/resources';

export const fesResources: Resources = {
  graphics: commonGraphics,
  fonts: materialDesignLink,
};

export const fesFeatures: AppFeature[] = [
  ...backofficeFeatures.filter((f) => !f.resources),
  {
    resources: fesResources,
  },
];
