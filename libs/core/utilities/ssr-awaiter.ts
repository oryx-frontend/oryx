/* eslint-disable @typescript-eslint/no-explicit-any */
import { SSRAwaiterService } from '@spryker-oryx/core';
import { inject, resolve } from '@spryker-oryx/injector';
import { isPromise } from '@spryker-oryx/typescript-utils';
import { from, Observable, tap } from 'rxjs';

export const ssrAwaiter = (
  object: Observable<any> | Promise<any>
): Observable<any> => {
  const observable = isPromise(object) ? from(object) : object;
  let ssrAwaiter: SSRAwaiterService | null = null;

  try {
    ssrAwaiter = inject(SSRAwaiterService);
  } catch (_e) {
    ssrAwaiter = resolve(SSRAwaiterService, null);
  }

  if (!ssrAwaiter) return observable;

  const resolveFn = ssrAwaiter.getAwaiter();
  const tapFn = (): void => {
    setTimeout(resolveFn, 0);
  };

  return observable.pipe(
    tap({
      next: tapFn,
      error: tapFn,
      complete: tapFn,
    })
  );
};