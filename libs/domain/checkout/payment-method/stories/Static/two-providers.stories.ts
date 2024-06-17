import { CheckoutDataService } from '@oryx-frontend/checkout';
import {
  MockCheckoutDataService,
  mockPayments,
} from '@oryx-frontend/checkout/mocks';
import { resolve } from '@oryx-frontend/di';
import { Meta, Story } from '@storybook/web-components';
import { TemplateResult, html } from 'lit';
import { storybookPrefix } from '../../../.constants';

export default { title: `${storybookPrefix}/Payment/Static` } as Meta;

const Template: Story = (): TemplateResult => {
  resolve<MockCheckoutDataService>(CheckoutDataService).setMock({
    paymentMethods: [mockPayments[0], mockPayments[1]],
  });

  return html`<oryx-checkout-payment-method></oryx-checkout-payment-method>`;
};
export const TwoProvidersMethod = Template.bind({});
