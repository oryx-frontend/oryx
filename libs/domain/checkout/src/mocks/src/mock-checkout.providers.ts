import {
  CheckoutDataService,
  CheckoutService,
  CheckoutStateService,
  DefaultCheckoutStateService,
} from '@oryx-frontend/checkout';
import { Provider } from '@oryx-frontend/di';

import { StorageService } from '@oryx-frontend/core';
import { ExperienceData } from '@oryx-frontend/experience';
import { MockCheckoutDataService } from './mock-checkout-data.service';
import { MockCheckoutService } from './mock-checkout.service';
import { MockStorageService } from './mock-storage.service';

export const checkoutOrchestratorStaticData = [
  {
    id: 'singlePage',
    components: [
      { type: 'oryx-checkout-account' },
      { type: 'oryx-checkout-delivery' },
      { type: 'oryx-checkout-shipping-method' },
      { type: 'oryx-checkout-payment-method' },
    ],
  },
];

export const mockCheckoutProviders: Provider[] = [
  {
    provide: CheckoutService,
    useClass: MockCheckoutService,
  },
  {
    provide: CheckoutDataService,
    useClass: MockCheckoutDataService,
  },
  {
    provide: CheckoutStateService,
    useClass: DefaultCheckoutStateService,
  },
  {
    provide: StorageService,
    useClass: MockStorageService,
  },
  {
    provide: ExperienceData,
    useValue: checkoutOrchestratorStaticData,
  },
];
