import { ContextFallback } from '@oryx-frontend/core';
import { inject, Provider } from '@oryx-frontend/di';
import { RouterService } from '@oryx-frontend/router';
import { map } from 'rxjs';

export const enum OrderContext {
  OrderId = 'orderId',
}

export const OrderContextFallback: Provider = {
  provide: `${ContextFallback}${OrderContext.OrderId}`,
  useFactory: () =>
    inject(RouterService)
      .currentParams()
      .pipe(map((params) => params?.id)),
};
