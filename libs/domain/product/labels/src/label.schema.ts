import { ContentComponentSchema } from '@oryx-frontend/experience';
import { FormFieldType } from '@oryx-frontend/form';
import { IconTypes } from '@oryx-frontend/ui/icon';
import { ProductLabelsComponent } from './label.component';

export const productLabelSchema: ContentComponentSchema<ProductLabelsComponent> =
  {
    name: 'Product Labels',
    group: 'Product',
    icon: IconTypes.Label,
    options: {
      included: { type: FormFieldType.Text },
      excluded: { type: FormFieldType.Text },
      invert: { type: FormFieldType.Boolean },
    },
  };
