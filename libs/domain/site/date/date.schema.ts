import { ContentComponentSchema } from '@oryx-frontend/experience';
import { DateComponent } from './date.component';

export const siteDateSchema: ContentComponentSchema<DateComponent> = {
  name: 'Date',
  group: 'Site',
  icon: 'event',
};
