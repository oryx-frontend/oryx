import { OrderData, OrderService } from '@oryx-frontend/order';
import { Observable, of } from 'rxjs';
import { mockOrderData } from './mock-order';

export class MockOrderService implements Partial<OrderService> {
  static mockOrder: OrderData = {
    ...mockOrderData,
  };

  get(): Observable<OrderData | null> {
    return of(MockOrderService.mockOrder);
  }

  getLastOrder(): Observable<OrderData | null> {
    return of(MockOrderService.mockOrder);
  }
}
