import { FormFieldType } from '@oryx-frontend/form';
import { ContentComponentSchema } from '../../../../../models';

export const schema: ContentComponentSchema = {
  name: 'typography',
  group: 'layout',
  options: {
    typography: { type: FormFieldType.Text },
  },
};
