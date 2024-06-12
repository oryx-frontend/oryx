import { Provider } from '@oryx-frontend/di';
import { featureVersion } from '@oryx-frontend/utilities';
import {
  CheckoutAdapter,
  CheckoutDataSerializer,
  CheckoutDataService,
  CheckoutNormalizer,
  CheckoutResponseNormalizer,
  CheckoutSerializer,
  CheckoutService,
  CheckoutStateService,
  PaymentsNormalizer,
  ShipmentsNormalizer,
} from './services';
import {
  DefaultCheckoutAdapter,
  DefaultCheckoutDataService,
  DefaultCheckoutService,
  DefaultCheckoutStateService,
  checkoutAttributesNormalizer,
  checkoutAttributesSerializer,
  checkoutCartsNormalizer,
  checkoutDataAttributesSerializer,
  checkoutPaymentsNormalizer,
  checkoutResponseAttributesNormalizer,
  checkoutShipmentsNormalizer,
  paymentsNormalizer,
  shipmentsNormalizer,
} from './services-reexports';

export const checkoutNormalizer: Provider[] =
  featureVersion < '1.2'
    ? [
        {
          provide: CheckoutNormalizer,
          useValue: checkoutAttributesNormalizer,
        },
        {
          provide: CheckoutNormalizer,
          useValue: checkoutShipmentsNormalizer,
        },
        {
          provide: CheckoutNormalizer,
          useValue: checkoutPaymentsNormalizer,
        },
        {
          provide: CheckoutNormalizer,
          useValue: checkoutCartsNormalizer,
        },
      ]
    : [
        {
          provide: CheckoutNormalizer,
          useValue: () =>
            import('@oryx-frontend/checkout/services').then(
              (m) => m.checkoutAttributesNormalizer
            ),
        },
        {
          provide: CheckoutNormalizer,
          useValue: () =>
            import('@oryx-frontend/checkout/services').then(
              (m) => m.checkoutShipmentsNormalizer
            ),
        },
        {
          provide: CheckoutNormalizer,
          useValue: () =>
            import('@oryx-frontend/checkout/services').then(
              (m) => m.checkoutPaymentsNormalizer
            ),
        },
        {
          provide: CheckoutNormalizer,
          useValue: () =>
            import('@oryx-frontend/checkout/services').then(
              (m) => m.checkoutCartsNormalizer
            ),
        },
      ];

export const checkoutSerializer: Provider[] =
  featureVersion < '1.2'
    ? [
        {
          provide: CheckoutSerializer,
          useValue: checkoutAttributesSerializer,
        },
      ]
    : [
        {
          provide: CheckoutSerializer,
          useValue: () =>
            import('@oryx-frontend/checkout/services').then(
              (m) => m.checkoutAttributesSerializer
            ),
        },
      ];

export const checkoutDataSerializer: Provider[] =
  featureVersion < '1.2'
    ? [
        {
          provide: CheckoutDataSerializer,
          useValue: checkoutDataAttributesSerializer,
        },
      ]
    : [
        {
          provide: CheckoutDataSerializer,
          useValue: () =>
            import('@oryx-frontend/checkout/services').then(
              (m) => m.checkoutDataAttributesSerializer
            ),
        },
      ];

export const checkoutResponseNormalizer: Provider[] =
  featureVersion < '1.2'
    ? [
        {
          provide: CheckoutResponseNormalizer,
          useValue: checkoutResponseAttributesNormalizer,
        },
      ]
    : [
        {
          provide: CheckoutResponseNormalizer,
          useValue: () =>
            import('@oryx-frontend/checkout/services').then(
              (m) => m.checkoutResponseAttributesNormalizer
            ),
        },
      ];

export const checkoutProviders =
  featureVersion < '1.2'
    ? [
        {
          provide: CheckoutService,
          useClass: DefaultCheckoutService,
        },
        {
          provide: CheckoutDataService,
          useClass: DefaultCheckoutDataService,
        },
        {
          provide: CheckoutStateService,
          useClass: DefaultCheckoutStateService,
        },
        {
          provide: CheckoutAdapter,
          useClass: DefaultCheckoutAdapter,
        },
        {
          provide: ShipmentsNormalizer,
          useValue: shipmentsNormalizer,
        },
        {
          provide: PaymentsNormalizer,
          useValue: paymentsNormalizer,
        },
        ...checkoutDataSerializer,
        ...checkoutSerializer,
        ...checkoutNormalizer,
        ...checkoutResponseNormalizer,
      ]
    : [
        {
          provide: CheckoutService,
          asyncClass: () =>
            import('@oryx-frontend/checkout/services').then(
              (m) => m.DefaultCheckoutService
            ),
        },
        {
          provide: CheckoutDataService,
          asyncClass: () =>
            import('@oryx-frontend/checkout/services').then(
              (m) => m.DefaultCheckoutDataService
            ),
        },
        {
          provide: CheckoutStateService,
          asyncClass: () =>
            import('@oryx-frontend/checkout/services').then(
              (m) => m.DefaultCheckoutStateService
            ),
        },
        {
          provide: CheckoutAdapter,
          asyncClass: () =>
            import('@oryx-frontend/checkout/services').then(
              (m) => m.DefaultCheckoutAdapter
            ),
        },
        {
          provide: ShipmentsNormalizer,
          useValue: () =>
            import('@oryx-frontend/checkout/services').then(
              (m) => m.shipmentsNormalizer
            ),
        },
        {
          provide: PaymentsNormalizer,
          useValue: () =>
            import('@oryx-frontend/checkout/services').then(
              (m) => m.paymentsNormalizer
            ),
        },
        ...checkoutDataSerializer,
        ...checkoutSerializer,
        ...checkoutNormalizer,
        ...checkoutResponseNormalizer,
      ];
