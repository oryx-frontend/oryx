import { ContentComponentSchema } from '@oryx-frontend/experience';
import { FormFieldType } from '@oryx-frontend/form';
export const schema: ContentComponentSchema = {
  name: 'collapsible',
  group: 'layout',
  buckets: {
    prefix: ['label'],
  },
  options: {
    collapsibleOpen: {
      type: FormFieldType.Boolean,
    },
  },
};
