import {
  Product,
  ProductQualifier,
  ProductRelationsListService,
} from '@oryx-frontend/product';
import { MockProductService } from '@oryx-frontend/product/mocks';
import { Observable, of } from 'rxjs';

export class MockProductRelationsListService
  implements ProductRelationsListService
{
  get({ sku }: ProductQualifier): Observable<Product[] | undefined> {
    return of([
      MockProductService.mockProducts[Number(sku) - 1],
      MockProductService.mockProducts[Number(sku)],
      MockProductService.mockProducts[Number(sku) + 1],
    ]);
  }
}
