import { Meta, Story } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';
import { storybookPrefix } from '../../../../constant';
import '../../index';
import { Props } from './model';

export default {
  title: `${storybookPrefix}/form/form-control/error`,
} as Meta;

const Template: Story<Props> = ({
  value,
  placeholder,
  disabled,
  readonly,
  label,
}: Props): TemplateResult => {
  return html`
<oryx-input .options=${{ label }}>
  <input .placeholder=${placeholder} .value=${value} ?disabled=${disabled} ?readonly=${readonly}></input>
  <style>
    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
    oryx-icon {
      margin-inline-end: 5px;
      animation-name: spin;
      animation-duration: 3000ms;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
    }
  </style>
  <oryx-icon slot="error" type="error" size="large"></oryx-icon>
  <span slot="error"> Custom error content </span>
</oryx-input>
    `;
};
export const CustomContent = Template.bind({});
CustomContent.args = {
  value: '',
  placeholder: 'fill in...',
  disabled: false,
  readonly: false,
  label: 'Custom error content',
};