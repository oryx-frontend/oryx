import {
  ContextService,
  ElementResolver,
  PageMetaResolver,
} from '@oryx-frontend/core';
import { inject } from '@oryx-frontend/di';
import { RouterService } from '@oryx-frontend/router';
import { Observable, combineLatest, map, of, switchMap } from 'rxjs';
import { CmsContent, ContentQualifier } from '../models';
import { ContentContext, ContentService } from '../services';

export class CmsPageTitleMetaResolver implements PageMetaResolver {
  constructor(
    protected context = inject(ContextService),
    protected router = inject(RouterService),
    protected content = inject(ContentService)
  ) {}

  getScore(): Observable<unknown[]> {
    return combineLatest([
      this.context.get(null, ContentContext.Content),
      combineLatest([
        this.context.get(null, ContentContext.Content),
        this.router.currentRoute(),
      ]).pipe(
        map(([qualifier, route]) =>
          route.includes(`/${qualifier?.type}/${qualifier?.id}`)
        )
      ),
    ]);
  }

  resolve(): Observable<ElementResolver> {
    return this.context
      .get<ContentQualifier>(null, ContentContext.Content)
      .pipe(
        switchMap((qualifier) => {
          const type = qualifier?.type;
          const id = qualifier?.id;

          if (!id || !type) return of({});

          return this.content
            .get<CmsContent>({
              id,
              type,
              entities: [type],
            })
            .pipe(
              map((data) => (data?.heading ? { title: data.heading } : {}))
            );
        })
      );
  }
}
