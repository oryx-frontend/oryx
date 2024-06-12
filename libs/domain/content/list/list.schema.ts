import { ContentComponentSchema } from '@oryx-frontend/experience';
import { FormFieldType } from '@oryx-frontend/form';
import { IconTypes } from '@oryx-frontend/ui/icon';
import { ContentListComponent } from './list.component';

export const contentListSchema: ContentComponentSchema<ContentListComponent> = {
  name: 'List',
  group: 'Content',
  icon: IconTypes.List,
  options: {
    query: { type: FormFieldType.Text },
    tags: { type: FormFieldType.Text },
    type: { type: FormFieldType.Text },
    context: { type: FormFieldType.Text },
    field: { type: FormFieldType.Text },
    behavior: {
      type: FormFieldType.Select,
      options: [{ value: 'type' }, { value: 'query' }, { value: 'tags' }],
    },
  },
};
