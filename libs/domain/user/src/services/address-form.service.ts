import { Observable } from 'rxjs';
import { AddressForm } from '../../address-form';
import { AddressFormQualifier } from '../models';

export interface AddressFormService {
  getForm(qualifier: AddressFormQualifier): Observable<AddressForm | null>;
}

export const AddressFormService = 'FES.AddressFormService';

declare global {
  interface InjectionTokensContractMap {
    [AddressFormService]: AddressFormService;
  }
}