import { Provider, inject } from '@oryx-frontend/di';
import { ProductCategoryService, ValueFacet } from '@oryx-frontend/product';
import { RouteType } from '@oryx-frontend/router';
import {
  BreadcrumbItem,
  BreadcrumbResolver,
  BreadcrumbResolvers,
  LinkService,
} from '@oryx-frontend/site';
import { Observable, combineLatest, map, switchMap } from 'rxjs';
import { FacetListService } from '../facet-list.service';

export class CategoryBreadcrumbResolver implements BreadcrumbResolver {
  constructor(
    protected facetListService = inject(FacetListService),
    protected categoryService = inject(ProductCategoryService),
    protected linkService = inject(LinkService)
  ) {}

  resolve(): Observable<BreadcrumbItem[]> {
    return this.facetListService.getFacet({ parameter: 'category' }).pipe(
      switchMap((category) =>
        this.categoryService
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          .getTrail(String((category as ValueFacet).selectedValues![0]))
          .pipe(
            switchMap((trail) =>
              combineLatest(
                trail.map(({ id, name }) =>
                  this.linkService
                    .get({ id, type: RouteType.Category })
                    .pipe(map((url) => ({ text: { raw: name }, url })))
                )
              )
            )
          )
      )
    );
  }
}

export const CategoryBreadcrumb: Provider = {
  provide: `${BreadcrumbResolvers}${RouteType.Category}`,
  useClass: CategoryBreadcrumbResolver,
};
