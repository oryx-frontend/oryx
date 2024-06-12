import { resolve } from '@oryx-frontend/di';
import { MockRouterService } from '@oryx-frontend/experience/mocks';
import { RangeFacetValue } from '@oryx-frontend/product';
import { RouterService } from '@oryx-frontend/router';
import { SelectFacetEventDetail } from '@oryx-frontend/search';
import { Story } from '@storybook/web-components';
import { TemplateResult, html } from 'lit';
import { storybookPrefix } from '../../.constants';
import {
  SearchRatingFacetComponentOptions,
  SearchRatingFacetComponentProperties,
} from '../facet-rating.model';

export default {
  title: `${storybookPrefix}/Facet Rating`,
  args: {
    open: true,
    min: 1,
    max: 5,
    scale: 5,
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

const Template: Story<
  SearchRatingFacetComponentProperties & SearchRatingFacetComponentOptions
> = ({ open, min, max, scale }): TemplateResult => {
  const router = resolve<MockRouterService>(RouterService);

  router.params$.next({});

  const select = (e: CustomEvent<SelectFacetEventDetail>): void => {
    const { min } = (e.detail.value?.selected as RangeFacetValue) ?? {};

    router.params$.next({ minRating: String(min) });
  };

  return html`<oryx-search-facet-rating
    name="Rating"
    ?open=${open}
    .options=${{
      min,
      max,
      scale,
    }}
    @oryx.select=${select}
  ></oryx-search-facet-rating>`;
};

export const Demo = Template.bind({});
