import { ContentComponentSchema } from '@oryx-frontend/experience';
import { FormFieldType } from '@oryx-frontend/form';
import { IconTypes } from '@oryx-frontend/ui/icon';
import { ProductDescriptionComponent } from './description.component';

export const productDescriptionSchema: ContentComponentSchema<ProductDescriptionComponent> =
  {
    name: 'Product Description',
    group: 'Product',
    icon: IconTypes.Description,
    options: {
      lineClamp: { type: FormFieldType.Number, width: 100 },
      enableToggle: { type: FormFieldType.Boolean },
    },
  };
