import { HttpErrorResponse } from '@spryker-oryx/core';
import { NullableGeneric } from '@spryker-oryx/utilities/typescript';
import { Observable } from 'rxjs';
import { Product, ProductQualifier } from '../models';

export interface ProductService {
  get(qualifier: ProductQualifier): Observable<NullableGeneric<Product>>;
  getError(
    qualifier: ProductQualifier
  ): Observable<NullableGeneric<HttpErrorResponse>>;
}

export const ProductService = 'FES.ProductService';

declare global {
  interface InjectionTokensContractMap {
    [ProductService]: ProductService;
  }
}
