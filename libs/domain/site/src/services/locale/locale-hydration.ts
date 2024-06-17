import { HydrationTrigger } from '@oryx-frontend/core';
import { inject } from '@oryx-frontend/di';
import { LocaleService } from '@oryx-frontend/i18n';
import { Observable, skip, take } from 'rxjs';

export const localeHydration = {
  provide: HydrationTrigger,
  useFactory: (): Observable<unknown> =>
    inject(LocaleService).get().pipe(skip(1), take(1)),
};
