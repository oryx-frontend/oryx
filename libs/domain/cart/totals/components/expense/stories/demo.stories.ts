import { TotalsContext } from '@oryx-frontend/cart';
import { ContextService } from '@oryx-frontend/core';
import { resolve } from '@oryx-frontend/di';
import { Meta, Story } from '@storybook/web-components';
import { TemplateResult, html } from 'lit';
import { storybookPrefix } from '../../../../.constants';

export default {
  title: `${storybookPrefix}/Cart Totals/components/Expense`,
} as Meta;

const Template: Story = (): TemplateResult => {
  resolve(ContextService).provide(
    document.body,
    TotalsContext.Reference,
    'CART'
  );
  return html`<oryx-cart-totals-expense></oryx-cart-totals-expense>`;
};

export const Demo = Template.bind({});
