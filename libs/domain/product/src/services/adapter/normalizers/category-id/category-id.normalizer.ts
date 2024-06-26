import { Transformer } from '@oryx-frontend/core';
import { ApiProductModel } from '../../../../models';
import { DeserializeCategoryIds } from './model';

export const CategoryIdNormalizer = 'oryx.CategoryIdNormalizer*';

export function categoryIdNormalizer(
  data: ApiProductModel.CategoryNodes[] | undefined
): DeserializeCategoryIds | undefined {
  if (!data?.length) {
    return;
  }

  const categoryIds = data.reduce<string[]>(
    (acc, curr) => (curr.isActive ? [...acc, String(curr.nodeId)] : acc),
    []
  );

  if (!categoryIds.length) {
    return;
  }

  return { categoryIds };
}

declare global {
  interface InjectionTokensContractMap {
    [CategoryIdNormalizer]: Transformer<DeserializeCategoryIds>[];
  }
}
