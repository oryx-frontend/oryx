import { inject } from '@oryx-frontend/di';
import { Facet, ProductListPageService } from '@oryx-frontend/product';
import { Observable, map } from 'rxjs';
import { FacetQualifier } from '../models';
import { FacetListService } from './facet-list.service';

export class DefaultFacetListService implements FacetListService {
  constructor(protected productListService = inject(ProductListPageService)) {}

  get(): Observable<Facet[] | null> {
    return this.productListService.get().pipe(map((pl) => pl?.facets ?? []));
  }

  getFacet({ parameter, name }: FacetQualifier): Observable<Facet> {
    return this.get().pipe(
      map(
        (facets) =>
          facets?.find(
            (facet) =>
              (name && facet.name === name) ||
              (parameter && facet.parameter === parameter)
          ) ?? ({} as Facet)
      )
    );
  }
}
