import { resolve } from '@oryx-frontend/di';
import { AddressService } from '@oryx-frontend/user';
import { MockAddressService, MockAddressType } from '@oryx-frontend/user/mocks';
import { Meta, Story } from '@storybook/web-components';
import { TemplateResult, html } from 'lit';
import { storybookPrefix } from '../../.constants';

export default {
  title: `${storybookPrefix}/Shipping address`,
  args: {
    addresses: MockAddressType.Two,
  },
  argTypes: {
    addresses: {
      options: Object.values(MockAddressType),
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

interface Props {
  addresses: MockAddressType;
}

const Template: Story<Props> = (props): TemplateResult => {
  const service = resolve<MockAddressService>(AddressService);
  service.changeMockAddressType(props.addresses);
  return html`<oryx-checkout-shipping-address></oryx-checkout-shipping-address> `;
};

export const Demo = Template.bind({});
