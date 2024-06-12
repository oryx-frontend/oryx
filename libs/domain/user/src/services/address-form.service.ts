import { AddressForm } from '@oryx-frontend/user/address-form';
import { Observable } from 'rxjs';
import { AddressFormQualifier } from '../models';

export interface AddressFormService {
  getForm(qualifier: AddressFormQualifier): Observable<AddressForm | null>;
}

export const AddressFormService = 'oryx.AddressFormService';

declare global {
  interface InjectionTokensContractMap {
    [AddressFormService]: AddressFormService;
  }
}
