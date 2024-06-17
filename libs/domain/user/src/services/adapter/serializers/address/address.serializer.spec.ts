import { mockAddress } from '@oryx-frontend/user/mocks';
import { addressAttributesSerializer } from './address.serializer';

describe('Address Serializers', () => {
  describe('Address Attributes Serializer', () => {
    it('should transform Address into Payload', () => {
      const mockResult = {
        type: 'addresses',
        attributes: mockAddress,
      };

      const serialized = addressAttributesSerializer(mockAddress);
      expect(serialized).toEqual(mockResult);
    });
  });
});
