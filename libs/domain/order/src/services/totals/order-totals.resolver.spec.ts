import { TotalsResolver } from '@oryx-frontend/cart';
import { ContextService } from '@oryx-frontend/core';
import { createInjector, destroyInjector } from '@oryx-frontend/di';
import { of } from 'rxjs';
import { OrderData } from '../../models';
import { OrderContext } from '../order-context';
import { OrderService } from '../order.service';
import {
  OrderTotalsProvider,
  OrderTotalsResolver,
} from './order-totals.resolver';

class MockOrderService implements Partial<OrderService> {
  get = vi.fn().mockReturnValue(of(null));
}

class MockContextService implements Partial<ContextService> {
  get = vi.fn().mockReturnValue(of(null));
}

// Create a test case for getTotals method
describe('OrderTotalsResolver', () => {
  let resolver: OrderTotalsResolver;
  let orderService: MockOrderService;
  let contextService: MockOrderService;

  beforeEach(() => {
    const testInjector = createInjector({
      providers: [
        {
          provide: OrderService,
          useClass: MockOrderService,
        },
        {
          provide: ContextService,
          useClass: MockContextService,
        },
        OrderTotalsProvider,
      ],
    });

    resolver = testInjector.inject(`${TotalsResolver}ORDER`);
    orderService = testInjector.inject<MockOrderService>(OrderService);
    contextService = testInjector.inject<MockContextService>(ContextService);
  });

  afterEach(() => {
    vi.clearAllMocks();
    destroyInjector();
  });

  it('should be provided', () => {
    expect(resolver).toBeInstanceOf(OrderTotalsResolver);
  });

  describe('when a qualifier is provided', () => {
    const element = {} as HTMLElement;
    const id = 'mock';

    beforeEach(() => {
      contextService.get = vi.fn().mockReturnValue(of(id));
      resolver.getTotals({ element }).subscribe();
    });

    it('should pass the context element to the get context call', () => {
      expect(contextService.get).toHaveBeenCalledWith(
        element,
        OrderContext.OrderId
      );
    });

    it('should call the order service with the qualifier', () => {
      expect(orderService.get).toHaveBeenCalledWith({ id });
    });

    describe('and when the orderService returns results with discounts', () => {
      const mock = {
        totals: {
          grandTotal: 100,
          subtotal: 80,
          taxTotal: 10,
          discountTotal: 20,
          expenseTotal: 5,
        },
        currencyIsoCode: 'USD',
        calculatedDiscounts: {
          discount1: { displayName: 'Discount 1', sumAmount: -10 },
          discount2: { displayName: 'Discount 2', sumAmount: -5 },
        },
        priceMode: 'GROSS_MODE',
        shipments: [{ defaultGrossPrice: 400 }],
      } as unknown as OrderData;

      beforeEach(() => {
        orderService.get.mockReturnValue(of(mock));
      });

      it('should normalize the order totals', () => {
        resolver.getTotals({ element }).subscribe((value) => {
          expect(value?.currency).toBe(mock.currencyIsoCode);
          expect(value?.grandTotal).toBe(mock.totals.grandTotal);
          expect(value?.subtotal).toBe(mock.totals.subtotal);
          expect(value?.taxTotal).toBe(mock.totals.taxTotal);
          expect(value?.discountTotal).toBe(mock.totals.discountTotal);
          expect(value?.expenseTotal).toBe(mock.totals.expenseTotal);
          expect(value?.priceMode).toBe(mock.priceMode);
          expect(value?.priceToPay).toBe(mock.totals.grandTotal);
          expect(value?.shipmentTotal).toBe(
            mock.shipments[0].defaultGrossPrice
          );
          expect(value?.discounts).toEqual([
            {
              displayName: 'Discount 1',
              amount: mock.calculatedDiscounts?.discount1.sumAmount,
            },
            {
              displayName: 'Discount 2',
              amount: mock.calculatedDiscounts?.discount2.sumAmount,
            },
          ]);
        });
      });
    });

    describe('and when the orderService returns no discount', () => {
      const mock = {
        totals: { grandTotal: 100 },
        currencyIsoCode: 'USD',
        priceMode: 'GROSS',
      } as unknown as OrderData;

      beforeEach(() => {
        orderService.get.mockReturnValue(of(mock));
      });

      it('should not normalize the discount', () => {
        resolver.getTotals({ element }).subscribe((value) => {
          expect(value?.currency).toBe(mock.currencyIsoCode);
          expect(value?.grandTotal).toBe(mock.totals.grandTotal);
          expect(value?.priceMode).toBe(mock.priceMode);
          expect(value?.priceToPay).toBe(mock.totals.grandTotal);
          expect(value?.discounts).toBeUndefined();
        });
      });
    });
  });

  describe('when a qualifier is not provided', () => {
    describe('and there is an order context', () => {
      const orderIdFromContext = 'order-id-from-context';
      beforeEach(() => {
        contextService.get.mockReturnValue(of(orderIdFromContext));
        resolver.getTotals().subscribe();
      });

      it('should call the order service with the qualifier from context', () => {
        expect(orderService.get).toHaveBeenCalledWith({
          id: orderIdFromContext,
        });
      });
    });

    describe('and there is no order context', () => {
      beforeEach(() => {
        contextService.get.mockReturnValue(of(null));
        resolver.getTotals().subscribe();
      });

      it('should not call the order service', () => {
        expect(orderService.get).not.toHaveBeenCalled();
      });
    });
  });
});
