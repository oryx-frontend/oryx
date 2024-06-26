import { resolve } from '@oryx-frontend/di';
import { AddressService } from '@oryx-frontend/user';
import {
  MockAddressService,
  MockAddressType,
  mockNormalizedAddresses,
} from '@oryx-frontend/user/mocks';
import { Meta, Story } from '@storybook/web-components';
import { TemplateResult, html } from 'lit';
import { storybookPrefix } from '../../.constants';
import { CheckoutAddressOptions } from '../address.model';

export default {
  title: `${storybookPrefix}/Address`,
  args: {
    enableList: false,
    addressId: mockNormalizedAddresses[0].id,
  },
  argTypes: {
    addressId: {
      options: mockNormalizedAddresses.map((a) => a.id),
      control: { type: 'select' },
      table: { category: 'Demo' },
    },
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
} as Meta;

interface Props extends CheckoutAddressOptions {
  addressId: MockAddressType;
}

const service = resolve<MockAddressService>(AddressService);
service.changeMockAddressType(MockAddressType.ThreeWithDefaults);

const Template: Story<Props> = (props): TemplateResult => {
  return html`<oryx-checkout-address
    .options=${props}
    .addressId=${props.addressId}
  ></oryx-checkout-address> `;
};

export const Demo = Template.bind({});
