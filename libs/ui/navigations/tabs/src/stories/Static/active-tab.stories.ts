import { Meta, Story } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';
import { storybookPrefix } from '../../../../../.constants';

export default {
  title: `${storybookPrefix}/Navigations/Tabs/Static`,
  args: {},
  argTypes: {},
} as Meta;

interface Props {
  [key: string]: string;
}

const Template: Story<Props> = (): TemplateResult => {
  return html`
    <h3>Primary tabs</h3>

    <oryx-tabs appearance="primary" activeTabIndex="2">
      <oryx-tab for="p1">Tab 1</oryx-tab>
      <oryx-tab for="p2">Tab 2</oryx-tab>
      <oryx-tab for="p3">Tab 3</oryx-tab>
      <oryx-tab for="p4">
        <oryx-icon type="star"></oryx-icon>
        Tab 4</oryx-tab
      >
      <oryx-tab for="p5">Tab 5</oryx-tab>
    </oryx-tabs>

    <oryx-tab-panel id="p1">Сontent for primary tab 1</oryx-tab-panel>
    <oryx-tab-panel id="p2">Сontent for primary tab 2</oryx-tab-panel>
    <oryx-tab-panel id="p3">Сontent for primary tab 3</oryx-tab-panel>
    <oryx-tab-panel id="p4">Сontent for primary tab 4</oryx-tab-panel>
    <oryx-tab-panel id="p5">Сontent for primary tab 5</oryx-tab-panel>

    <style>
      oryx-tabs {
        display: flex;
      }

      oryx-tab-panel {
        padding: 24px;
      }
    </style>
  `;
};

export const ActiveTabIndex = Template.bind({});