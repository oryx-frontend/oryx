import { resolve } from '@oryx-frontend/di';
import { NotificationService } from '@oryx-frontend/site';
import { AlertType } from '@oryx-frontend/ui';
import { Notification } from '@oryx-frontend/ui/notification';
import { NotificationPosition } from '@oryx-frontend/ui/notification-center';
import { Meta, Story } from '@storybook/web-components';
import { TemplateResult, html } from 'lit';
import { storybookPrefix } from '../../.constants';
import { SiteNotificationCenterOptions } from '../notification-center.model';

export default {
  title: `${storybookPrefix}/Notification Center`,
  argTypes: {
    position: {
      options: [
        NotificationPosition.TopStart,
        NotificationPosition.TopCenter,
        NotificationPosition.TopEnd,
        NotificationPosition.BottomStart,
        NotificationPosition.BottomCenter,
        NotificationPosition.BottomEnd,
      ],
      control: { type: 'select' },
      description: 'Position in which to display site error notifications.',
    },
    type: {
      options: [
        AlertType.Info,
        AlertType.Success,
        AlertType.Warning,
        AlertType.Error,
      ],
      control: { type: 'radio' },
      description: 'Type of notification to display.',
      table: { category: 'demo' },
    },
  },
  args: {
    position: NotificationPosition.TopEnd,
    type: AlertType.Info,
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
} as Meta;

const emitMessage = (option: Notification): void => {
  resolve(NotificationService).push(option);
};

const Template: Story<SiteNotificationCenterOptions & { type: AlertType }> = (
  props
): TemplateResult => {
  const message = {
    content: 'Title',
    subtext: 'Message',
    type: props.type,
  };
  return html`<div class="buttons">
      <button @click=${() => emitMessage(message)}>emit message</button>
    </div>
    <oryx-site-notification-center
      .options=${{ position: props.position }}
    ></oryx-site-notification-center>`;
};

export const Demo = Template.bind({});
