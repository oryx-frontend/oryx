import { ContentComponentSchema } from '@oryx-frontend/experience';
import { SiteDayComponent } from './day.component';

export const siteDaySchema: ContentComponentSchema<SiteDayComponent> = {
  name: 'Day',
  group: 'Site',
  icon: 'event',
};
