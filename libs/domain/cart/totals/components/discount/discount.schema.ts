import { ContentComponentSchema } from '@oryx-frontend/experience';
import { FormFieldType } from '@oryx-frontend/form';
import { DiscountRowsAppearance } from './discount.model';

export const cartTotalsDiscountComponentSchema: ContentComponentSchema = {
  name: 'Cart totals dicount',
  group: 'Cart',
  options: {
    discountRowsAppearance: {
      type: FormFieldType.Select,
      options: [
        { value: DiscountRowsAppearance.None },
        { value: DiscountRowsAppearance.Inline },
        { value: DiscountRowsAppearance.Collapsed },
        { value: DiscountRowsAppearance.Expanded },
      ],
    },
  },
};
