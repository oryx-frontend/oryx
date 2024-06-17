/* eslint-disable @typescript-eslint/no-explicit-any */
import { SSRAwaiterService } from '@oryx-frontend/core';
import { inject, resolve } from '@oryx-frontend/di';
import { isPromise } from '@oryx-frontend/utilities';
import { Observable, defer, finalize, from, tap } from 'rxjs';

export const ssrAwaiter = <T>(
  object: Observable<T> | Promise<T>
): Observable<T> => {
  const observable = isPromise(object) ? from(object) : object;
  let ssrAwaiter: SSRAwaiterService | null = null;

  try {
    ssrAwaiter = inject(SSRAwaiterService);
  } catch (_e) {
    ssrAwaiter = resolve(SSRAwaiterService, null);
  }

  if (!ssrAwaiter) return observable;

  return defer(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const resolveFn = ssrAwaiter!.getAwaiter();
    const tapFn = (): void => {
      setTimeout(resolveFn, 0);
    };

    return observable.pipe(tap(tapFn), finalize(tapFn));
  });
};
