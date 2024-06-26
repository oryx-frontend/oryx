import {
  Content,
  ContentConfig,
  ContentQualifier,
  ContentService,
} from '@oryx-frontend/content';
import { PageMetaResolver, provideEntity } from '@oryx-frontend/core';
import { Provider } from '@oryx-frontend/di';
import { provideExperienceData } from '@oryx-frontend/experience';
import { ArticleQualifierContextFallback } from './article-context';
import { experienceArticlePages } from './article-page';
import { articleTypes } from './article-types';
import {
  ArticlePageDescriptionMetaResolver,
  ArticlePageTitleMetaResolver,
} from './resolvers';

export const articleProviders: Provider[] = [
  ArticleQualifierContextFallback,
  provideExperienceData(experienceArticlePages),
  {
    provide: PageMetaResolver,
    useClass: ArticlePageTitleMetaResolver,
  },
  {
    provide: PageMetaResolver,
    useClass: ArticlePageDescriptionMetaResolver,
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
  ...articleTypes.map((type) =>
    provideEntity<Content | null | undefined, ContentQualifier>(type, {
      service: ContentService,
      context: type,
      get: (service, qualifier) =>
        (service as ContentService).get({ ...qualifier, type }),
    })
  ),
];
