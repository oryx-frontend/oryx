import { MockAuthService } from '@oryx-frontend/auth/mocks';
import {
  MockCheckoutDataService,
  mockCarriers,
  mockPayments,
} from '@oryx-frontend/checkout/mocks';
import { resolve } from '@oryx-frontend/di';
import { Meta, Story } from '@storybook/web-components';
import { TemplateResult, html } from 'lit';
import { storybookPrefix } from '../../../.constants';
import { CheckoutDataService } from '../../../src/services';

export default {
  title: `${storybookPrefix}/Orchestrator/Static`,
} as Meta;

const Template: Story = (): TemplateResult => {
  resolve(MockAuthService).setAuthenticated(true);
  resolve<MockCheckoutDataService>(CheckoutDataService).setMock({
    paymentMethods: mockPayments,
    shipments: [{ id: '1', carriers: [mockCarriers[0]] }],
  });

  return html`<oryx-checkout-orchestrator
    uid="singlePage"
  ></oryx-checkout-orchestrator>`;
};

export const Authenticated = Template.bind({});
