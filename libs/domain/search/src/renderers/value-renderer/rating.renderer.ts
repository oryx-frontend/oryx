import { ValueFacet } from '@oryx-frontend/product';
import { SelectFacetEventDetail } from '@oryx-frontend/search';
import { TemplateResult, html } from 'lit';
import { FacetMappingOptions, FacetParams } from '../renderer';

export const ratingFacetRenderer = {
  [`${FacetParams.Rating}`]: {
    template: (
      facet: ValueFacet,
      options: FacetMappingOptions,
      selectListener: (e: CustomEvent<SelectFacetEventDetail>) => void
    ): TemplateResult => {
      return html`
        <oryx-search-facet-rating
          @oryx.select=${selectListener}
          .name=${facet.name}
          .open=${options.open}
          ?disableClear="${!options.enableClear}"
        ></oryx-search-facet-rating>
      `;
    },
  },
};
