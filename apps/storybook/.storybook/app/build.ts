import { appBuilder } from '@oryx-frontend/application';
import { MockAuthFeature } from '@oryx-frontend/auth/mocks';
import { multiCartFeature } from '@oryx-frontend/cart';
import { mockCartFeature } from '@oryx-frontend/cart/mocks';
import { mockCheckoutFeature } from '@oryx-frontend/checkout/mocks';
import { contentFeature } from '@oryx-frontend/content';
import { mockCoreFeature } from '@oryx-frontend/core/mocks';
import { mockExperienceFeature } from '@oryx-frontend/experience/mocks';
import { formFeature } from '@oryx-frontend/form';
import { I18nFeature } from '@oryx-frontend/i18n';
import { mockOfflineFeature } from '@oryx-frontend/offline/mocks';
import { mockOrderFeature } from '@oryx-frontend/order/mocks';
import { mockProductFeature } from '@oryx-frontend/product/mocks';
import { mockSearchFeature } from '@oryx-frontend/search/mocks';
import { mockSiteFeature } from '@oryx-frontend/site/mocks';
import { uiFeature } from '@oryx-frontend/ui';
import { mockUserFeature } from '@oryx-frontend/user/mocks';
import isChromatic from 'chromatic/isChromatic';
import { chromaticStyledComponents } from './chromatic-styles';
import { resource, theme } from './data';
import { StorybookPlugin } from './plugin';
import {
  ORYX_STORYBOOK_RESOURCE,
  ORYX_STORYBOOK_THEME,
  getActiveData,
} from './utils';

const themeKey = (getActiveData(ORYX_STORYBOOK_THEME) ??
  theme.default) as keyof typeof theme.list;
const resourceKey = (getActiveData(ORYX_STORYBOOK_RESOURCE) ??
  resource.default) as keyof typeof resource.list;
const themes = theme.list[themeKey];
const resources = resource.list[resourceKey];

const builder = appBuilder()
  .with(new StorybookPlugin())
  .withAppOptions({
    components: {
      root: 'body',
      preload: true,
    },
  })
  .withFeature(mockExperienceFeature)
  .withFeature(uiFeature)
  .withFeature(formFeature)
  .withFeature(mockCoreFeature)
  .withFeature(mockCartFeature)
  .withFeature(multiCartFeature)
  .withFeature(mockCheckoutFeature)
  .withFeature(mockOrderFeature)
  .withFeature(contentFeature)
  .withFeature(mockOfflineFeature)
  .withFeature(mockProductFeature)
  .withFeature(mockSearchFeature)
  .withFeature(mockSiteFeature)
  .withFeature(mockUserFeature)
  .withFeature(new I18nFeature())
  .withFeature(new MockAuthFeature())
  .withTheme(themes)
  .withResources(resources);

if (isChromatic()) {
  builder.withComponents(chromaticStyledComponents);
}

builder.create();
