import { resolve } from '@oryx-frontend/di';
import { AddressService } from '@oryx-frontend/user';
import {
  MockAddressService,
  MockAddressType,
  mockNormalizedAddresses,
} from '@oryx-frontend/user/mocks';
import { Meta, Story } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';
import { storybookPrefix } from '../../.constants';

export default {
  title: `${storybookPrefix}/Address`,
} as Meta;

const service = resolve<MockAddressService>(AddressService);
service.changeMockAddressType(MockAddressType.ThreeWithDefaults);

const Template: Story = (): TemplateResult => {
  return html`
    <h3>Multiline</h3>
    <oryx-checkout-address
      .options=${{ enableList: false }}
      .addressId=${mockNormalizedAddresses[0].id}
    ></oryx-checkout-address>

    <h3>Multiline - no addressId</h3>
    <oryx-checkout-address
      .options=${{ enableList: false }}
    ></oryx-checkout-address>

    <h3>List</h3>
    <oryx-checkout-address
      .options=${{ enableList: true }}
      .addressId=${mockNormalizedAddresses[0].id}
    ></oryx-checkout-address>

    <h3>List - no addressId</h3>
    <oryx-checkout-address
      .options=${{ enableList: true }}
    ></oryx-checkout-address>
  `;
};

export const Static = Template.bind({});
