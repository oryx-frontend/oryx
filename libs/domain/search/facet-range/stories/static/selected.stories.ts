import { resolve } from '@oryx-frontend/di';
import { MockRouterService } from '@oryx-frontend/experience/mocks';
import { RangeFacetValue } from '@oryx-frontend/product';
import { RouterService } from '@oryx-frontend/router';
import { SelectFacetEventDetail } from '@oryx-frontend/search';
import { Story } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';
import { storybookPrefix } from '../../../.constants';

export default {
  title: `${storybookPrefix}/Facet Range/Static`,
};

const Template: Story = (): TemplateResult => {
  const router = resolve<MockRouterService>(RouterService);

  router.params$.next({ minPrice: '20', maxPrice: '70' });

  const select = (e: CustomEvent<SelectFacetEventDetail>): void => {
    const { min, max } = (e.detail.value?.selected as RangeFacetValue) ?? {};

    router.params$.next(
      max ? { minPrice: String(min), maxPrice: String(max) } : {}
    );
  };

  return html`<oryx-search-range-facet
    name="Range"
    open
    @oryx.select=${select}
    step="1"
  ></oryx-search-range-facet>`;
};

export const Selected = Template.bind({});
