import { getAppIcons } from '@/tools/storybook';
import { Size } from '@oryx-frontend/utilities';
import { Meta, Story } from '@storybook/web-components';
import { TemplateResult, html } from 'lit';
import { storybookPrefix } from '../../../../.constants';

import { IconProperties } from '../icon.model';

export default {
  title: `${storybookPrefix}/Graphical/Icon`,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
} as Meta;

const icons = getAppIcons();

interface Props extends IconProperties {
  color: string;
}

const Template: Story<Props> = (props: Props): TemplateResult => {
  return html`
    <oryx-icon
      style="color: ${props.color}"
      type=${props.type}
      size=${props.size}
    ></oryx-icon>
  `;
};

export const IconDemo = Template.bind({});

IconDemo.args = {
  type: icons[0],
  color: 'black',
  size: Size.Lg,
};

IconDemo.argTypes = {
  type: {
    options: Object.values(icons),
    control: { type: 'select' },
  },
  color: {
    control: { type: 'color' },
  },
  size: {
    options: [Size.Lg, Size.Md, Size.Sm],
    control: { type: 'radio' },
  },
};
