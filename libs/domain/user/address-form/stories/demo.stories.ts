import { Address } from '@oryx-frontend/user';
import { mockNormalizedAddresses } from '@oryx-frontend/user/mocks';
import { Meta, Story } from '@storybook/web-components';
import { TemplateResult, html } from 'lit';
import { storybookPrefix } from '../../.constants';
import {
  AddressFormAttributes,
  AddressFormOptions,
} from '../address-form.model';

const countries = ['DE', 'US', 'AT', 'PT', 'ES'];

export default {
  title: `${storybookPrefix}/Address Form`,
  args: {
    country: 'DE',
    enableDefaultShipping: false,
    enableDefaultBilling: false,
    fallbackCountry: 'DE',
  },
  argTypes: {
    country: {
      control: { type: 'select' },
      options: countries,
    },
    fallbackCountry: {
      control: { type: 'select' },
      options: countries,
    },
    address: {
      control: { type: 'select' },
      options: mockNormalizedAddresses.reduce(
        (acc, address) => ({
          ...acc,
          [address.id as string]: address,
        }),
        { empty: {} }
      ),
    },
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
} as Meta;

interface Props extends AddressFormAttributes, AddressFormOptions {
  address?: Address;
}

const Template: Story<Props> = (props): TemplateResult => {
  return html`<oryx-user-address-form
    .values=${props.address}
    .country="${props.country}"
    .enableDefaultShipping=${props.enableDefaultShipping}
    .enableDefaultBilling=${props.enableDefaultBilling}
    .options=${{ fallbackCountry: props.fallbackCountry }}
    style="--oryx-column-grid: 2"
  ></oryx-user-address-form>`;
};

export const Demo = Template.bind({});
