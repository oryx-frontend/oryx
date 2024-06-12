import { ContentComponentSchema } from '@oryx-frontend/experience';
import { CheckoutBillingAddressComponent } from './billing-address.component';

export const checkoutBillingAddressSchema: ContentComponentSchema<CheckoutBillingAddressComponent> =
  {
    name: 'Checkout Billing Address',
    group: 'Checkout',
  };
