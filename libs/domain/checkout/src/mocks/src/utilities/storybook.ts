import { MockAuthService } from '@oryx-frontend/auth/mocks';
import { resolve } from '@oryx-frontend/di';
import { AddressService } from '@oryx-frontend/user';
import { MockAddressService, MockAddressType } from '@oryx-frontend/user/mocks';

export type BehaviorType = 'guest' | 'no-address' | 'with-address';

export const toggleBehavior = (behavior?: BehaviorType): void => {
  if (!behavior) {
    return;
  }
  const addressService = resolve(
    AddressService
  ) as unknown as MockAddressService;
  const authService = resolve(MockAuthService);

  if (behavior === 'guest') {
    authService.setAuthenticated(false);
  } else {
    authService.setAuthenticated(true);
  }

  if (behavior === 'with-address') {
    addressService.changeMockAddressType(MockAddressType.Two);
  } else {
    addressService.changeMockAddressType(MockAddressType.None);
  }
};
