import { ContextService } from '@oryx-frontend/core';
import { resolve } from '@oryx-frontend/di';
import { PRODUCT, ProductContext } from '@oryx-frontend/product';
import { featureVersion } from '@oryx-frontend/utilities';
import { Meta, Story } from '@storybook/web-components';
import { TemplateResult, html } from 'lit';
import { storybookPrefix } from '../../.constants';

export default {
  title: `${storybookPrefix}/Relations`,
  argTypes: {
    sku: {
      control: { type: 'select' },
      options: ['1', '2', '5'],
      defaultValue: '1',
    },
  },
  chromatic: { disableSnapshot: true },
} as Meta;

interface Props {
  sku: string;
}

const Template: Story<Props> = ({ sku }: Props): TemplateResult => {
  resolve(ContextService).provide(
    document.body,
    featureVersion >= '1.4' ? PRODUCT : ProductContext.SKU,
    featureVersion >= '1.3' ? { sku } : sku
  );

  return html`<oryx-product-relations></oryx-product-relations>`;
};

export const RelationsDemo = Template.bind({});
