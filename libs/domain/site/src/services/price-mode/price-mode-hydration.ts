import { HydrationTrigger } from '@oryx-frontend/core';
import { inject } from '@oryx-frontend/di';
import { Observable, skip, take } from 'rxjs';
import { PriceModeService } from './price-mode.service';

export const priceModeHydration = {
  provide: HydrationTrigger,
  useFactory: (): Observable<unknown> =>
    inject(PriceModeService).get().pipe(skip(1), take(1)),
};
