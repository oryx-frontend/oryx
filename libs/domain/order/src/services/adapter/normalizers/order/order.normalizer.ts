import { Transformer } from '@oryx-frontend/core';
import { Provider } from '@oryx-frontend/di';
import { OrderData } from '../../../../models';
import { DeserializedOrder } from './order.model';

export const OrderNormalizer = 'oryx.OrderNormalizer*';

export function orderAttributesNormalizer(
  data: DeserializedOrder
): Partial<OrderData> {
  return Object.entries(data).reduce(
    (acc, [key, value]) => ({
      ...acc,
      ...(value !== null && { [key]: value }),
    }),
    {}
  );
}

export const orderNormalizer: Provider[] = [
  {
    provide: OrderNormalizer,
    useValue: orderAttributesNormalizer,
  },
];

declare global {
  interface InjectionTokensContractMap {
    [OrderNormalizer]: Transformer<OrderData>[];
  }
}
