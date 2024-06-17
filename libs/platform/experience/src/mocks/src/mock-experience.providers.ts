import { injectEnv } from '@oryx-frontend/core';
import { Provider } from '@oryx-frontend/di';
import {
  ComponentsRegistryService,
  ContentBackendUrl,
  DefaultComponentsRegistryService,
  DefaultExperienceDataService,
  DefaultExperienceService,
  DefaultLayoutBuilder,
  DefaultLayoutService,
  DefaultScreenService,
  ExperienceDataService,
  ExperienceService,
  LayoutBuilder,
  LayoutService,
  ScreenService,
  layoutPluginsProviders,
} from '@oryx-frontend/experience';
import { RouterService } from '@oryx-frontend/router';
import { MockRouterService } from './mock-router.service';

export const mockExperienceProviders: Provider[] = [
  {
    provide: ContentBackendUrl,
    useFactory: () => injectEnv('FES_CONTENT_BACKEND_URL', ''),
  },
  {
    provide: RouterService,
    useClass: MockRouterService,
  },
  {
    provide: ExperienceService,
    useClass: DefaultExperienceService,
  },
  {
    provide: ScreenService,
    useClass: DefaultScreenService,
  },
  {
    provide: LayoutService,
    useClass: DefaultLayoutService,
  },
  {
    provide: LayoutBuilder,
    useClass: DefaultLayoutBuilder,
  },
  {
    provide: ComponentsRegistryService,
    useClass: DefaultComponentsRegistryService,
  },
  {
    provide: ExperienceDataService,
    useClass: DefaultExperienceDataService,
  },
  ...layoutPluginsProviders,
];
