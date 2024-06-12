import { Transformer } from '@oryx-frontend/core';
import { snakify } from '@oryx-frontend/core/utilities';
import { ApiProductListModel, ProductListSort } from '../../../../models';

export const SortNormalizer = 'oryx.SortNormalizer*';

export function sortNormalizer(
  sort: ApiProductListModel.Sort
): ProductListSort {
  const { currentSortParam, currentSortOrder, sortParamLocalizedNames } = sort;

  return {
    sortOrder: currentSortOrder,
    sortParam: currentSortParam,
    sortValues: Object.entries(sortParamLocalizedNames).map(
      ([sortKey, sortName]) => ({
        sortKey: snakify(sortKey),
        sortName,
      })
    ),
  };
}

declare global {
  interface InjectionTokensContractMap {
    [SortNormalizer]: Transformer<ProductListSort>[];
  }
}
