import { resolve } from '@oryx-frontend/di';
import { MockRouterService } from '@oryx-frontend/experience/mocks';
import { RangeFacetValue } from '@oryx-frontend/product';
import { RouterService } from '@oryx-frontend/router';
import { SelectFacetEventDetail } from '@oryx-frontend/search';
import { Story } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';
import { storybookPrefix } from '../../.constants';
import { SearchFacetRangeComponentAttributes } from '../facet-range.model';

export default {
  title: `${storybookPrefix}/Facet Range`,
  parameters: { chromatic: { disableSnapshot: true } },
  args: {
    open: true,
    disableClear: false,
    step: 1,
    labelMin: 'Min',
    labelMax: 'Max',
  },
  argTypes: {
    step: {
      type: 'number',
    },
  },
};

const Template: Story<SearchFacetRangeComponentAttributes> = (
  props
): TemplateResult => {
  const router = resolve<MockRouterService>(RouterService);

  router.params$.next({});

  const select = (e: CustomEvent<SelectFacetEventDetail>): void => {
    const { min, max } = (e.detail.value?.selected as RangeFacetValue) ?? {};

    router.params$.next(
      max ? { minPrice: String(min), maxPrice: String(max) } : {}
    );
  };

  return html`<oryx-search-range-facet
    name="Range"
    .step=${props.step}
    .labelMin=${props.labelMin}
    .labelMax=${props.labelMax}
    ?open=${props.open}
    ?disableClear=${props.disableClear}
    @oryx.select=${select}
  ></oryx-search-range-facet>`;
};

export const Demo = Template.bind({});
