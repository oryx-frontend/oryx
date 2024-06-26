import { resolve } from '@oryx-frontend/di';
import { AddressService } from '@oryx-frontend/user';
import {
  MockAddressService,
  MockAddressType,
  mockCurrentAddress,
  uncompletedAddress,
} from '@oryx-frontend/user/mocks';
import { Meta, Story } from '@storybook/web-components';
import { TemplateResult, html } from 'lit';
import { storybookPrefix } from '../../.constants';
import { UserAddressAddButtonOptions } from '../address-add-button.model';

export default {
  title: `${storybookPrefix}/Address Add Button`,
  args: {
    target: 'modal',
    addressId: 'currentaddressid',
  },
  argTypes: {
    target: {
      control: { type: 'select' },
      options: ['link', 'modal', 'inline'],
    },
    addressId: {
      options: [mockCurrentAddress, uncompletedAddress].map(({ id }) => id),
      control: { type: 'select' },
    },
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
} as Meta;

const Template: Story<UserAddressAddButtonOptions & { addressId?: string }> = (
  props
): TemplateResult => {
  resolve<MockAddressService>(AddressService).changeMockAddressType(
    MockAddressType.Incomplete
  );
  return html`<oryx-user-address-add-button
    .options=${props}
  ></oryx-user-address-add-button>`;
};

export const Demo = Template.bind({});
