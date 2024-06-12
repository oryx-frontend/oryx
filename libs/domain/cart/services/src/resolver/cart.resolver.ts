import { CART, CartQualifier, CartService } from '@oryx-frontend/cart';
import {
  BaseResolver,
  ContextService,
  ResolvedResult,
  Resolver,
  TokenResolverOptions,
} from '@oryx-frontend/core';
import { inject, resolve } from '@oryx-frontend/di';
import { featureVersion } from '@oryx-frontend/utilities';
import { Observable, map, of, switchMap } from 'rxjs';

export type CartResolvers = {
  SUMMARY: Resolver;
  EMPTY: Resolver;
};

export class CartResolver extends BaseResolver<CartResolvers> {
  /** @deprecated since 1.1 use cartService instead*/
  protected cartService$ = resolve(CartService);
  protected cartService = inject(CartService);
  protected contextService = inject(ContextService);

  protected getContext(
    options?: TokenResolverOptions
  ): Observable<CartQualifier | undefined> {
    return options?.contextElement
      ? this.contextService.get<CartQualifier>(options.contextElement, CART)
      : of(undefined);
  }

  protected resolvers = {
    SUMMARY: (options?: TokenResolverOptions): Observable<ResolvedResult> => {
      return this.getContext(options).pipe(
        switchMap((contextQualifier) =>
          (featureVersion >= '1.1'
            ? this.cartService
            : this.cartService$
          ).getCart(contextQualifier)
        ),
        map((cart) => {
          const quantity = cart?.products?.reduce(
            (acc, { quantity }) => acc + Number(quantity),
            0
          );

          if (!quantity) {
            return null;
          }
          //TODO: Make max quantity to show configurable
          return quantity > 99 ? '99+' : String(quantity);
        })
      );
    },
    EMPTY: (options?: TokenResolverOptions): Observable<ResolvedResult> => {
      return this.getContext(options).pipe(
        switchMap((contextQualifier) =>
          (featureVersion >= '1.1'
            ? this.cartService
            : this.cartService$
          ).getCart(contextQualifier)
        ),
        map((cart) => !cart?.products?.find(({ quantity }) => !!quantity))
      );
    },
  };
}
