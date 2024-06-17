import { ContentComponentSchema } from '@oryx-frontend/experience';
import { FormFieldType } from '@oryx-frontend/form';
import { ContentTextComponent } from './text.component';

export const contentTextSchema: ContentComponentSchema<ContentTextComponent> = {
  name: 'Text',
  group: 'Content',
  icon: 'wysiwyg',
  options: { autoInstallFont: { type: FormFieldType.Boolean } },
  content: { text: { type: FormFieldType.Text } },
};
