import { Facet } from '@oryx-frontend/product';
import { SelectFacetEventDetail } from '@oryx-frontend/search';
import { TemplateResult } from 'lit';

export const FacetValueRenderer = 'oryx.FacetValueRenderer*';

export enum FacetParams {
  Default = 'default',
  Color = 'color',
  Price = 'price',
  Rating = 'rating',
}

export interface FacetMappingOptions {
  renderLimit: number;
  open: boolean;
  minForSearch: number;
  enableClear?: boolean;
}

export interface FacetRendererMapping {
  [key: string]: {
    template: (
      facet: Facet,
      options: FacetMappingOptions,
      selectListener: (e: CustomEvent<SelectFacetEventDetail>) => void
    ) => TemplateResult;
  };
}

declare global {
  interface InjectionTokensContractMap {
    [FacetValueRenderer]: FacetRendererMapping[];
  }
}
