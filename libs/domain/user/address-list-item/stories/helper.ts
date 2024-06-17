import { resolve } from '@oryx-frontend/di';
import { AddressService } from '@oryx-frontend/user';
import { MockAddressService, MockAddressType } from '@oryx-frontend/user/mocks';
import { TemplateResult, html } from 'lit';
import { when } from 'lit/directives/when.js';
import { UserAddressListItemOptions } from '../address-list-item.model';

export const renderSelector = (
  options: UserAddressListItemOptions = {}
): TemplateResult => {
  const addressService = resolve(
    AddressService
  ) as unknown as MockAddressService;
  addressService.changeMockAddressType(MockAddressType.OneWithDefaults);
  return html`<oryx-user-address-list-item
    addressId="currentaddressid"
    .options=${options}
  >
    ${when(
      options.selectable,
      () => html`<input type="radio" value="currentaddressid" />`
    )}
  </oryx-user-address-list-item>`;
};
