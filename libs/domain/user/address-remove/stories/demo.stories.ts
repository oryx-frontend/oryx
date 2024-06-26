import { storybookDefaultViewports } from '@/tools/storybook';
import { resolve } from '@oryx-frontend/di';
import { AddressService } from '@oryx-frontend/user';
import { MockAddressService, MockAddressType } from '@oryx-frontend/user/mocks';
import { Meta, Story } from '@storybook/web-components';
import { TemplateResult, html } from 'lit';
import { storybookPrefix } from '../../.constants';

export default {
  title: `${storybookPrefix}/Address Remove`,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
} as Meta;

const Template: Story = (): TemplateResult => {
  const addressService = resolve(
    AddressService
  ) as unknown as MockAddressService;
  addressService.changeMockAddressType(MockAddressType.One);
  return html`
    <oryx-user-address-remove
      addressId="currentaddressid"
      @oryx.cancel=${console.log}
      @oryx.remove=${console.log}
    ></oryx-user-address-remove>
  `;
};

export const Demo = Template.bind({});

Demo.parameters = {
  chromatic: {
    delay: 2000,
    viewports: [
      storybookDefaultViewports.mobile.min,
      storybookDefaultViewports.desktop.min,
    ],
  },
};
