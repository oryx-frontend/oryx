import { PageMetaResolver, provideEntity } from '@oryx-frontend/core';
import { Provider } from '@oryx-frontend/di';
import { Content, ContentQualifier, cmsTypes } from '../../models';
import {
  CmsPageDescriptionMetaResolver,
  CmsPageTitleMetaResolver,
} from '../../resolvers';
import { ContentConfig } from '../adapter';
import { ContentService } from '../content.service';
import { CmsQualifierContextFallback } from './cms-context';
import { contentfulProviders } from './contentful';
import { storyblokProviders } from './storyblok';
import { strapiProviders } from './strapi';

export const cmsProviders: Provider[] = [
  ...contentfulProviders,
  ...storyblokProviders,
  ...strapiProviders,
  CmsQualifierContextFallback,
  {
    provide: PageMetaResolver,
    useClass: CmsPageTitleMetaResolver,
  },
  {
    provide: PageMetaResolver,
    useClass: CmsPageDescriptionMetaResolver,
  },
  {
    provide: ContentConfig,
    useValue: {
      storyblok: {
        types: ['component', 'faq', 'contents'],
      },
      strapi: {
        types: ['component', 'about', 'contents'],
        defaultType: 'about',
      },
      contentful: {
        types: ['component', 'article', 'contents'],
      },
    },
  },
  ...cmsTypes.map((type) =>
    provideEntity<Content | null | undefined, ContentQualifier>(type, {
      service: ContentService,
      context: 'content',
      get: (service, qualifier) =>
        (service as ContentService).get({ ...qualifier, type }),
    })
  ),
];
