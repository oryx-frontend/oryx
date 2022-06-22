import { Meta, Story } from '@storybook/web-components';
import { TemplateResult } from 'lit';
import { html } from 'lit-html';
import { storybookPrefix } from '../../../../.constants';
import { setupProductMocks } from '../../../../src/mocks';
import '../../index';

export default {
  title: `${storybookPrefix}/Description/Static`,
  loaders: [setupProductMocks],
} as unknown as Meta;

const Template: Story<unknown> = (): TemplateResult => {
  return html`
    <div class="variation-description">
      <p>Collapsed</p>
      <product-description
        sku="1"
        .content=${{ truncateCharacterCount: 100, isTruncated: true }}
      />
    </div>
    <div class="variation-description">
      <p>Expanded</p>
      <product-description
        sku="1"
        .content=${{ truncateCharacterCount: 100, isTruncated: false }}
      />
    </div>
    <div class="variation-description">
      <p>Large Truncation Number</p>
      <product-description sku="1" .content=${{ truncateCharacterCount: 0 }} />
    </div>

    <style>
      .variation-description {
        display: flex;
        margin-bottom: 24px;
        gap: 15px;
      }

      .variation-description p {
        width: 180px;
      }
    </style>
  `;
};

export const descriptionVariation = Template.bind({});
