import { Provider, inject } from '@oryx-frontend/di';
import { RouteType, RouterService } from '@oryx-frontend/router';
import {
  BreadcrumbItem,
  BreadcrumbResolver,
  BreadcrumbResolvers,
} from '@oryx-frontend/site';
import { featureVersion } from '@oryx-frontend/utilities';
import { Observable, map } from 'rxjs';
import { PRODUCTS } from '../../../entity';

export class ProductListBreadcrumbResolver implements BreadcrumbResolver {
  constructor(protected routerService = inject(RouterService)) {}

  resolve(): Observable<BreadcrumbItem[]> {
    return this.routerService.current().pipe(
      map(({ query }) => [
        {
          text: query.q
            ? {
                token: 'product.breadcrumb.search-for-<search>',
                values: { search: `"${query.q}"` },
              }
            : { token: 'product.breadcrumb.search' },
        },
      ])
    );
  }
}

export const ProductListBreadcrumb: Provider = {
  provide: `${BreadcrumbResolvers}${
    featureVersion >= '1.4' ? PRODUCTS : RouteType.ProductList
  }`,
  useClass: ProductListBreadcrumbResolver,
};
