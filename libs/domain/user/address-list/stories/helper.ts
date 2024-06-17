import { resolve } from '@oryx-frontend/di';
import { AddressService } from '@oryx-frontend/user';
import {
  AddressDefaults,
  UserAddressListItemOptions,
} from '@oryx-frontend/user/address-list-item';
import { MockAddressService, MockAddressType } from '@oryx-frontend/user/mocks';
import { TemplateResult, html } from 'lit';

export const renderSelector = (
  type: MockAddressType,
  props: UserAddressListItemOptions = {}
): TemplateResult => {
  const addressService = resolve(
    AddressService
  ) as unknown as MockAddressService;
  addressService.changeMockAddressType(type);
  return html`<oryx-user-address-list
    .options=${{
      addressDefaults: AddressDefaults.All,
      selectable: false,
      editable: true,
      removable: true,
      ...props,
    }}
    @oryx.edit=${console.log}
    @oryx.remove=${console.log}
  ></oryx-user-address-list>`;
};
