import { OverlaysDecorator } from '@spryker-oryx/ui/utilities';
import { Meta, Story } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';
import { storybookPrefix } from '../../../../.constants';

export default {
  title: `${storybookPrefix}/Media/Static`,
  decorators: [OverlaysDecorator()],
} as unknown as Meta;

const Template: Story = (): TemplateResult => {
  return html`
    <h3>First image</h3>
    <product-media sku="1"/></product-media>

    <h3>Second image</h3>
    <product-media sku="1" .options=${{ mediaIndex: 1 }} /></product-media>
    
    <h3>Third image</h3>
    <product-media sku="1" .options=${{ mediaIndex: 2 }} /></product-media>
    
    <h3>4th (non existing) image</h3>
    <product-media sku="1" .options=${{ mediaIndex: 3 }} /></product-media>

    <style>
      product-media {
        display: block;
        width: 300px;
        margin-bottom: 10px;
      }
    </style>
  `;
};

export const States = Template.bind({});