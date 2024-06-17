import { TotalsContext } from '@oryx-frontend/cart';
import { ContextService } from '@oryx-frontend/core';
import { resolve } from '@oryx-frontend/di';
import { Meta, Story } from '@storybook/web-components';
import { TemplateResult, html } from 'lit';
import { storybookPrefix } from '../../../../.constants';

export default {
  title: `${storybookPrefix}/Cart Totals/components/Subtotal`,
} as Meta;

const Template: Story = (): TemplateResult => {
  resolve(ContextService).provide(
    document.body,
    TotalsContext.Reference,
    'CART'
  );
  return html` <oryx-cart-totals-subtotal></oryx-cart-totals-subtotal> `;
};

export const Demo = Template.bind({});
