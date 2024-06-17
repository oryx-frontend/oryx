import { AppRef, PageMetaService } from '@oryx-frontend/core';
import { resolve } from '@oryx-frontend/di';
import { FontInjectable } from '@oryx-frontend/utilities';
import { isServer } from 'lit';
import {
  Observable,
  Subject,
  asyncScheduler,
  fromEvent,
  map,
  observeOn,
  of,
  startWith,
  takeUntil,
} from 'rxjs';

import { ResourcePlugin } from '../plugins';

export class DefaultFontInjectable implements FontInjectable {
  setFont(id: string, font?: string): Observable<boolean> {
    const href = resolve(AppRef).requirePlugin(ResourcePlugin).getFont(id);

    if (href === undefined) {
      return of(false);
    }

    resolve(PageMetaService).add({
      name: 'link',
      attrs: {
        rel: 'stylesheet',
        href,
        media: 'all',
      },
    });

    if (isServer || !font || document.fonts.check(font)) {
      return of(true);
    }

    const destroy$ = new Subject();

    return fromEvent(document.fonts, 'loadingdone').pipe(
      takeUntil(destroy$.pipe(observeOn(asyncScheduler))),
      startWith(null),
      map(() => {
        const isLoaded = document.fonts.check(font);

        if (isLoaded) {
          destroy$.next(void 0);
        }

        return isLoaded;
      })
    );
  }
}
