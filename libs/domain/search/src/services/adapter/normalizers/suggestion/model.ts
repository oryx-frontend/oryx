import { CamelCase } from '@oryx-frontend/core/utilities';
import {
  ApiProductModel,
  DeserializedProductIncludes,
} from '@oryx-frontend/product';
import { ApiSuggestionModel } from '../../../../models';

export type DeserializedSuggestion = ApiSuggestionModel.Attributes &
  Pick<
    DeserializedProductIncludes,
    | CamelCase<ApiProductModel.Includes.AbstractProducts>
    | CamelCase<ApiProductModel.Includes.CategoryNodes>
  >;
