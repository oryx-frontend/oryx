import { resolve } from '@oryx-frontend/di';
import { PriceModeService, PriceModes } from '@oryx-frontend/site';
import { Meta, Story } from '@storybook/web-components';
import { TemplateResult, html } from 'lit';
import { storybookPrefix } from '../../.constants';

export default {
  title: `${storybookPrefix}/Edit`,
} as Meta;

const Template: Story = (): TemplateResult => {
  resolve(PriceModeService).set(PriceModes.GrossMode);

  return html`<oryx-cart-edit></oryx-cart-edit>`;
};

export const Demo = Template.bind({});
