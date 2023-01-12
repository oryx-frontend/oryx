import { Meta, Story } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';
import { storybookPrefix } from '../../../../../.constants';
import { OverlaysDecorator } from '../../../../../utilities/storybook';

import { renderCustomContent, renderOptions } from '../utils';

export default {
  title: `${storybookPrefix}/Overlays/Dropdown/Static`,
  decorators: [OverlaysDecorator(600, 400)],
} as Meta;

const Template: Story<unknown> = (): TemplateResult => {
  return html`
    <style>
      .row {
        display: flex;
      }

      .col:first-child oryx-dropdown {
        margin-right: 220px;
      }
    </style>

    <div class="row">
      <div class="col">
        <p>List of options</p>
        <oryx-dropdown open> ${renderOptions()} </oryx-dropdown>
      </div>

      <div class="col">
        <p>Custom</p>
        <oryx-dropdown open> ${renderCustomContent()} </oryx-dropdown>
      </div>
    </div>
  `;
};

export const Content = Template.bind({});