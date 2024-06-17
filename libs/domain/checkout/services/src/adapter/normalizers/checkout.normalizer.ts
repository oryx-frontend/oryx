import { CartsNormalizer } from '@oryx-frontend/cart';
import {
  CheckoutData,
  PaymentsNormalizer,
  ShipmentsNormalizer,
} from '@oryx-frontend/checkout';
import { TransformerService } from '@oryx-frontend/core';
import { Observable, map } from 'rxjs';
import { DeserializedCheckout } from './model';

export function checkoutAttributesNormalizer(
  data: DeserializedCheckout
): Partial<CheckoutData> {
  const {
    addresses,
    paymentProviders,
    selectedShipmentMethods,
    selectedPaymentMethods,
    carts,
    guestCarts,
  } = data;
  return {
    addresses,
    paymentProviders,
    selectedShipmentMethods,
    selectedPaymentMethods,
    carts: carts ?? guestCarts,
  };
}

export function checkoutShipmentsNormalizer(
  data: DeserializedCheckout,
  transformer: TransformerService
): Observable<Partial<CheckoutData>> {
  return transformer
    .transform(data, ShipmentsNormalizer)
    .pipe(map((shipments) => ({ shipments })));
}

export function checkoutPaymentsNormalizer(
  data: DeserializedCheckout,
  transformer: TransformerService
): Observable<Partial<CheckoutData>> {
  return transformer
    .transform(data, PaymentsNormalizer)
    .pipe(map((paymentMethods) => ({ paymentMethods })));
}

export function checkoutCartsNormalizer(
  data: DeserializedCheckout,
  transformer: TransformerService
): Observable<Partial<CheckoutData>> {
  return transformer
    .transform(data, CartsNormalizer)
    .pipe(map((carts) => ({ carts })));
}
