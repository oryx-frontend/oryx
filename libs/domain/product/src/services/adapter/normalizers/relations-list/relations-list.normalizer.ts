import { Transformer, TransformerService } from '@oryx-frontend/core';
import { Provider } from '@oryx-frontend/di';
import { Observable, combineLatest } from 'rxjs';
import { Product } from '../../../../models/product.model';
import { DeserializedProductListIncludes } from '../model';
import { ProductNormalizer } from '../product/product.normalizer';

export const RelationsListNormalizer = 'oryx.RelationsListNormalizer*';

export function listNormalizer(
  data: DeserializedProductListIncludes[],
  transformer: TransformerService
): Observable<Product[]> {
  return combineLatest(
    data.map((product) => transformer.transform(product, ProductNormalizer))
  );
}

export const relationsListNormalizer: Provider[] = [
  {
    provide: RelationsListNormalizer,
    useValue: listNormalizer,
  },
];

declare global {
  interface InjectionTokensContractMap {
    [RelationsListNormalizer]: Transformer<Product[]>[];
  }
}
