import {
  mockCheckout,
  mockPlaceOrderData,
} from '@oryx-frontend/checkout/mocks';
import { checkoutAttributesSerializer } from './checkout.serializer';

describe('Checkout Serializers', () => {
  describe('Checkout Attributes Serializer', () => {
    it('should transform PostCheckoutProps into Payload', () => {
      const serialized = checkoutAttributesSerializer(mockPlaceOrderData);

      expect(serialized).toEqual(mockCheckout);
    });
  });
});
