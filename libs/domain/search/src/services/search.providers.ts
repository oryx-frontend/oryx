import { PageMetaResolver } from '@oryx-frontend/core';
import { Provider } from '@oryx-frontend/di';
import { ExperienceDataRevealer } from '@oryx-frontend/experience';
import { provideLitRoutes } from '@oryx-frontend/router/lit';
import { featureVersion } from '@oryx-frontend/utilities';
import { facetProviders } from '../renderers';
import {
  ContentSuggestionAdapter,
  DefaultSuggestionAdapter,
  SuggestionAdapter,
  SuggestionField,
  suggestionNormalizer,
} from './adapter';
import { DefaultFacetListService } from './default-facet-list.service';
import { DefaultSortingService } from './default-sorting.service';
import { FacetListService } from './facet-list.service';
import {
  CategoryBreadcrumb,
  CategoryPageTitleMetaResolver,
  SearchPageTitleMetaResolver,
} from './resolvers';
import {
  ProductsExperienceDataRevealer,
  SuggestionExperienceDataRevealer,
} from './revealers';
import { categoryRoutes } from './routes';
import { SortingService } from './sorting.service';
import {
  DefaultSuggestionRendererService,
  DefaultSuggestionService,
  SuggestionRenderer,
  SuggestionRendererService,
  SuggestionService,
  defaultSuggestionRenderer,
  productSuggestionRenderer,
} from './suggestion';

export const searchProviders: Provider[] = [
  {
    provide: SuggestionAdapter,
    useClass: DefaultSuggestionAdapter,
  },
  featureVersion >= '1.4'
    ? {
        provide: SuggestionAdapter,
        useClass: ContentSuggestionAdapter,
      }
    : ({} as Provider),
  {
    provide: SuggestionService,
    useClass: DefaultSuggestionService,
  },
  {
    provide: FacetListService,
    useClass: DefaultFacetListService,
  },
  {
    provide: SortingService,
    useClass: DefaultSortingService,
  },
  ...facetProviders,
  ...suggestionNormalizer,
  {
    provide: PageMetaResolver,
    useClass: CategoryPageTitleMetaResolver,
  },
  {
    provide: PageMetaResolver,
    useClass: SearchPageTitleMetaResolver,
  },
  {
    provide: SuggestionRendererService,
    useClass: DefaultSuggestionRendererService,
  },
  {
    provide: SuggestionRenderer,
    useValue: {
      default: defaultSuggestionRenderer,
      [SuggestionField.Products]: productSuggestionRenderer,
    },
  },
  CategoryBreadcrumb,
  ...(featureVersion >= '1.4'
    ? []
    : provideLitRoutes({ routes: categoryRoutes })),
];

export const searchPreviewProviders: Provider[] = [
  {
    provide: ExperienceDataRevealer,
    useClass: ProductsExperienceDataRevealer,
  },
  {
    provide: ExperienceDataRevealer,
    useClass: SuggestionExperienceDataRevealer,
  },
];
