import { ContextController } from '@oryx-frontend/core';
import { resolve } from '@oryx-frontend/di';
import { ObserveController } from '@oryx-frontend/utilities';
import { LitElement } from 'lit';
import { defer, map, Observable, shareReplay, switchMap } from 'rxjs';
import { OrderComponentProperties, OrderData } from '../models';
import { OrderContext, OrderService } from '../services';

export class OrderController {
  protected context: ContextController;
  protected observe: ObserveController<LitElement & OrderComponentProperties>;
  protected orderService = resolve(OrderService);

  protected order$ = defer(() =>
    this.getRef().pipe(
      switchMap((id) => {
        return this.orderService.get({ id: id! });
      })
    )
  ).pipe(shareReplay({ refCount: true, bufferSize: 1 }));

  protected ref$ = defer(() =>
    this.context
      .get(OrderContext.OrderId, this.observe.get('orderId'))
      .pipe(map((id) => id ?? null))
  ).pipe(shareReplay({ refCount: true, bufferSize: 1 }));

  constructor(
    protected host: LitElement & OrderComponentProperties,
    protected include: string[] = []
  ) {
    this.observe = new ObserveController(host);
    this.context = new ContextController(host);
  }

  getRef(): Observable<string | null> {
    return this.ref$;
  }

  getOrder(): Observable<OrderData | null | void> {
    return this.order$;
  }
}
