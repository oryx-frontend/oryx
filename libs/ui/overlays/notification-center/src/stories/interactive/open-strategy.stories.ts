import { wait } from '@spryker-oryx/typescript-utils';
import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';
import { Meta, Story } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';
import { storybookPrefix } from '../../../../../.constants';
import { NotificationCenterComponent } from '../../notification-center.component';
import { Positions } from '../../notification-center.model';
import { TAG_NAME } from '../../utilities';
import { getNotification, open } from './util';

export default {
  title: `${storybookPrefix}/Overlays/Notification Center/Interactive`,
} as Meta;

const Template: Story = (): TemplateResult => {
  return html`
    <button
      @click=${(): void => open({ autoCloseTime: 2000 })}
      data-testid="button"
    >
      open
    </button>
    <oryx-notification-center position=${Positions.TOP_END}>
    </oryx-notification-center>
  `;
};

export const OpenStrategy = Template.bind({});

OpenStrategy.play = async (obj: {
  canvasElement: HTMLElement;
}): Promise<void> => {
  const center = obj.canvasElement.querySelector(
    TAG_NAME
  ) as NotificationCenterComponent;

  await wait(1000);
  userEvent.click(await within(obj.canvasElement).getByTestId('button'));
  await wait(0);
  expect(getNotification(center)).toBeDefined;
  await wait(2900);
  expect(getNotification(center)).toBeNull;
};
