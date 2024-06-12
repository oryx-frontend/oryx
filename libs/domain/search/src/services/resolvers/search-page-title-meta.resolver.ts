import { ElementResolver, PageMetaResolver } from '@oryx-frontend/core';
import { inject } from '@oryx-frontend/di';
import { RouterService } from '@oryx-frontend/router';
import { Observable, combineLatest, map } from 'rxjs';

export class SearchPageTitleMetaResolver implements PageMetaResolver {
  constructor(protected router = inject(RouterService)) {}

  getScore(): Observable<unknown[]> {
    return combineLatest([
      this.router.currentQuery().pipe(map((query) => query?.q)),
    ]);
  }

  resolve(): Observable<ElementResolver> {
    return this.router.currentQuery().pipe(
      map((query) => {
        return query?.q ? { title: query.q as string } : {};
      })
    );
  }
}
