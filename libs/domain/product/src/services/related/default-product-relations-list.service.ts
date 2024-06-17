import { createQuery } from '@oryx-frontend/core';
import { inject } from '@oryx-frontend/di';
import { LocaleChanged } from '@oryx-frontend/i18n';
import { CurrencyChanged, PriceModeChanged } from '@oryx-frontend/site';
import { Observable } from 'rxjs';
import { Product, ProductQualifier } from '../../models';
import { ProductsLoaded } from '../state';
import { ProductRelationsListAdapter } from './adapter';
import { ProductRelationsListService } from './product-relations-list.service';

export class DefaultProductRelationsListService
  implements ProductRelationsListService
{
  protected productsListQuery = createQuery({
    loader: (qualifier: ProductQualifier) => this.adapter.get(qualifier),
    onLoad: [ProductsLoaded],
    refreshOn: [LocaleChanged, CurrencyChanged, PriceModeChanged],
  });

  constructor(protected adapter = inject(ProductRelationsListAdapter)) {}

  get(qualifier: ProductQualifier): Observable<Product[] | undefined> {
    return this.productsListQuery.get(qualifier);
  }
}
