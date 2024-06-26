import { resolve } from '@oryx-frontend/di';
import { AddressService } from '@oryx-frontend/user';
import { MockAddressService, MockAddressType } from '@oryx-frontend/user/mocks';
import { Meta, Story } from '@storybook/web-components';
import { TemplateResult, html } from 'lit';
import { storybookPrefix } from '../../.constants';

export default {
  title: `${storybookPrefix}/Address/Static`,
} as Meta;

const Template: Story = (): TemplateResult => {
  const addressService = resolve(
    AddressService
  ) as unknown as MockAddressService;
  addressService.changeMockAddressType(MockAddressType.Incomplete);
  return html`
    <h4>Address</h4>
    <oryx-user-address addressId="currentaddressid"></oryx-user-address>

    <h4>Multiline</h4>
    <oryx-user-address
      addressId="currentaddressid"
      .options=${{ multiline: true }}
    ></oryx-user-address>

    <h4>With missed fields</h4>
    <oryx-user-address addressId="uncompleted"></oryx-user-address>

    <h4>With missed fields (multiline)</h4>
    <oryx-user-address
      addressId="uncompleted"
      .options=${{ multiline: true }}
    ></oryx-user-address>
  `;
};

export const Variants = Template.bind({});
