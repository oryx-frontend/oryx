import { ContentComponentSchema } from '@oryx-frontend/experience';
import { FormFieldType } from '@oryx-frontend/form';
import { CartTotalsTotalComponent } from './total.component';

export const cartTotalsTotalComponentSchema: ContentComponentSchema<CartTotalsTotalComponent> =
  {
    name: 'Cart totals total',
    group: 'Cart',
    options: {
      enableTaxMessage: { type: FormFieldType.Boolean },
    },
  };
