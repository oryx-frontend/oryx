import { createQuery, QueryState } from '@oryx-frontend/core';
import { inject } from '@oryx-frontend/di';
import { LocaleChanged } from '@oryx-frontend/i18n';
import { CurrencyChanged, PriceModeChanged } from '@oryx-frontend/site';
import { Observable } from 'rxjs';
import { ProductList, ProductListQualifier } from '../../models';
import { ProductsLoaded } from '../state';
import { ProductListAdapter } from './adapter';
import { ProductListService } from './product-list.service';

export class DefaultProductListService implements ProductListService {
  protected productListQuery = createQuery({
    loader: (q: ProductListQualifier) => this.adapter.get(q),
    onLoad: [ProductsLoaded],
    refreshOn: [LocaleChanged, CurrencyChanged, PriceModeChanged],
  });

  constructor(protected adapter = inject(ProductListAdapter)) {}

  get(qualifier: ProductListQualifier): Observable<ProductList | undefined> {
    return this.productListQuery.get(qualifier);
  }

  getState(
    qualifier: ProductListQualifier
  ): Observable<QueryState<ProductList>> {
    return this.productListQuery.getState(qualifier);
  }
}
