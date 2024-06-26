import { resolve } from '@oryx-frontend/di';
import { AddressService } from '@oryx-frontend/user';
import { MockAddressService, MockAddressType } from '@oryx-frontend/user/mocks';
import { Meta, Story } from '@storybook/web-components';
import { TemplateResult, html } from 'lit';
import { storybookPrefix } from '../../.constants';

export default {
  title: `${storybookPrefix}/Shipping address/Static`,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
} as Meta;

const Template: Story<{ type: MockAddressType }> = (args: {
  type: MockAddressType;
}): TemplateResult => {
  const service = resolve<MockAddressService>(AddressService);
  service.changeMockAddressType(args.type);
  return html`<oryx-checkout-shipping-address></oryx-checkout-shipping-address> `;
};

export const None = Template.bind({});
None.args = { type: MockAddressType.None };

export const One = Template.bind({});
One.args = { type: MockAddressType.One };

export const OneWithDefaults = Template.bind({});
OneWithDefaults.args = { type: MockAddressType.OneWithDefaults };

export const OneWithoutDefaults = Template.bind({});
OneWithoutDefaults.args = { type: MockAddressType.OneWithoutDefaults };

export const Two = Template.bind({});
Two.args = { type: MockAddressType.Two };

export const TwoWithoutDefaults = Template.bind({});
TwoWithoutDefaults.args = { type: MockAddressType.TwoWithoutDefaults };

export const Three = Template.bind({});
Three.args = { type: MockAddressType.Three };

export const ThreeWithDefaults = Template.bind({});
ThreeWithDefaults.args = { type: MockAddressType.ThreeWithDefaults };

export const ThreeWithoutDefaults = Template.bind({});
ThreeWithoutDefaults.args = { type: MockAddressType.ThreeWithoutDefaults };

export const LongList = Template.bind({});
LongList.args = { type: MockAddressType.LongList };

export const Incomplete = Template.bind({});
Incomplete.args = { type: MockAddressType.Incomplete };
