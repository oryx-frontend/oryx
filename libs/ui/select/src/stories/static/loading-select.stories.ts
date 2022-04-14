import { Meta, Story } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';
import { storybookPrefix } from '../../../../.storybook/constant';
import '../../../../option/src/index';
import { sideBySide } from '../../../../utilities/storybook';
import '../../index';

export default {
  title: `${storybookPrefix}/form/Select/Static`,
} as Meta;

const Template: Story<unknown> = (): TemplateResult => {
  return sideBySide(html`
    <oryx-select isLoading>
      <select aria-label="label"></select>
    </oryx-select>
  `);
};

export const Loading = Template.bind({});
Loading.parameters = {
  chromatic: { delay: 300 },
};