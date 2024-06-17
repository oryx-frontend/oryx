import { resolve } from '@oryx-frontend/di';
import { MockRouterService } from '@oryx-frontend/experience/mocks';
import { RouterService } from '@oryx-frontend/router';
import { SearchPaginationOptions } from '@oryx-frontend/search/pagination';
import { Story } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';
import { storybookPrefix } from '../../.constants';

export default {
  title: `${storybookPrefix}/Pagination`,
  args: { max: 3, enableControls: true },
};

const Template: Story<SearchPaginationOptions> = (options): TemplateResult => {
  const router = resolve(RouterService) as unknown as MockRouterService;

  router.params$.next({});

  return html`<oryx-search-pagination
    .options=${options}
  ></oryx-search-pagination> `;
};

export const Demo = Template.bind({});
