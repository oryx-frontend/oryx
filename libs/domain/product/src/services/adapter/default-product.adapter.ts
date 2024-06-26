import {
  HttpService,
  JsonApiIncludeService,
  JsonAPITransformerService,
} from '@oryx-frontend/core';
import { inject } from '@oryx-frontend/di';
import { featureVersion } from '@oryx-frontend/utilities';
import { Observable, switchMap } from 'rxjs';
import { PRODUCT } from '../../entity';
import { ApiProductModel, Product, ProductQualifier } from '../../models';
import { ProductNormalizer } from './normalizers';
import { ProductAdapter } from './product.adapter';

export class DefaultProductAdapter implements ProductAdapter {
  protected productEndpoint = 'concrete-products';

  constructor(
    protected http = inject(HttpService),
    protected SCOS_BASE_URL = inject('SCOS_BASE_URL'),
    protected transformer = inject(JsonAPITransformerService),
    protected includeService = inject(JsonApiIncludeService)
  ) {}

  getKey(qualifier: ProductQualifier): string {
    return (qualifier.sku ?? '') + qualifier.include?.sort()?.join('');
  }

  get({ sku, include }: ProductQualifier): Observable<Product> {
    if (featureVersion >= '1.4') {
      return this.includeService.get({ resource: PRODUCT }).pipe(
        switchMap((includes) =>
          this.http.get(
            `${this.SCOS_BASE_URL}/${this.productEndpoint}/${sku}${
              includes ? `?${includes}` : ''
            }`
          )
        ),
        this.transformer.do(ProductNormalizer)
      );
    } else {
      include = [
        ApiProductModel.Includes.ConcreteProductImageSets,
        ApiProductModel.Includes.ConcreteProductPrices,
        ApiProductModel.Includes.ConcreteProductAvailabilities,
        ApiProductModel.Includes.Labels,
        ApiProductModel.Includes.AbstractProducts,
        ApiProductModel.Includes.CategoryNodes,
        ...(include ?? []),
      ].filter((type, index, arr) => arr.indexOf(type) === index);

      const categoryNodeFields = [
        ApiProductModel.CategoryNodeFields.MetaDescription,
        ApiProductModel.CategoryNodeFields.NodeId,
        ApiProductModel.CategoryNodeFields.Order,
        ApiProductModel.CategoryNodeFields.Name,
        ApiProductModel.CategoryNodeFields.Parents,
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
          `${this.SCOS_BASE_URL}/${this.productEndpoint}/${sku}${
            include ? '?include=' : ''
          }${include?.join(',') || ''}
        ${fields}`
        )
        .pipe(this.transformer.do(ProductNormalizer));
    }
  }
}
