import { CamelCase } from '@spryker-oryx/core/utilities';
import { ApiProductModel } from '../../../../models';
import { DeserializedProductIncludes } from '../model';

export type DeserializedAbstract = ApiProductModel.Abstract &
  Pick<
    DeserializedProductIncludes,
    CamelCase<ApiProductModel.Includes.ConcreteProducts>
  >;
