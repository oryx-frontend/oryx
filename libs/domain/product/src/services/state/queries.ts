import { provideQuery, Query, QueryOptions } from '@oryx-frontend/core';
import { inject } from '@oryx-frontend/di';
import { LocaleChanged } from '@oryx-frontend/i18n';
import { CurrencyChanged, PriceModeChanged } from '@oryx-frontend/site';
import { Product, ProductQualifier } from '../../models';
import { ProductAdapter } from '../adapter';
import { ProductLoaded } from './events';

export const ProductQuery = 'oryx.productQuery';

export type ProductQuery = Query<Product, ProductQualifier>;

export function productQueryFactory(
  adapter = inject(ProductAdapter)
): QueryOptions<Product, ProductQualifier> {
  return {
    cacheKey: (q: ProductQualifier) => q?.sku ?? '',
    loader: (q: ProductQualifier) => adapter.get(q),
    onLoad: [ProductLoaded],
    refreshOn: [LocaleChanged, CurrencyChanged, PriceModeChanged],
  };
}

export const productQueries = [provideQuery(ProductQuery, productQueryFactory)];
