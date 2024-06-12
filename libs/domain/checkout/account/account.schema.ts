import { ContentComponentSchema } from '@oryx-frontend/experience';
import { FormFieldType } from '@oryx-frontend/form';
import { CheckoutAccountComponent } from './account.component';

export const checkoutAccountComponentSchema: ContentComponentSchema<CheckoutAccountComponent> =
  {
    name: 'Checkout account',
    group: 'Checkout',
    options: {
      enableGuestCheckout: {
        type: FormFieldType.Boolean,
      },
    },
  };
