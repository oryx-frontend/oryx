import { OverlaysDecorator } from '@/tools/storybook';
import { Position } from '@oryx-frontend/ui';
import { Meta, Story } from '@storybook/web-components';
import { TemplateResult, html } from 'lit';
import { storybookPrefix } from '../../../../../.constants';

export default {
  title: `${storybookPrefix}/Overlays/Drawer/Static`,
  decorators: [OverlaysDecorator()],
} as Meta;

const Template: Story = (): TemplateResult => {
  return html`
    <oryx-drawer position=${Position.END} open>
      <div style="padding:20px">Position end</div>
    </oryx-drawer>
  `;
};

export const PositionEnd = Template.bind({});
