import {
  CheckoutAdapter,
  CheckoutData,
  CheckoutResponse,
  PlaceOrderData,
} from '@spryker-oryx/checkout';
import { Observable, of } from 'rxjs';
import {mockCheckout, mockPlaceOrderResponse} from "./mock-checkout";

export class MockCheckoutAdapter implements CheckoutAdapter {
  get(props: PlaceOrderData): Observable<CheckoutData> {
    return of(mockCheckout as CheckoutData);
  }

  placeOrder(data: PlaceOrderData): Observable<CheckoutResponse> {
    return of(mockPlaceOrderResponse as CheckoutResponse);
  }
}
