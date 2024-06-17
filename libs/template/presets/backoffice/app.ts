import { contentFeature } from '@oryx-frontend/content';
import { AppFeature, coreFeature } from '@oryx-frontend/core';
import { Resources, layoutFeature } from '@oryx-frontend/experience';
import { formFeature } from '@oryx-frontend/form';
import { I18nFeature } from '@oryx-frontend/i18n';
import {
  commonGraphics,
  fontawesomeLink,
  materialDesignLink,
} from '@oryx-frontend/resources';
import { siteFeature } from '@oryx-frontend/site';
import { uiFeature } from '@oryx-frontend/ui';

export const backofficeResources: Resources = {
  graphics: commonGraphics,
  fonts: {
    ...fontawesomeLink,
    ...materialDesignLink,
  },
};

export const backofficeFeatures: AppFeature[] = [
  uiFeature,
  coreFeature,
  formFeature,
  siteFeature,
  layoutFeature,
  contentFeature,
  new I18nFeature({
    locale: {
      locales: [{ name: 'en_US', code: 'en' }],
      defaultLocale: 'en',
    },
  }),
  {
    resources: backofficeResources,
  },
];
