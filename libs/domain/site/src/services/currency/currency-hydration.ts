import { HydrationTrigger } from '@oryx-frontend/core';
import { inject } from '@oryx-frontend/di';
import { Observable, skip, take } from 'rxjs';
import { CurrencyService } from './currency.service';

export const currencyHydration = {
  provide: HydrationTrigger,
  useFactory: (): Observable<unknown> =>
    inject(CurrencyService).get().pipe(skip(1), take(1)),
};
