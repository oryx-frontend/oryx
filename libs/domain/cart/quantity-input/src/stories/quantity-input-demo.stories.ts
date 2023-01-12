import { Meta, Story } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';
import { storybookPrefix } from '../../../.constants';

export default {
  title: `${storybookPrefix}/Quantity input`,
} as Meta;

interface Props {
  disabled: boolean;
  min: number;
  max: number;
  value: number;
  label: string;
}

const Template: Story<Props> = (props: Props): TemplateResult => {
  return html`
    <oryx-cart-quantity-input
      ?disabled=${props.disabled}
      min=${props.min}
      max=${props.max}
      value=${props.value}
      label=${props.label}
      @oryx.update=${({
        detail: { quantity },
      }: {
        detail: { quantity: number };
      }): void => {
        console.log('quantity', quantity);
      }}
    ></oryx-cart-quantity-input>
  `;
};

export const Demo = Template.bind({});

Demo.parameters = {
  chromatic: { disableSnapshot: true },
};

Demo.args = {
  disabled: false,
  min: 1,
  max: 10,
  value: 1,
  label: 'Quantity',
};