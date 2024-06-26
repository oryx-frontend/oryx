import { ContentComponentSchema } from '@oryx-frontend/experience';
import { FormFieldType } from '@oryx-frontend/form';
import { IconTypes } from '@oryx-frontend/ui/icon';
import { Size } from '@oryx-frontend/utilities';
import { ProductAverageRatingComponent } from './average-rating.component';

export const productAverageRatingSchema: ContentComponentSchema<ProductAverageRatingComponent> =
  {
    name: 'Product Average Rating',
    group: 'Product',
    icon: IconTypes.Star,
    options: {
      enableCount: { type: FormFieldType.Boolean, width: 100 },
      size: {
        type: FormFieldType.Select,
        options: [{ value: Size.Sm }, { value: Size.Lg }],
      },
    },
  };
