import { provideEntity } from '@oryx-frontend/core';
import { Provider } from '@oryx-frontend/di';
import {
  DefaultProductAdapter,
  DefaultProductImageService,
  DefaultProductListPageService,
  DefaultProductListService,
  PRODUCT,
  ProductAdapter,
  ProductCategoryService,
  ProductImageService,
  ProductListAdapter,
  ProductListPageService,
  ProductListService,
  productMediaConfig,
  ProductMediaConfig,
  ProductRelationsListService,
  ProductService,
} from '@oryx-frontend/product';
import { MockProductCategoryService } from './mock-category.service';
import { MockProductService } from './mock-product.service';
import { MockProductListAdapter } from './product-list';
import { MockProductRelationsListService } from './product-relations/mock-product-relations-list.service';

export const mockProductProviders: Provider[] = [
  {
    provide: ProductAdapter,
    useClass: DefaultProductAdapter,
  },
  {
    provide: ProductService,
    useClass: MockProductService,
  },
  {
    provide: ProductListAdapter,
    useClass: MockProductListAdapter,
  },
  {
    provide: ProductListService,
    useClass: DefaultProductListService,
  },
  {
    provide: ProductListPageService,
    useClass: DefaultProductListPageService,
  },
  {
    provide: ProductImageService,
    useClass: DefaultProductImageService,
  },
  {
    provide: ProductMediaConfig,
    useValue: productMediaConfig,
  },
  {
    provide: ProductRelationsListService,
    useClass: MockProductRelationsListService,
  },
  {
    provide: ProductCategoryService,
    useClass: MockProductCategoryService,
  },
  provideEntity(PRODUCT, {
    service: ProductService,
  }),
];
