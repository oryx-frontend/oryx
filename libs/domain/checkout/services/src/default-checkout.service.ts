import { IdentityService } from '@oryx-frontend/auth';
import { CartService, CartsUpdated } from '@oryx-frontend/cart';
import {
  CheckoutAdapter,
  CheckoutResponse,
  CheckoutService,
  CheckoutStateService,
  CheckoutStatus,
  PlaceOrderData,
  PlaceOrderEnd,
  PlaceOrderFail,
  PlaceOrderStart,
  PlaceOrderSuccess,
} from '@oryx-frontend/checkout';
import { createCommand, createEffect } from '@oryx-frontend/core';
import { inject } from '@oryx-frontend/di';
import { OrderService } from '@oryx-frontend/order';
import { RouteType } from '@oryx-frontend/router';
import { LinkService } from '@oryx-frontend/site';
import { AddressModificationSuccess } from '@oryx-frontend/user';
import {
  Observable,
  combineLatest,
  map,
  of,
  scan,
  shareReplay,
  startWith,
  switchMap,
  take,
  throwError,
} from 'rxjs';

export class DefaultCheckoutService implements CheckoutService {
  protected cartId$ = this.cartService
    .getCart({})
    .pipe(map((cart) => cart?.id));

  protected isBusy$ = createEffect(({ getEvents }) =>
    getEvents([PlaceOrderStart, PlaceOrderEnd]).pipe(
      scan(
        (acc, event: PlaceOrderStart | PlaceOrderEnd) =>
          event.type === PlaceOrderStart ? ++acc : --acc,
        0
      ),
      map((x) => (x ? CheckoutStatus.Busy : CheckoutStatus.Ready)),
      startWith(CheckoutStatus.Ready)
    )
  ) as Observable<CheckoutStatus>;

  protected process$ = this.cartId$.pipe(
    switchMap((hasCart) => (hasCart ? this.isBusy$ : of(CheckoutStatus.Empty))),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  protected placeOrderCommand$ = createCommand({
    action: () => {
      return combineLatest([this.stateService.getAll(), this.cartId$]).pipe(
        take(1),
        switchMap(([state, cartId]) =>
          state && cartId
            ? this.adapter.placeOrder({
                ...state,
                cartId,
              } as PlaceOrderData)
            : throwError(() => new Error('Invalid checkout data'))
        ),
        switchMap((response) => this.resolveRedirect(response)),
        switchMap((response) =>
          this.identityService.get().pipe(
            take(1),
            map((user) => ({ ...response, userId: user.userId }))
          )
        )
      );
    },
    onStart: [PlaceOrderStart],
    onFinish: [PlaceOrderEnd],
    onSuccess: [
      PlaceOrderSuccess,
      CartsUpdated,
      AddressModificationSuccess,
      ({ data }) => {
        if (data?.orders?.length)
          this.orderService.storeLastOrder(data.orders[0], data.userId ?? '');
      },
      () => this.stateService.clear(),
    ],
    onError: [PlaceOrderFail],
  });

  constructor(
    protected stateService = inject(CheckoutStateService),
    protected cartService = inject(CartService),
    protected adapter = inject(CheckoutAdapter),
    protected linkService = inject(LinkService),
    protected orderService = inject(OrderService),
    protected identityService = inject(IdentityService)
  ) {}

  getStatus(): Observable<CheckoutStatus> {
    return this.process$;
  }

  placeOrder(): Observable<CheckoutResponse> {
    return this.placeOrderCommand$.execute();
  }

  protected resolveRedirect(
    response: CheckoutResponse
  ): Observable<CheckoutResponse> {
    return response.redirectUrl
      ? of(response)
      : this.linkService
          .get({
            type: RouteType.Order,
            id: response.orderReference,
          })
          .pipe(
            take(1),
            map((redirectUrl) => ({ ...response, redirectUrl }))
          );
  }
}
