import { MockAddressType } from '@oryx-frontend/user/mocks';
import { Meta, Story } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';
import { storybookPrefix } from '../../../.constants';
import { renderSelector } from '../helper';

export default {
  title: `${storybookPrefix}/Address List/Static`,
} as unknown as Meta;

const Template: Story<unknown> = (): TemplateResult => {
  return html` ${renderSelector(MockAddressType.OneWithDefaults)} `;
};

export const Single = Template.bind({});
