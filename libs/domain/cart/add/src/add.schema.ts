import { ContentComponentSchema } from '@oryx-frontend/experience';
import { FormFieldType } from '@oryx-frontend/form';
import { IconTypes } from '@oryx-frontend/ui/icon';
import { CartAddComponent } from './add.component';

export const cartAddComponentSchema: ContentComponentSchema<CartAddComponent> =
  {
    name: 'Add to Cart',
    group: 'Cart',
    icon: IconTypes.CartAdd,
    options: {
      hideQuantityInput: {
        type: FormFieldType.Boolean,
      },
      outlined: {
        type: FormFieldType.Boolean,
      },
    },
  };
