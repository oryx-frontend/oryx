import { Transformer, TransformerService } from '@oryx-frontend/core';
import { Provider } from '@oryx-frontend/di';
import { combineLatest, Observable } from 'rxjs';
import { DeserializedAddress } from '../';
import { Address } from '../../../../models';
import { AddressNormalizer } from '../address';

export const AddressesNormalizer = 'oryx.AddressesNormalizer*';

export function addressesListNormalizer(
  data: DeserializedAddress[],
  transformer: TransformerService
): Observable<Address[]> {
  return combineLatest(
    data.map((address) => transformer.transform(address, AddressNormalizer))
  );
}

export const addressesNormalizer: Provider[] = [
  {
    provide: AddressesNormalizer,
    useValue: addressesListNormalizer,
  },
];

declare global {
  interface InjectionTokensContractMap {
    [AddressesNormalizer]: Transformer<Address[]>;
  }
}
