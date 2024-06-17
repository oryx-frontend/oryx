import { ContentComponentSchema } from '@oryx-frontend/experience';
import { FormFieldType } from '@oryx-frontend/form';
import { IconTypes } from '@oryx-frontend/ui/icon';
import { DataImageComponent } from './data-image.component';

export const dataImageSchema: ContentComponentSchema<DataImageComponent> = {
  name: 'Data Image',
  group: 'Experience',
  icon: IconTypes.Image,
  options: {
    field: { type: FormFieldType.Text },
    entity: { type: FormFieldType.Text },
    renderFallback: { type: FormFieldType.Boolean, width: 100 },
  },
};
