import {
  CART,
  CartQualifier,
  CartService,
  NormalizedTotals,
  TotalsResolver,
  TotalsResolverOptions,
} from '@oryx-frontend/cart';
import { ContextService } from '@oryx-frontend/core';
import { inject } from '@oryx-frontend/di';
import { Observable, map, of, switchMap } from 'rxjs';

export class CartTotalsResolver implements TotalsResolver {
  constructor(
    protected cartService = inject(CartService),
    protected contextService = inject(ContextService)
  ) {}

  protected getContext(
    options?: TotalsResolverOptions
  ): Observable<CartQualifier | undefined> {
    return options?.element
      ? this.contextService.get<CartQualifier>(options.element, CART)
      : of(undefined);
  }

  getTotals(
    options?: TotalsResolverOptions
  ): Observable<NormalizedTotals | null> {
    return this.getContext(options).pipe(
      switchMap((context) => this.cartService.getCart(context)),
      map((cart) => {
        if (!cart?.products?.length) return null;

        const { totals, currency, discounts, priceMode } = cart;

        return {
          ...totals,
          priceMode,
          currency,
          discounts,
        };
      })
    );
  }
}
