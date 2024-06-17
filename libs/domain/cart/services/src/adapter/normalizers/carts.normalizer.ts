import { Cart, CartNormalizer } from '@oryx-frontend/cart';
import { TransformerService } from '@oryx-frontend/core';
import { Observable, combineLatest, of } from 'rxjs';
import { DeserializedCart } from './model';

export function cartsItemsNormalizer(
  data: DeserializedCart[],
  transformer: TransformerService
): Observable<Cart[]> {
  return data.length
    ? combineLatest(
        data.map((cart) => transformer.transform(cart, CartNormalizer))
      )
    : of([]);
}
