import { ApiProductModel } from '@oryx-frontend/product';
import { Include, JsonApiModel } from '@oryx-frontend/utilities';

export module ApiSuggestionModel {
  export interface Attributes {
    completion: string[];
    categories: Resource[];
    categoryCollection?: Resource[];
    cmsPages: Resource[];
    cmsPageCollection?: Resource[];
  }

  export interface Resource {
    name: string;
    url: string;
    idCategory?: string;
  }

  export type ResponseIncludes =
    | ApiProductModel.Includes
    | Include<
        ApiProductModel.Includes.ConcreteProducts,
        ApiProductModel.Concrete
      >
    | Include<
        ApiProductModel.Includes.AbstractProducts,
        ApiProductModel.Abstract
      >;

  export type Response = JsonApiModel<
    Attributes,
    ResponseIncludes[],
    Array<unknown>
  >;
}
