import { QueryService, Transformer } from '@oryx-frontend/core';
import { inject } from '@oryx-frontend/di';
import { ApiProductModel, ProductCategory } from '../../../../models';
import { CategoriesLoaded } from '../../state';
import { categoryNodeNormalizer } from './category-node.normalizer';

export const CategoryNormalizer = 'oryx.CategoryNormalizer';

export const categoryNormalizerFactory =
  (queryService = inject(QueryService)) =>
  (data?: ApiProductModel.CategoryNodes[]): object => {
    const categories = data?.map<ProductCategory>(categoryNodeNormalizer);

    if (categories?.length) {
      queryService.emit({ type: CategoriesLoaded, data: categories });
    }

    return {};
  };

declare global {
  interface InjectionTokensContractMap {
    [CategoryNormalizer]: Transformer<object>[];
  }
}
