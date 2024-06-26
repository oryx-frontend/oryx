import { ContextController } from '@oryx-frontend/core';
import { resolve } from '@oryx-frontend/di';
import { PricingService } from '@oryx-frontend/site';
import { ObserveController } from '@oryx-frontend/utilities';
import { LitElement } from 'lit';
import { Observable, combineLatest, filter, map, of, switchMap } from 'rxjs';
import { CART } from '../entity';
import {
  Cart,
  CartComponentAttributes,
  CartEntry,
  CartQualifier,
  CartTotalCalculations,
  Coupon,
  FormattedCartTotals,
  FormattedDiscount,
} from '../models';
import { CartService } from '../services';

export class CartController {
  protected observe: ObserveController<LitElement & CartComponentAttributes>;
  protected contextController: ContextController;
  protected cartService = resolve(CartService);
  protected pricingService = resolve(PricingService);

  constructor(protected host: LitElement & CartComponentAttributes) {
    this.observe = new ObserveController(host);
    this.contextController = new ContextController(host);
  }

  protected get cartQualifier(): Observable<CartQualifier | undefined> {
    return this.observe
      .get('cartId')
      .pipe(
        switchMap((cartId) =>
          cartId
            ? of({ cartId })
            : this.contextController.get<CartQualifier>(CART)
        )
      );
  }

  isEmpty(): Observable<boolean> {
    return this.cartQualifier.pipe(
      switchMap((qualifier) => this.cartService.isEmpty(qualifier))
    );
  }

  isBusy(): Observable<boolean> {
    return this.cartQualifier.pipe(
      switchMap((qualifier) => this.cartService.isBusy(qualifier))
    );
  }

  getCart(): Observable<Cart | undefined> {
    return this.cartQualifier.pipe(
      switchMap((qualifier) => this.cartService.getCart(qualifier))
    );
  }

  getEntries(): Observable<CartEntry[]> {
    return this.cartQualifier.pipe(
      switchMap((qualifier) => this.cartService.getEntries(qualifier))
    );
  }

  getCoupons(): Observable<Coupon[]> {
    return this.cartQualifier.pipe(
      switchMap((qualifier) => this.cartService.getCoupons(qualifier))
    );
  }

  /**
   * Returns the cumulated quantities of all cart entries.
   */
  getTotalQuantity(): Observable<number | null> {
    return this.cartQualifier.pipe(
      switchMap((qualifier) => this.cartService.getCart(qualifier)),
      map((cart) => this.cumulateQuantity(cart))
    );
  }

  getTotals(): Observable<FormattedCartTotals | null> {
    return combineLatest([
      this.observe.get('cart'),
      this.cartQualifier.pipe(
        switchMap((qualifier) => this.cartService.getCart(qualifier))
      ),
    ]).pipe(
      map(([cart, cartFromId]) => cart ?? cartFromId),
      switchMap((cart) =>
        cart?.products
          ? of(cart).pipe(
              switchMap(() =>
                combineLatest([
                  this.formatTotals(cart),
                  this.formatDiscounts(cart),
                  of({
                    itemsQuantity: this.cumulateQuantity(cart),
                    priceMode: cart.priceMode,
                  }),
                ]).pipe(
                  map(([calculations, discounts, details]) => ({
                    calculations,
                    ...(discounts && { discounts }),
                    ...details,
                  }))
                )
              )
            )
          : of(null)
      )
    );
  }

  /**
   * Cumulates the quantities for all the cart entries.
   */
  protected cumulateQuantity(cart: Cart | undefined): number | null {
    return (
      cart?.products?.reduce(
        (acc, { quantity }) => acc + Number(quantity),
        0
      ) ?? null
    );
  }

  protected formatDiscounts(cart: Cart): Observable<FormattedDiscount[]> {
    return of(cart).pipe(
      switchMap((cart) =>
        (cart.discounts ?? []).reduce(
          (acc$, discount) =>
            acc$.pipe(
              switchMap((acc) =>
                this.pricingService.format(-discount.amount).pipe(
                  filter(<T>(amount: T | null): amount is T => amount !== null),
                  map((amount) => [...acc, { ...discount, amount }])
                )
              )
            ),
          of([] as FormattedDiscount[])
        )
      )
    );
  }

  /**
   * Formats the cart totals by using the `PricingService.format()` method. The price
   * formatting requires a lookup on the locale and currency, which is why this API is
   * observable based.
   */
  protected formatTotals(cart: Cart): Observable<CartTotalCalculations> {
    return of(cart).pipe(
      switchMap((cart) =>
        Object.entries(cart.totals ?? {}).reduce((acc$, [priceType, price]) => {
          return acc$.pipe(
            switchMap((acc) => {
              if (!price) {
                return of({ ...acc });
              }
              if (priceType === 'discountTotal') {
                price = -price;
              }
              return this.pricingService.format(price).pipe(
                map((formattedPrice) => ({
                  ...acc,
                  [priceType]: formattedPrice as string,
                }))
              );
            })
          );
        }, of({}))
      )
    );
  }
}
