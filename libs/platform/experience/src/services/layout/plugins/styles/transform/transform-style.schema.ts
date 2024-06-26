import { FormFieldType } from '@oryx-frontend/form';
import { ContentComponentSchema } from '../../../../../models';

export const schema: ContentComponentSchema = {
  name: 'transform',
  group: 'layout',
  options: {
    rotate: { type: FormFieldType.Text },
    scale: { type: FormFieldType.Text },
  },
};
