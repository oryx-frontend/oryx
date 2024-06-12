import { Transformer } from '@oryx-frontend/core';
import { Provider } from '@oryx-frontend/di';
import { DeserializedAddress } from '..';
import { Address } from '../../../../models';

export const AddressNormalizer = 'oryx.AddressNormalizer*';

export function addressAttributesNormalizer(
  data: DeserializedAddress
): Address {
  return Object.entries(data).reduce(
    (acc, [key, value]) => ({
      ...acc,
      ...(value !== null && { [key]: value }),
    }),
    {}
  );
}

export const addressNormalizer: Provider[] = [
  {
    provide: AddressNormalizer,
    useValue: addressAttributesNormalizer,
  },
];

declare global {
  interface InjectionTokensContractMap {
    [AddressNormalizer]: Transformer<Address>[];
  }
}
