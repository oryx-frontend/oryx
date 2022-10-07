import {
  CartAdapter,
  CartService,
  DefaultCartService,
} from '@spryker-oryx/cart';
import { Provider } from '@spryker-oryx/injector';
import { MockCartAdapter } from './mock-cart.adapter';

export const mockCartProviders: Provider[] = [
  {
    provide: CartAdapter,
    useClass: MockCartAdapter,
  },
  {
    provide: CartService,
    useClass: DefaultCartService,
  },
];