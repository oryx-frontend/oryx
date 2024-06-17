import { inject } from '@oryx-frontend/di';
import { Facet } from '@oryx-frontend/product';
import { SelectFacetEventDetail } from '@oryx-frontend/search';
import { TemplateResult } from 'lit';
import { FacetComponentRegistryService } from './facet-component-registry.service';
import {
  FacetMappingOptions,
  FacetParams,
  FacetRendererMapping,
  FacetValueRenderer,
} from './renderer';

export class DefaultFacetComponentRegistryService
  implements FacetComponentRegistryService
{
  protected facetComponentMap: FacetRendererMapping;

  constructor(protected facetValueRenderer = inject(FacetValueRenderer)) {
    this.facetComponentMap = this.facetValueRenderer.reduce(
      (acc, components) => ({ ...acc, ...components }),
      {}
    );
  }

  renderFacetComponent(
    facet: Facet,
    options: FacetMappingOptions,
    selectListener: (e: CustomEvent<SelectFacetEventDetail>) => void
  ): TemplateResult {
    return (
      this.facetComponentMap[facet.parameter] ??
      this.facetComponentMap[FacetParams.Default]
    ).template(facet, options, selectListener);
  }
}
