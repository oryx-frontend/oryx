import { FacetValue, ValueFacet } from '@oryx-frontend/product';
import { RequireAtLeastOneProp } from '@oryx-frontend/utilities';

export type SelectRangeFacetValues = RequireAtLeastOneProp<
  { min?: number; max?: number },
  'min' | 'max'
>;
export type SelectRangeFacetValue = { selected: SelectRangeFacetValues };

export type SelectFacetValue = Pick<FacetValue, 'value' | 'selected'>;

export type SelectFacetEventDetailValue =
  | SelectFacetValue
  | SelectRangeFacetValue;

export interface SelectFacetEventDetail {
  name: string;
  value?: SelectFacetEventDetailValue;
}

export interface SingleMultiFacet extends ValueFacet {
  filteredValueLength?: number;
}
