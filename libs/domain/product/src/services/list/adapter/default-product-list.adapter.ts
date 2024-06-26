import {
  HttpService,
  JsonApiIncludeService,
  JsonAPITransformerService,
} from '@oryx-frontend/core';
import { inject } from '@oryx-frontend/di';
import { featureVersion } from '@oryx-frontend/utilities';
import { Observable, switchMap } from 'rxjs';
import { PRODUCTS } from '../../../entity';
import {
  ApiProductModel,
  ProductList,
  ProductListQualifier,
} from '../../../models';
import { ProductListNormalizer } from '../../adapter';
import { ProductListAdapter } from './product-list.adapter';

export class DefaultProductListAdapter implements ProductListAdapter {
  protected queryEndpoint = 'catalog-search';
  protected readonly alias: Record<string, string> = {
    minPrice: 'price[min]',
    maxPrice: 'price[max]',
    minRating: 'rating[min]',
    storageCapacity: 'storage_capacity[]',
  };

  constructor(
    protected http = inject(HttpService),
    protected SCOS_BASE_URL = inject('SCOS_BASE_URL'),
    protected transformer = inject(JsonAPITransformerService),
    protected includeService = inject(JsonApiIncludeService)
  ) {}

  getKey(qualifier: ProductListQualifier): string {
    const qualifierKeys = Object.keys(qualifier);

    return qualifierKeys.length
      ? qualifierKeys
          .reduce((params: string[], key) => {
            const qualifierKey = key as keyof ProductListQualifier;
            const param = qualifier[qualifierKey];

            if (param) {
              const paramList = String(param).split(',');

              params.push(
                paramList.length > 1
                  ? paramList
                      .map(
                        (plv) =>
                          `${this.alias[qualifierKey] ?? qualifierKey}[]=${plv}`
                      )
                      .join('&')
                  : `${this.alias[qualifierKey] ?? qualifierKey}=${param}`
              );
            }
            return params;
          }, [])
          .join('&')
      : '';
  }

  get(qualifier: ProductListQualifier): Observable<ProductList> {
    if (featureVersion >= '1.4') {
      return this.includeService.get({ resource: PRODUCTS }).pipe(
        switchMap((includes) =>
          this.http.get<ApiProductModel.Response>(
            `${this.SCOS_BASE_URL}/${this.queryEndpoint}?${this.getKey(
              qualifier
            )}&${includes}`
          )
        ),
        this.transformer.do(ProductListNormalizer)
      );
    } else {
      const include = [
        ApiProductModel.Includes.AbstractProducts,
        ApiProductModel.Includes.CategoryNodes,
        ApiProductModel.Includes.ConcreteProducts,
        ApiProductModel.Includes.ConcreteProductImageSets,
        ApiProductModel.Includes.ConcreteProductPrices,
        ApiProductModel.Includes.ConcreteProductAvailabilities,
        ApiProductModel.Includes.Labels,
      ];

      const categoryNodeFields = [
        ApiProductModel.CategoryNodeFields.MetaDescription,
        ApiProductModel.CategoryNodeFields.NodeId,
        ApiProductModel.CategoryNodeFields.Order,
        ApiProductModel.CategoryNodeFields.Name,
        ApiProductModel.CategoryNodeFields.Children,
        ApiProductModel.CategoryNodeFields.IsActive,
      ];

      const fields =
        featureVersion >= '1.1'
          ? `&fields[${
              ApiProductModel.Includes.CategoryNodes
            }]=${categoryNodeFields.join(',')}
    `
          : '';

      return this.http
        .get<ApiProductModel.Response>(
          `${this.SCOS_BASE_URL}/${this.queryEndpoint}?${this.getKey(
            qualifier
          )}&include=${include?.join(',')}
        ${fields}`
        )
        .pipe(this.transformer.do(ProductListNormalizer));
    }
  }
}
