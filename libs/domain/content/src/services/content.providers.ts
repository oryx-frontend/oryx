import { Provider } from '@oryx-frontend/di';
import { ExperienceAdapter } from '@oryx-frontend/experience';
import { ContentExperienceAdapter } from './adapter';
import {
  contentfulProviders,
  storyblokProviders,
  strapiProviders,
} from './cms';
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
  ...contentfulProviders,
  ...storyblokProviders,
  ...strapiProviders,
];
