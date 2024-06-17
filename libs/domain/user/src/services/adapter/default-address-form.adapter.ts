import { HttpService } from '@oryx-frontend/core';
import { inject } from '@oryx-frontend/di';
import { AddressForm } from '@oryx-frontend/user/address-form';
import { Observable } from 'rxjs';
import { AddressFormQualifier } from '../../models';
import { AddressFormAdapter } from './address-form.adapter';

export class DefaultAddressFormAdapter implements AddressFormAdapter {
  constructor(protected httpService = inject(HttpService)) {}

  get(qualifier: AddressFormQualifier): Observable<AddressForm> {
    return this.httpService.get<AddressForm>(
      `${location.origin}/assets/addresses/${qualifier.country}.json`
    );
  }
}
