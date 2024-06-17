import {
  CartAdapter,
  CartService,
  TotalsResolver,
  TotalsService,
} from '@oryx-frontend/cart';
import {
  DefaultCartService,
  DefaultTotalsService,
} from '@oryx-frontend/cart/services';
import { Provider } from '@oryx-frontend/di';
import { ExperienceData } from '@oryx-frontend/experience';
import { cartTotalsStaticData, mockedTotals } from './cart-totals';
import {
  mockNormalizedCartTotals,
  mockNormalizedCartTotalsNetMode,
  mockNormalizedCartTotalsSingleDiscount,
} from './mock-cart';
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
  {
    provide: ExperienceData,
    useValue: cartTotalsStaticData,
  },
  {
    provide: TotalsService,
    useClass: DefaultTotalsService,
  },
  {
    provide: `${TotalsResolver}CART`,
    useClass: mockedTotals(mockNormalizedCartTotals),
  },
  {
    provide: `${TotalsResolver}CART-NET-MODE`,
    useClass: mockedTotals(mockNormalizedCartTotalsNetMode),
  },
  {
    provide: `${TotalsResolver}CART-SINGLE-DISCOUNT`,
    useClass: mockedTotals(mockNormalizedCartTotalsSingleDiscount),
  },
];
