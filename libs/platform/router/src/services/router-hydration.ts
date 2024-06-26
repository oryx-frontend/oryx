import { HydrationTrigger } from '@oryx-frontend/core';
import { inject } from '@oryx-frontend/di';
import { rootInjectable } from '@oryx-frontend/utilities';
import { map, Observable, skip, take } from 'rxjs';
import { RouterService } from './router.service';

export const routerHydration = {
  provide: HydrationTrigger,
  useFactory: (): Observable<HTMLElement> =>
    inject(RouterService)
      .currentRoute()
      .pipe(
        skip(1),
        take(1),
        map(() => {
          const root = rootInjectable.get();
          const queryRoot = document.querySelector(root);
          const querySelector =
            root === 'body' ? queryRoot : queryRoot?.shadowRoot;

          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          return querySelector!.querySelector('[route]')!;
        })
      ),
};
