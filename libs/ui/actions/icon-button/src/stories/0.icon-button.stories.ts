import { Meta, Story } from '@storybook/web-components';
import { TemplateResult } from 'lit';
import { html } from 'lit-html';
import { storybookPrefix } from '../../../../.storybook/constant';
import { IconProperties, IconTypes } from '../../../../Graphical/icon';
import { Size } from '../../../../utilities';
import '../index';

export default { title: `${storybookPrefix}/actions/Icon Button` } as Meta;

interface Props extends IconProperties {
  color: string;
  disabled: boolean;
}

const Template: Story<Props> = ({
  size,
  disabled,
  type,
  color,
}: Props): TemplateResult => {
  return html`
    <oryx-icon-button
      size=${size}
      style=${color ? `color: ${color}` : undefined}
    >
      <button ?disabled=${disabled} aria-label="story">
        <oryx-icon type=${type}></oryx-icon>
      </button>
    </oryx-icon-button>
  `;
};

export const IconButtonDemo = Template.bind({});

IconButtonDemo.argTypes = {
  size: {
    options: Object.values(Size),
    control: { type: 'select' },
  },
  disabled: {
    control: { type: 'boolean' },
  },
  type: {
    options: Object.values(IconTypes),
    control: { type: 'select' },
  },
  color: {
    control: { type: 'color' },
  },
};

IconButtonDemo.args = {
  disabled: false,
  type: IconTypes.Rocket,
};