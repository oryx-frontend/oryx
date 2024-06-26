import { ProductComponentProperties } from '@oryx-frontend/product';
import { MockProductService } from '@oryx-frontend/product/mocks';
import { Meta, Story } from '@storybook/web-components';
import { TemplateResult, html } from 'lit';
import { storybookPrefix } from '../../../.constants';
import { ProductLabelsOptions } from '../label.model';

export default {
  title: `${storybookPrefix}/Labels`,
  args: {
    sku: '1',
  },
  argTypes: {
    included: {
      control: { type: 'text' },
    },
    excluded: {
      control: { type: 'text' },
    },
    sku: {
      control: { type: 'select' },
      options: [
        ...MockProductService.mockProducts.map((p) => p.sku),
        'not-found',
      ],
      table: { category: 'demo' },
    },
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
} as unknown as Meta;

type Props = ProductLabelsOptions & ProductComponentProperties;

const Template: Story<Props> = (props: Props): TemplateResult => {
  const { sku, ...options } = props;
  return html`<oryx-product-labels
    .sku=${sku}
    .options=${options}
  ></oryx-product-labels>`;
};

export const LabelsDemo = Template.bind({});
