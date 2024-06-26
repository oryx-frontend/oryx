import { AuthIdentity } from '@oryx-frontend/auth';
import { JsonApiPayload } from '@oryx-frontend/utilities';
import { Observable } from 'rxjs';
import { Address } from '../../models';

export interface AddressRequestProps {
  payload: JsonApiPayload<unknown>;
  identity: AuthIdentity;
}

export interface AddressAdapter {
  getList: () => Observable<Address[]>;
  add: (data: Address) => Observable<Address>;
  update: (data: Address) => Observable<Address>;
  delete: (data: Address) => Observable<unknown>;
}

export const AddressAdapter = 'oryx.AddressAdapter';

declare global {
  interface InjectionTokensContractMap {
    [AddressAdapter]: AddressAdapter;
  }
}
