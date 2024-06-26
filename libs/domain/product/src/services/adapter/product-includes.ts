import { provideIncludes } from '@oryx-frontend/core';
import { PRODUCT } from '../../entity';
import { ApiProductModel } from '../../models';

export const productIncludes = provideIncludes(PRODUCT, [
  ApiProductModel.Includes.ConcreteProductImageSets,
  ApiProductModel.Includes.ConcreteProductPrices,
  ApiProductModel.Includes.ConcreteProductAvailabilities,
  ApiProductModel.Includes.Labels,
  ApiProductModel.Includes.AbstractProducts,
  {
    include: ApiProductModel.Includes.CategoryNodes,
    fields: [
      ApiProductModel.CategoryNodeFields.MetaDescription,
      ApiProductModel.CategoryNodeFields.NodeId,
      ApiProductModel.CategoryNodeFields.Order,
      ApiProductModel.CategoryNodeFields.Name,
      ApiProductModel.CategoryNodeFields.Parents,
      ApiProductModel.CategoryNodeFields.IsActive,
    ],
  },
]);
