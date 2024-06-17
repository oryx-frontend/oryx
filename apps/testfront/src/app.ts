import { appBuilder } from '@oryx-frontend/application';
import { storefrontFeatures } from '@oryx-frontend/presets/storefront';
import { storefrontTheme } from '@oryx-frontend/themes';

export const app = appBuilder()
  .withFeature(storefrontFeatures)
  .withTheme(storefrontTheme)
  .withEnvironment(import.meta.env)
  .create();
