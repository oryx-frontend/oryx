import { ContentComponentSchema } from '@oryx-frontend/experience';
import { FormFieldType } from '@oryx-frontend/form';
import { IconTypes } from '@oryx-frontend/ui/icon';
import { DataLinkComponent } from './data-link.component';

export const dataLinkSchema: ContentComponentSchema<DataLinkComponent> = {
  name: 'Data link',
  group: 'Experience',
  icon: IconTypes.Link,
  options: {
    field: { type: FormFieldType.Text },
    entity: { type: FormFieldType.Text },
  },
};
