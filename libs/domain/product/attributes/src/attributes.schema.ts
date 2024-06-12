import { ContentComponentSchema } from '@oryx-frontend/experience';
import { FormFieldType } from '@oryx-frontend/form';
import { IconTypes } from '@oryx-frontend/ui/icon';
import { ProductAttributesComponent } from './attributes.component';

export const productAttributesSchema: ContentComponentSchema<ProductAttributesComponent> =
  {
    name: 'Product Attributes',
    group: 'Product',
    icon: IconTypes.List,
    options: {
      columnCount: {
        type: FormFieldType.Number,
        min: 1,
      },
    },
  };
