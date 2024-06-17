import { ContentContext } from '@oryx-frontend/content';
import { ContextFallback } from '@oryx-frontend/core';
import { inject, Provider } from '@oryx-frontend/di';
import { RouterService } from '@oryx-frontend/router';
import { combineLatest, map } from 'rxjs';

export const ArticleQualifierContextFallback: Provider = {
  provide: `${ContextFallback}${ContentContext.Content}`,
  useFactory: () =>
    combineLatest([
      inject(RouterService).currentRoute(),
      inject(RouterService).currentParams(),
    ]).pipe(
      map(([route, params]) => ({
        id: params?.id,
        type: route.split('/').filter(Boolean)[0],
      }))
    ),
};
