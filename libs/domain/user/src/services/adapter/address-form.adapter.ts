import { AddressForm } from '@oryx-frontend/user/address-form';
import { Observable } from 'rxjs';
import { AddressFormQualifier } from '../../models';

export interface AddressFormAdapter {
  get: (qualifier: AddressFormQualifier) => Observable<AddressForm>;
}

export const AddressFormAdapter = 'oryx.AddressFormAdapter';

declare global {
  interface InjectionTokensContractMap {
    [AddressFormAdapter]: AddressFormAdapter;
  }
}
