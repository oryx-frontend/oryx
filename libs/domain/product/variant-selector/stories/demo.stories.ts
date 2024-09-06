import { MockProductService } from '@oryx-frontend/product/mocks';
import { Meta, Story } from '@storybook/web-components';
import { TemplateResult, html } from 'lit';
import { storybookPrefix } from '../../.constants';

export default {
  title: `${storybookPrefix}/Variant selector`,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
} as Meta;

const Template: Story = (): TemplateResult => {
  return html`<oryx-product-variant-selector sku="variant-selector"></oryx-product-variant-selector>`;
};

export const Demo = Template.bind({});
