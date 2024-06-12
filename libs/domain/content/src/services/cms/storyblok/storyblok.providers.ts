import { injectEnv } from '@oryx-frontend/core';
import { Provider } from '@oryx-frontend/di';
import { featureVersion } from '@oryx-frontend/utilities';
import { storyblokFieldNormalizers } from './normalizers';
import { DefaultStoryblokContentAdapter } from './storyblok-content.adapter';
import {
  StoryblokContentAdapter,
  StoryblokSpace,
  StoryblokToken,
} from './storyblok.model';

export const storyblokProviders: Provider[] =
  featureVersion >= '1.4' &&
  import.meta.env?.ORYX_STORYBLOK_TOKEN &&
  import.meta.env?.ORYX_STORYBLOK_SPACE
    ? [
        {
          provide: StoryblokToken,
          useFactory: () => injectEnv('ORYX_STORYBLOK_TOKEN', ''),
        },
        {
          provide: StoryblokSpace,
          useFactory: () => injectEnv('ORYX_STORYBLOK_SPACE', ''),
        },
        ...storyblokFieldNormalizers,
        {
          provide: StoryblokContentAdapter,
          useClass: DefaultStoryblokContentAdapter,
        },
      ]
    : [];
