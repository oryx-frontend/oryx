import {
  ContextService,
  ElementResolver,
  PageMetaResolver,
} from '@oryx-frontend/core';
import { inject } from '@oryx-frontend/di';
import { LinkService, RouterService } from '@oryx-frontend/router';
import { Observable, combineLatest, map, of, switchMap } from 'rxjs';
import { PRODUCT } from '../../entity';

export class ProductPageCanonicalUrlResolver implements PageMetaResolver {
  protected context = inject(ContextService);
  protected router = inject(RouterService);
  protected linkService = inject(LinkService);

  getScore(): Observable<unknown[]> {
    return combineLatest([
      this.context.get(null, PRODUCT),
      this.router
        .currentRoute()
        .pipe(map((route) => route.includes('product'))),
    ]);
  }

  resolve(): Observable<ElementResolver> {
    return this.context.get(null, PRODUCT).pipe(
      switchMap((qualifier) => {
        if (!qualifier) return of({});

        return this.linkService
          .get({ type: PRODUCT, qualifier: { sku: qualifier.sku } })
          .pipe(
            map((link) => ({
              canonical: `${globalThis.location.origin}${link}`,
            }))
          );
      })
    );
  }
}
