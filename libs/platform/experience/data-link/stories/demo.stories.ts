import { ContextService } from '@oryx-frontend/core';
import { resolve } from '@oryx-frontend/di';
import { IconTypes } from '@oryx-frontend/ui/icon';
import { Meta, Story } from '@storybook/web-components';
import { TemplateResult, html } from 'lit';
import { storybookPrefix } from '../../.constants';
import { DataLinkComponentOptions } from '../data-link.model';

export default {
  title: `${storybookPrefix}/Data/Link`,
  args: {
    entity: 'merchant',
    field: 'contact.phone',
    icon: IconTypes.Phone,
    label: 'Call us',
  },
  parameters: { chromatic: { disableSnapshot: true } },
} as Meta;

const Template: Story<DataLinkComponentOptions> = (
  props: DataLinkComponentOptions
): TemplateResult => {
  const { ...options } = props;
  resolve(ContextService).provide(document.body, 'merchant', {
    id: '1',
  });
  return html` <oryx-data-link .options=${options}></oryx-data-link> `;
};

export const Demo = Template.bind({});
