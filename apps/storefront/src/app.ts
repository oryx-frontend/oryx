import { appBuilder } from '@oryx-frontend/application';
import { multiCartFeature } from '@oryx-frontend/cart';
import { labsFeatures } from '@oryx-frontend/labs';
import { b2bStorefrontFeatures } from '@oryx-frontend/presets/b2b-storefront';
import { storefrontFeatures } from '@oryx-frontend/presets/storefront';
import { storefrontTheme } from '@oryx-frontend/themes';

const env = import.meta.env;

const features = [
  ...(env.ORYX_PRESET && env.ORYX_PRESET === 'b2b'
    ? b2bStorefrontFeatures
    : [
        ...storefrontFeatures,
        ...(env.ORYX_MULTI_CART ? [multiCartFeature] : []),
      ]),
  ...(env.ORYX_LABS ? labsFeatures : []),
];

export const app = appBuilder()
  .withFeature(features)
  .withTheme([storefrontTheme])
  .withEnvironment(env)
  .create();
