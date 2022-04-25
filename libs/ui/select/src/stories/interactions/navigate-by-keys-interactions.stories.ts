import { userEvent } from '@storybook/testing-library';
import { Meta, Story } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';
import { storybookPrefix } from '../../../../.storybook/constant';
import '../../../../option/src/index';
import { states } from '../../../../utilities/storybook';
import '../../index';
import { SelectComponent } from '../../index';

export default {
  title: `${storybookPrefix}/form/Select/Interaction`,
} as Meta;

const Template: Story<unknown> = (): TemplateResult => {
  return html`
    <oryx-select>
      <input placeholder="select something from the list" />
      ${states.map((state) => html`<oryx-option>${state}</oryx-option>`)}
    </oryx-select>
  `;
};

export const NavigateByKeys = Template.bind({});

NavigateByKeys.play = async (obj: {
  args: unknown;
  canvasElement: HTMLElement;
}): Promise<void> => {
  const forEach = async (arr: unknown[], cb: any): Promise<void> => {
    for (const item of arr) {
      await cb(item);
    }
  };

  const keyboard = async (key: string, times = 1): Promise<void> => {
    await forEach(Array(times), async (): Promise<void> => {
      await userEvent.keyboard(key);
      await new Promise((resolve) => setTimeout(resolve, 500));
    });
  };

  const component = obj.canvasElement.querySelector(
    'oryx-select'
  ) as SelectComponent;
  const input = component.querySelector('input') as HTMLInputElement;
  userEvent.click(input);

  await keyboard('[ArrowDown]', 3);
  await keyboard('[Enter]');
  userEvent.click(input);
  await keyboard('[ArrowDown]', 2);
  await keyboard('{Meta>}[ArrowDown]{/Meta}', 2);
  await keyboard('{Meta>}[ArrowUp]{/Meta}', 2);
  await keyboard('[ArrowUp]', 2);
  await keyboard('[End]');
  await keyboard('[Home]');
  await keyboard('[ArrowUp]', 3);
  await keyboard('[ArrowDown]', 3);
  await keyboard('[Escape]');
};
