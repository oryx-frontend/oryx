import { provideIncludes } from '@oryx-frontend/core';
import { PRODUCT, PRODUCTS } from '../../../entity';
import { ApiProductModel } from '../../../models';

export const productListIncludes = provideIncludes(
  PRODUCTS,
  [ApiProductModel.Includes.ConcreteProducts],
  PRODUCT
);
