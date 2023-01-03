import { CartService } from '@spryker-oryx/cart';
import { RouterService } from '@spryker-oryx/experience';
import { inject, resolve } from '@spryker-oryx/injector';
import { SemanticLinkService, SemanticLinkType } from '@spryker-oryx/site';
import {
  combineLatest,
  map,
  Observable,
  of,
  ReplaySubject,
  shareReplay,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { Checkout, CheckoutResponse, Validity } from '../models';
import { CheckoutAdapter } from './adapter';
import { CheckoutDataService } from './checkout-data.service';
import { CheckoutOrchestrationService } from './checkout-orchestration.service';
import { CheckoutService } from './checkout.service';

export class DefaultCheckoutService implements CheckoutService {
  constructor(
    protected orchestrationService = inject(CheckoutOrchestrationService),
    protected dataService = inject(CheckoutDataService),
    protected adapter = inject(CheckoutAdapter),
    protected cartService = inject(CartService),
    protected semanticLink = inject(SemanticLinkService),
    protected router = resolve(RouterService)
  ) {}

  protected canCheckout$ = this.orchestrationService.getValidity().pipe(
    map(
      (validity) =>
        !validity.some(({ validity }) => validity === Validity.Invalid)
    ),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  canCheckout(): Observable<boolean> {
    return this.canCheckout$;
  }

  placeOrder(): Observable<CheckoutResponse> {
    this.orchestrationService.submit();

    // TODO: Logic will be simplified with the introduction of Invokable utility
    const result = new ReplaySubject<CheckoutResponse>(1);

    this.canCheckout$
      .pipe(
        take(1),
        switchMap((canCheckout) => {
          if (!canCheckout) {
            result.complete();
            return of(undefined);
          }

          return this.preparePayload().pipe(
            switchMap((payload) =>
              this.adapter.placeOrder({ attributes: payload })
            ),
            tap({
              next: (response) => {
                result.next(response);
                result.complete();
              },
              error: (error) => {
                result.error(error);
              },
            }),
            switchMap((response) => this.postCheckout(response))
          );
        })
      )
      .subscribe();

    return result;
  }

  protected preparePayload(): Observable<Checkout> {
    return combineLatest([
      this.cartService.getCart().pipe(map((cart) => cart?.id)),
      this.dataService.getContactDetails(),
      this.dataService.getAddressDetails(),
      this.dataService.getShipmentDetails(),
      this.dataService.getPaymentDetails(),
    ]).pipe(
      take(1),
      map(([cartId, customer, billingAddress, shipment, payment]) => {
        const payload: Checkout = {
          cartId: cartId!,
          customer: {
            ...customer!,
            salutation:
              customer?.salutation ?? billingAddress!.salutation ?? '',
          },
          billingAddress: {
            ...billingAddress!,
          },
        };

        if (shipment?.idShipmentMethod) {
          payload.shipment = { idShipmentMethod: shipment.idShipmentMethod };
          payload.shippingAddress = { ...billingAddress! };
        }

        if (payment) {
          payload.payments = [payment];
        }

        return payload;
      })
    );
  }

  protected postCheckout(response: CheckoutResponse): Observable<unknown> {
    this.cartService.load().subscribe();

    return this.semanticLink
      .get({ type: SemanticLinkType.Order, id: response.orderReference })
      .pipe(tap((url: string | undefined) => url && this.router.navigate(url)));
  }
}
