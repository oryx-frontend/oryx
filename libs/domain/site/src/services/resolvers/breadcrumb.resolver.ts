import { PageMetaResolverService } from '@oryx-frontend/core';
import { inject } from '@oryx-frontend/di';
import { Observable, map } from 'rxjs';
import { BreadcrumbItem } from '../../models';
import { BreadcrumbResolver, BreadcrumbResolvers } from '../breadcrumb';

export class DefaultFallbackBreadcrumbResolver implements BreadcrumbResolver {
  constructor(protected pageMetaService = inject(PageMetaResolverService)) {}

  resolve(): Observable<BreadcrumbItem[]> {
    return this.pageMetaService
      .getTitle()
      .pipe(map((title) => [{ text: { raw: title as string } }]));
  }
}

export const FallbackBreadcrumbResolver = `${BreadcrumbResolvers}fallback`;
