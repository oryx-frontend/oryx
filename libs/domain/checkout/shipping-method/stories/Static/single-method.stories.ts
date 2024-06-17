import { CheckoutDataService, Shipment } from '@oryx-frontend/checkout';
import {
  MockCheckoutDataService,
  mockShipments,
} from '@oryx-frontend/checkout/mocks';
import { resolve } from '@oryx-frontend/di';
import { Meta, Story } from '@storybook/web-components';
import { TemplateResult, html } from 'lit';
import { storybookPrefix } from '../../../.constants';

export default { title: `${storybookPrefix}/Shipment/Static` } as Meta;

const mock: Partial<Shipment>[] = [
  {
    id: '1',
    carriers: [
      {
        shipmentMethods: [mockShipments[0]],
      },
    ],
  },
];

const Template: Story = (): TemplateResult => {
  resolve<MockCheckoutDataService>(CheckoutDataService).setMock({
    shipments: mock,
  });

  return html`<oryx-checkout-shipping-method></oryx-checkout-shipping-method>`;
};

export const SingleMethod = Template.bind({});
