import { CheckoutResponse } from '@oryx-frontend/checkout';

export function checkoutResponseAttributesNormalizer(
  data: CheckoutResponse
): Partial<CheckoutResponse> {
  return data ?? {};
}
