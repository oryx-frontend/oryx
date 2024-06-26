import { Facet, FacetType } from '@oryx-frontend/product';
import { SelectFacetEventDetail } from '@oryx-frontend/search';
import { featureVersion } from '@oryx-frontend/utilities';
import { TemplateResult, html } from 'lit';
import { FacetMappingOptions, FacetParams } from '../renderer';

export const defaultFacetRenderer = {
  [`${FacetParams.Default}`]: {
    template: (
      facet: Facet,
      options: FacetMappingOptions,
      selectListener: (e: CustomEvent<SelectFacetEventDetail>) => void
    ): TemplateResult => {
      if (featureVersion >= '1.2' && facet.type === FacetType.Range) {
        return html` <oryx-search-range-facet
          @oryx.select=${selectListener}
          .name=${facet.name}
          ?open=${options.open}
          ?disableClear="${!options.enableClear}"
        ></oryx-search-range-facet>`;
      }

      return html`
        <oryx-search-facet
          @oryx.select=${selectListener}
          .name=${facet.name}
          .renderLimit=${options.renderLimit}
          .open=${options.open}
          ?disableClear="${!options.enableClear}"
          .multi=${facet.type === FacetType.Multi}
        >
        </oryx-search-facet>
      `;
    },
  },
};
