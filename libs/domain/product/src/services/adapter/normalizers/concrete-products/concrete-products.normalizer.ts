import { Transformer, TransformerService } from '@oryx-frontend/core';
import { camelize } from '@oryx-frontend/core/utilities';
import { Observable, combineLatest, map } from 'rxjs';
import { ApiProductModel, Product } from '../../../../models';
import { CategoryIdNormalizer } from '../category-id';
import { ProductNormalizer } from '../product';
import { DeserializedAbstract } from './model';

export const ConcreteProductsNormalizer = 'oryx.ConcreteProductsNormalizer*';

export function concreteProductsNormalizer(
  data: DeserializedAbstract[],
  transformer: TransformerService
): Observable<Product[]> {
  const concreteProductsKey = camelize(
    ApiProductModel.Includes.ConcreteProducts
  );
  const categoryKey = camelize(ApiProductModel.Includes.CategoryNodes);

  return combineLatest(
    data
      .filter((abstract) => abstract[concreteProductsKey]?.length)
      .map((abstract) => {
        const concretes = abstract[concreteProductsKey];
        const concrete = abstract[concreteProductsKey][0];

        if (concrete.abstractProducts) {
          concrete.abstractProducts[0][concreteProductsKey] = concretes;
        }

        return combineLatest([
          transformer.transform(concrete, ProductNormalizer),
          transformer.transform(abstract[categoryKey], CategoryIdNormalizer),
        ]).pipe(
          map(([product, nodeId]) => ({
            ...product,
            ...nodeId,
          }))
        );
      })
  );
}

declare global {
  interface InjectionTokensContractMap {
    [ConcreteProductsNormalizer]: Transformer<Product[]>[];
  }
}
