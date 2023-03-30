import { Meta, Story } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';
import { storybookPrefix } from '../../../../.constants';

export default {
  title: `${storybookPrefix}/Cart totals/components/subtotal`,
} as Meta;

const Template: Story = (): TemplateResult => {
  return html` <h3>With value</h3>
    <oryx-cart-totals-subtotal></oryx-cart-totals-subtotal>
    <h3>Empty cart</h3>
    <oryx-cart-totals-subtotal cartId="empty"></oryx-cart-totals-subtotal>`;
};

export const variations = Template.bind({});