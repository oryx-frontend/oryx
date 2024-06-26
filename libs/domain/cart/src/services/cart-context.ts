import {
  ContextFallback,
  ContextSerializer,
  ContextService,
  FieldContextSerializer,
} from '@oryx-frontend/core';
import { Provider, inject } from '@oryx-frontend/di';
import { RouterService } from '@oryx-frontend/router';
import { Observable, switchMap } from 'rxjs';
import { CART } from '../entity';

export function cartContextFallbackFactory(
  router = inject(RouterService),
  context = inject(ContextService)
): Observable<unknown> {
  return router
    .currentParams()
    .pipe(
      switchMap((params) =>
        context.deserialize(CART, (params?.cartId as string) ?? '')
      )
    );
}

export const CartContextSerializerToken = `${ContextSerializer}${CART}`;

export const cartContextProviders: Provider[] = [
  {
    provide: `${ContextFallback}${CART}`,
    useFactory: cartContextFallbackFactory,
  },
  {
    provide: CartContextSerializerToken,
    useFactory: () => new FieldContextSerializer('cartId'),
  },
];
