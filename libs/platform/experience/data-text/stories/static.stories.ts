import { ContextService } from '@oryx-frontend/core';
import { resolve } from '@oryx-frontend/di';
import { HeadingTag } from '@oryx-frontend/ui/heading';
import { Story } from '@storybook/web-components';
import { TemplateResult, html } from 'lit';
import { storybookPrefix } from '../../.constants';

export default {
  title: `${storybookPrefix}/Data/Text`,
};

const Template: Story = (): TemplateResult => {
  resolve(ContextService).provide(document.body, 'product', {
    sku: '1',
  });
  const options = { entity: 'product', field: 'name' };
  return html`
    <h3>Plain Text</h3>
    <oryx-data-text .options=${options}></oryx-data-text>

    <h3>With prefix</h3>
    <oryx-data-text
      .options=${{ ...options, prefix: 'prefix: ' }}
    ></oryx-data-text>

    <h3>With tag</h3>
    <oryx-data-text
      .options=${{ ...options, tag: HeadingTag.H1 }}
    ></oryx-data-text>

    <h3>With prefix and tag</h3>
    <oryx-data-text
      .options=${{ ...options, prefix: 'prefix: ', tag: HeadingTag.H1 }}
    ></oryx-data-text>
  `;
};

export const Static = Template.bind({});
