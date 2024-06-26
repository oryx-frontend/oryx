import { ContextService } from '@oryx-frontend/core';
import { Provider, inject } from '@oryx-frontend/di';
import { RouteType, RouterService } from '@oryx-frontend/router';
import {
  BreadcrumbItem,
  BreadcrumbResolver,
  BreadcrumbResolvers,
  LinkService,
} from '@oryx-frontend/site';
import { featureVersion } from '@oryx-frontend/utilities';
import {
  Observable,
  combineLatest,
  delay,
  map,
  of,
  switchMap,
  throwError,
} from 'rxjs';
import { PRODUCT } from '../../../entity';
import { Product, ProductCategory, ProductQualifier } from '../../../models';
import { ProductCategoryService } from '../../category';
import { ProductContext } from '../../product-context';
import { ProductService } from '../../product.service';

export class ProductDetailsBreadcrumbResolver implements BreadcrumbResolver {
  constructor(
    /** @deprecated since 1.3 */
    protected routerService = inject(RouterService),
    protected linkService = inject(LinkService),
    protected productService = inject(ProductService),
    protected categoryService = inject(ProductCategoryService),
    protected context = inject(ContextService)
  ) {}

  resolve(): Observable<BreadcrumbItem[]> {
    return this.context
      .get<ProductQualifier>(
        null,
        featureVersion >= '1.4' ? PRODUCT : ProductContext.SKU
      )
      .pipe(
        // TODO: deprecated since 1.3, mapping won't be needed as context will always return qualifier in 1.3+
        map((sku) =>
          featureVersion >= '1.3'
            ? sku
            : sku
            ? ({ sku } as ProductQualifier)
            : undefined
        ),
        switchMap((qualifier: ProductQualifier | undefined) =>
          qualifier
            ? this.productService.get(qualifier).pipe(
                //add a delay to make sure that categories data are already populated
                //from product's included resources and stored in category service
                //before the trail is requested
                delay(0),
                switchMap((product) =>
                  product
                    ? this.generateBreadcrumbTrail(product)
                    : throwError(() => new Error('Product not found'))
                )
              )
            : of([])
        )
      );
  }

  protected generateBreadcrumbTrail(
    product: Product
  ): Observable<BreadcrumbItem[]> {
    const { categoryIds } = product;

    if (!categoryIds?.length) {
      return of([this.productTitle(product)]);
    }

    return combineLatest(
      categoryIds.map((id) => this.categoryService.getTrail(id))
    ).pipe(
      switchMap((trails) =>
        combineLatest([
          ...this.getLongestTrail(trails).map(({ id, name }) =>
            this.linkService
              .get({ id, type: RouteType.Category })
              .pipe(map((url) => ({ text: { raw: name }, url })))
          ),
          of(this.productTitle(product)),
        ])
      )
    );
  }

  protected productTitle(product: Product): BreadcrumbItem {
    return { text: { raw: product.name as string } };
  }

  protected getLongestTrail(trails: ProductCategory[][]): ProductCategory[] {
    return trails.sort((a, b) => b.length - a.length)[0];
  }
}

export const ProductDetailsBreadcrumb: Provider = {
  provide: `${BreadcrumbResolvers}${RouteType.Product}`,
  useClass: ProductDetailsBreadcrumbResolver,
};
