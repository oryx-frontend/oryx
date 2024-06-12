import { ApiCheckoutModel, PlaceOrderData } from '@oryx-frontend/checkout';
import { checkoutAttributesSerializer } from './checkout.serializer';

export function checkoutDataAttributesSerializer(
  data: PlaceOrderData
): Partial<ApiCheckoutModel.CheckoutDataPayload> {
  return {
    ...checkoutAttributesSerializer(data),
    type: 'checkout-data',
  };
}
