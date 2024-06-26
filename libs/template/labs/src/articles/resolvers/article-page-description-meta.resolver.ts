import {
  ContentContext,
  ContentQualifier,
  ContentService,
} from '@oryx-frontend/content';
import {
  ContextService,
  ElementResolver,
  PageMetaResolver,
} from '@oryx-frontend/core';
import { inject } from '@oryx-frontend/di';
import { RouterService } from '@oryx-frontend/router';
import { Observable, combineLatest, map, of, switchMap } from 'rxjs';
import { ArticleContent } from '../article.model';

export class ArticlePageDescriptionMetaResolver implements PageMetaResolver {
  constructor(
    protected context = inject(ContextService),
    protected content = inject(ContentService),
    protected router = inject(RouterService)
  ) {}

  getScore(): Observable<unknown[]> {
    return combineLatest([
      this.context.get(null, ContentContext.Content),
      combineLatest([
        this.context.get(null, ContentContext.Content),
        this.router.currentRoute(),
      ]).pipe(map(([type, route]) => route.includes(`/${type}/`))),
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
            .get<ArticleContent>({
              id,
              type,
              entities: [type],
            })
            .pipe(
              map((data) =>
                data?.description ? { description: data.description } : {}
              )
            );
        })
      );
  }
}
