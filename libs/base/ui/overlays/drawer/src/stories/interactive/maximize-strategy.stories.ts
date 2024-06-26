import { OverlaysDecorator } from '@/tools/storybook';
import { wait } from '@oryx-frontend/utilities';
import { expect } from '@storybook/jest';
import { userEvent } from '@storybook/testing-library';
import { Meta, Story } from '@storybook/web-components';
import { TemplateResult, html } from 'lit';
import { storybookPrefix } from '../../../../../.constants';
import { Position } from '../../../../../src/utilities/model/common';
import { DrawerComponent } from '../../index';

import { toggle } from './util';

export default {
  title: `${storybookPrefix}/Overlays/Drawer/Interactive`,
  decorators: [OverlaysDecorator()],
} as Meta;

const Template: Story = (): TemplateResult => {
  return html`
    <button @click=${(): void => toggle()} data-testid="button">open</button>
    <oryx-drawer position=${Position.END} open>
      <div style="padding:20px;">Content</div>
    </oryx-drawer>
  `;
};

export const MaximizeStrategy = Template.bind({});

MaximizeStrategy.play = async (obj: {
  canvasElement: HTMLElement;
}): Promise<void> => {
  const drawer = obj.canvasElement.querySelector(
    'oryx-drawer'
  ) as DrawerComponent;
  const button = drawer.shadowRoot?.querySelector(
    'button:nth-child(2)'
  ) as HTMLButtonElement;

  await wait(1000);
  userEvent.click(button);
  await wait(500);
  expect(drawer.maximize).toBeTruthy;
};
