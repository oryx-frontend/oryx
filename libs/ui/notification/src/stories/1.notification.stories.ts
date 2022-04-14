import { Meta, Story } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';
import { storybookPrefix } from '../../../.storybook/constant';
import '../index';
import { Schemes, Types } from '../notification.model';
import { bodyBackgroundColor } from './util';

export default {
  title: `${storybookPrefix}/Notification`,
} as Meta;

interface Props {
  type: string;
  title: string;
  subtext: string;
  scheme: string;
  floating: boolean;
  closable: boolean;
  backgroundColor: string;
}

const Template: Story<Props> = ({
  type,
  subtext,
  title,
  scheme,
  floating,
  closable,
  backgroundColor,
}: Props): TemplateResult => {
  return html`
    <style>
      body {
        background: ${backgroundColor};
      }
    </style>
    <oryx-notification
      type="${type}"
      scheme="${scheme}"
      ?floating="${floating}"
      ?closable="${closable}"
      @oryx.close=${(): void => console.log('close')}
      subtext=${subtext}
    >
      ${title}
      <span slot="subtext">${subtext}</span>
    </oryx-notification>
  `;
};
export const NotificationDemo = Template.bind({});
NotificationDemo.args = {
  backgroundColor: bodyBackgroundColor.options[0],
  type: Types.INFO,
  subtext: 'Content text',
  title: 'Title',
  scheme: Schemes.LIGHT,
  floating: false,
  closable: false,
};
NotificationDemo.argTypes = {
  backgroundColor: bodyBackgroundColor,
  type: {
    options: [Types.INFO, Types.ERROR, Types.WARNING, Types.SUCCESS],
    control: { type: 'radio' },
  },
  scheme: {
    options: [Schemes.LIGHT, Schemes.DARK],
    control: { type: 'radio' },
  },
  floating: {
    control: { type: 'boolean' },
    defaultValue: false,
  },
  closable: {
    control: { type: 'boolean' },
    defaultValue: false,
  },
  title: {
    control: { type: 'text' },
    defaultValue: 'Title',
  },
  subtext: {
    control: { type: 'text' },
    defaultValue: 'Content text',
  },
};