import { AuthIdentity, IdentityService } from '@oryx-frontend/auth';
import {
  CheckoutAdapter,
  CheckoutNormalizer,
  CheckoutResponseNormalizer,
} from '@oryx-frontend/checkout';
import {
  mockCheckout,
  mockGetShipmentResponse,
  mockPlaceOrderData,
  mockPlaceOrderResponse,
} from '@oryx-frontend/checkout/mocks';
import { HttpService, JsonAPITransformerService } from '@oryx-frontend/core';
import { HttpTestService } from '@oryx-frontend/core/testing';
import { createInjector, destroyInjector } from '@oryx-frontend/di';
import { Observable, of } from 'rxjs';
import { DefaultCheckoutAdapter } from './default-checkout.adapter';

const mockApiUrl = 'mockApiUrl';
const cartId = 'mockid';

const mockTransformer = {
  transform: vi.fn().mockReturnValue(of(null)),
  serialize: vi.fn().mockReturnValue(of(null)),
  do: vi.fn().mockReturnValue(() => of(null)),
};

const mockAnonymousUser: AuthIdentity = {
  userId: 'anonymousUserId',
  isAuthenticated: false,
};

class MockIdentityService implements Partial<IdentityService> {
  get = vi
    .fn<[], Observable<AuthIdentity>>()
    .mockReturnValue(of(mockAnonymousUser));
}

describe('DefaultCheckoutService', () => {
  let service: CheckoutAdapter;
  let identity: MockIdentityService;
  let http: HttpTestService;
  const mockTransformerData = 'mockTransformerData';
  const callback = vi.fn();

  beforeEach(() => {
    const testInjector = createInjector({
      providers: [
        {
          provide: HttpService,
          useClass: HttpTestService,
        },
        {
          provide: CheckoutAdapter,
          useClass: DefaultCheckoutAdapter,
        },
        {
          provide: 'SCOS_BASE_URL',
          useValue: mockApiUrl,
        },
        {
          provide: JsonAPITransformerService,
          useValue: mockTransformer,
        },
        {
          provide: IdentityService,
          useClass: MockIdentityService,
        },
      ],
    });

    service = testInjector.inject(CheckoutAdapter);

    http = testInjector.inject(HttpService) as unknown as HttpTestService;
    identity = testInjector.inject(IdentityService) as MockIdentityService;
  });

  afterEach(() => {
    vi.clearAllMocks();
    destroyInjector();
  });

  it('should be provided', () => {
    expect(service).toBeInstanceOf(DefaultCheckoutAdapter);
  });

  describe('get should send `post` request', () => {
    describe('when an include is not provided', () => {
      const mockSerializedGetCheckoutDataProps = {
        data: {
          type: 'checkout-data',
          attributes: { cartId },
        },
      };

      it('should build the url with standard includes', () => {
        service.get({ cartId }).subscribe(() => {
          expect(http.url).toBe(
            `${mockApiUrl}/checkout-data?include=shipments,shipment-methods,payment-methods,carts,guest-carts`
          );
        });
      });

      it('should provide body', () => {
        mockTransformer.serialize.mockReturnValue(
          of(mockSerializedGetCheckoutDataProps)
        );
        service.get({ cartId }).subscribe(() => {
          expect(http.body).toEqual(mockSerializedGetCheckoutDataProps);
        });
      });

      it('should call transformer with proper normalizer', () => {
        http.flush(mockGetShipmentResponse);
        service.get({ cartId }).subscribe();

        expect(mockTransformer.do).toHaveBeenCalledWith(CheckoutNormalizer);
      });

      it('should return transformed data', () => {
        mockTransformer.do.mockReturnValue(() => of(mockTransformerData));
        service.get({ cartId }).subscribe(callback);

        expect(callback).toHaveBeenCalledWith(mockTransformerData);
      });
    });
  });

  describe('when placing an order', () => {
    describe('and user is not logged in', () => {
      it('should build url', () => {
        service.placeOrder(mockPlaceOrderData).subscribe(() => {
          expect(http.url).toBe(`${mockApiUrl}/checkout?include=orders`);
        });
      });
    });

    describe('and user is logged in', () => {
      it('should build url', () => {
        identity.get.mockReturnValue(
          of({ userId: 'mockUser', isAuthenticated: true })
        );
        service.placeOrder(mockPlaceOrderData).subscribe(() => {
          expect(http.url).toBe(`${mockApiUrl}/checkout`);
        });
      });
    });

    it('should provide body', () => {
      mockTransformer.serialize.mockReturnValue(of(mockCheckout));
      service.placeOrder(mockPlaceOrderData).subscribe(() => {
        expect(http.body).toEqual(mockCheckout);
      });
    });

    it('should call transformer with proper normalizer', () => {
      http.flush(mockPlaceOrderResponse);
      service.placeOrder(mockPlaceOrderData).subscribe();

      expect(mockTransformer.do).toHaveBeenCalledWith(
        CheckoutResponseNormalizer
      );
    });

    it('should return transformed data', () => {
      mockTransformer.do.mockReturnValue(() => of(mockTransformerData));

      service.placeOrder(mockPlaceOrderData).subscribe(callback);

      expect(callback).toHaveBeenCalledWith(mockTransformerData);
    });
  });
});
