import { injectEnv, PageMetaResolver } from '@oryx-frontend/core';
import { Provider } from '@oryx-frontend/di';
import {
  AppReadyExperienceDataRevealer,
  ColorModeExperienceDataRevealer,
  DefaultExperienceDataClientService,
  ExperienceDataClientService,
  ExperienceDataRevealer,
  GraphicsExperienceDataRevealer,
  LayoutExperienceDataRevealer,
  OptionsExperienceDataRevealer,
  SchemaExperienceDataRevealer,
} from './data-client';
import {
  DefaultExperienceService,
  ExperienceService,
  PreviewExperienceService,
} from './experience';
import {
  DefaultExperienceDataService,
  ExperienceDataService,
} from './experience-data';
import { experienceRoutesProvider } from './experience-data/experience-routes-provider';
import { ContentBackendUrl } from './experience-tokens';
import {
  DefaultLayoutBuilder,
  DefaultLayoutService,
  DefaultScreenService,
  LayoutBuilder,
  layoutPluginsProviders,
  LayoutService,
  ScreenService,
} from './layout';
import {
  ComponentsRegistryService,
  DefaultComponentsRegistryService,
} from './registry';
import { ContentPageMetaResolver } from './resolvers';

declare global {
  interface AppEnvironment {
    readonly FES_CONTENT_BACKEND_URL?: string;
  }
}

export const layoutProviders: Provider[] = [
  {
    provide: ScreenService,
    useClass: DefaultScreenService,
  },
  {
    provide: LayoutBuilder,
    useClass: DefaultLayoutBuilder,
  },
  {
    provide: LayoutService,
    useClass: DefaultLayoutService,
  },
  ...layoutPluginsProviders,
];

export const experienceProviders: Provider[] = [
  {
    provide: ContentBackendUrl,
    useFactory: () => injectEnv('FES_CONTENT_BACKEND_URL', ''),
  },
  {
    provide: ExperienceService,
    useClass: DefaultExperienceService,
  },
  {
    provide: ComponentsRegistryService,
    useClass: DefaultComponentsRegistryService,
  },
  {
    provide: PageMetaResolver,
    useClass: ContentPageMetaResolver,
  },
  {
    provide: ExperienceDataService,
    useClass: DefaultExperienceDataService,
  },
  ...layoutProviders,
  experienceRoutesProvider,
];

export const experiencePreviewProviders: Provider[] = [
  {
    provide: ExperienceDataClientService,
    useClass: DefaultExperienceDataClientService,
  },
  {
    provide: ExperienceService,
    useClass: PreviewExperienceService,
  },
  {
    provide: ExperienceDataRevealer,
    useClass: SchemaExperienceDataRevealer,
  },
  {
    provide: ExperienceDataRevealer,
    useClass: AppReadyExperienceDataRevealer,
  },
  {
    provide: ExperienceDataRevealer,
    useClass: GraphicsExperienceDataRevealer,
  },
  {
    provide: ExperienceDataRevealer,
    useClass: OptionsExperienceDataRevealer,
  },
  {
    provide: ExperienceDataRevealer,
    useClass: ColorModeExperienceDataRevealer,
  },
  {
    provide: ExperienceDataRevealer,
    useClass: LayoutExperienceDataRevealer,
  },
  experienceRoutesProvider,
];
