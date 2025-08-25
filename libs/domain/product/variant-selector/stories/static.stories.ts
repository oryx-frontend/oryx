import { MockProductService } from '@oryx-frontend/product/mocks';
import { Meta, Story } from '@storybook/web-components';
import { TemplateResult, html } from 'lit';
import { storybookPrefix } from '../../.constants';

export default {
  title: `${storybookPrefix}/Variant selector/Static`,
} as unknown as Meta;

const Template: Story<unknown> = (): TemplateResult => {
  return html`
    <section>
      <h3>3 variants:</h3>
      <oryx-product-variant-selector sku="variant-selector"></oryx-product-variant-selector>
    </section>
    <section>
      <h3>2 variants:</h3>
      <oryx-product-variant-selector sku="1"></oryx-product-variant-selector>
    </section>
    <section>
      <h3>Color variants disabled:</h3>
      <oryx-product-variant-selector sku="2"></oryx-product-variant-selector>
    </section>
  `;
}
export const Variations = Template.bind({});
