import { TotalsResolver } from '@oryx-frontend/cart';
import {
  mockedTotals,
  mockNormalizedCartTotals,
} from '@oryx-frontend/cart/mocks';
import { Provider } from '@oryx-frontend/di';
import { OrderService } from '@oryx-frontend/order';
import { MockOrderService } from './mock-order.service';

export const mockOrderProviders: Provider[] = [
  {
    provide: OrderService,
    useClass: MockOrderService,
  },
  {
    provide: `${TotalsResolver}ORDER`,
    useClass: mockedTotals(mockNormalizedCartTotals),
  },
];
