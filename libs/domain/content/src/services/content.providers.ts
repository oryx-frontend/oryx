import { provideEntity } from '@oryx-frontend/core';
import { Provider } from '@oryx-frontend/di';
import { ExperienceAdapter } from '@oryx-frontend/experience';
import { ContentExperienceAdapter } from './adapter';
import { cmsProviders } from './cms';
import { ContentContext } from './content-context';
import { ContentService } from './content.service';
import { DefaultContentService } from './default-content.service';
import { DefaultFontService, FontService } from './font';

export const contentProviders: Provider[] = [
  {
    provide: ExperienceAdapter,
    useClass: ContentExperienceAdapter,
  },
  {
    provide: ContentService,
    useClass: DefaultContentService,
  },
  {
    provide: FontService,
    useClass: DefaultFontService,
  },
  provideEntity('content', {
    service: ContentService,
    context: ContentContext.Content,
  }),
  ...cmsProviders,
];
