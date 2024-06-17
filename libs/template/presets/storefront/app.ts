import {
  ThemeMetaInitializer,
  applicationFeature,
} from '@oryx-frontend/application';
import {
  SapiAuthComponentsFeature,
  SapiAuthFeature,
} from '@oryx-frontend/auth';
import { cartFeature } from '@oryx-frontend/cart';
import { checkoutFeature } from '@oryx-frontend/checkout';
import { contentFeature } from '@oryx-frontend/content';
import { AppFeature, coreFeature } from '@oryx-frontend/core';
import { coreServerProviders } from '@oryx-frontend/core/server';
import {
  Resources,
  experienceFeature,
  experiencePreviewFeature,
  experienceRoutesFeature,
} from '@oryx-frontend/experience';
import { formFeature } from '@oryx-frontend/form';
import { I18nFeature } from '@oryx-frontend/i18n';
import { orderFeature } from '@oryx-frontend/order';
import { productFeature } from '@oryx-frontend/product';
import {
  brandGraphics,
  commonGraphics,
  materialDesignLink,
} from '@oryx-frontend/resources';
import { RouterFeature } from '@oryx-frontend/router';
import { searchFeature, searchPreviewProviders } from '@oryx-frontend/search';
import { siteFeature } from '@oryx-frontend/site';
import { uiFeature } from '@oryx-frontend/ui';
import { userFeature } from '@oryx-frontend/user';
import { featureVersion } from '@oryx-frontend/utilities';
import { isServer } from 'lit';
import 'urlpattern-polyfill';
import { StaticExperienceFeature } from './experience';
import { StorefrontMetaInitializer } from './meta.initializer';

const isPreview = new URLSearchParams(
  new URL(globalThis.location?.href).search
).has('ebPreview');

export const storefrontResources: Resources = {
  graphics: { ...commonGraphics, ...brandGraphics },
  fonts: materialDesignLink,
};

export const storefrontFeatures: AppFeature[] = [
  uiFeature,
  coreFeature,
  new SapiAuthFeature(),
  new SapiAuthComponentsFeature(),
  new RouterFeature(),
  new I18nFeature(),
  cartFeature,
  checkoutFeature,
  orderFeature,
  contentFeature,
  formFeature,
  experienceFeature,
  experienceRoutesFeature,
  isPreview ? experiencePreviewFeature : {},
  productFeature,
  searchFeature,
  siteFeature,
  applicationFeature,
  userFeature,
  isServer ? { providers: coreServerProviders } : {},
  isPreview ? { providers: searchPreviewProviders } : {},
  featureVersion >= '1.3'
    ? {
        providers: [
          {
            provide: ThemeMetaInitializer,
            useClass: StorefrontMetaInitializer,
          },
        ],
      }
    : [],
  {
    resources: storefrontResources,
  },
  StaticExperienceFeature,
];
