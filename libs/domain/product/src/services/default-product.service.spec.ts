import { DefaultQueryService, QueryService } from '@oryx-frontend/core';
import { createInjector, destroyInjector } from '@oryx-frontend/di';
import { productQueries } from '@oryx-frontend/product';
import { Observable, of, switchMap, take } from 'rxjs';
import { SpyInstance } from 'vitest';
import { ProductQualifier } from '../models';
import { ProductAdapter } from './adapter/product.adapter';
import { DefaultProductService } from './default-product.service';
import { ProductService } from './product.service';

class MockProductAdapter implements Partial<ProductAdapter> {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  getKey = (qualifier: ProductQualifier): string => qualifier.sku!;
  get = vi
    .fn()
    .mockImplementation((qualifier: ProductQualifier) =>
      of({ name: `adapter ${qualifier.sku}` })
    );
}

describe('DefaultProductService', () => {
  let service: ProductService;
  let adapter: ProductAdapter;

  beforeEach(() => {
    const testInjector = createInjector({
      providers: [
        {
          provide: ProductService,
          useClass: DefaultProductService,
        },
        {
          provide: ProductAdapter,
          useClass: MockProductAdapter,
        },
        {
          provide: QueryService,
          useClass: DefaultQueryService,
        },
        ...productQueries,
      ],
    });

    service = testInjector.inject(ProductService);
    adapter = testInjector.inject(ProductAdapter);
  });

  afterEach(() => {
    destroyInjector();
  });

  it('should be provided', () => {
    expect(service).toBeInstanceOf(DefaultProductService);
  });

  describe('get', () => {
    it('should return an observable', () => {
      expect(service.get({})).toBeInstanceOf(Observable);
    });

    it('should return an observable with a product from adapter', () => {
      const callback = vi.fn();
      service.get({ sku: '123' }).subscribe(callback);
      expect(callback).toHaveBeenCalledWith(
        expect.objectContaining({ name: 'adapter 123' })
      );
    });

    it('should call `get` method of adapter only for getting new product', () => {
      service.get({ sku: '123' }).pipe(take(1)).subscribe();
      expect(adapter.get).toHaveBeenCalledTimes(1);
      service.get({ sku: '123' }).pipe(take(1)).subscribe();
      expect(adapter.get).toHaveBeenCalledTimes(1);
      service.get({ sku: '124' }).pipe(take(1)).subscribe();
      expect(adapter.get).toHaveBeenCalledTimes(2);
    });

    it('should return an observable with undefined if error has been caught', () => {
      (adapter.get as unknown as SpyInstance).mockReturnValue(
        of(null).pipe(
          switchMap(() => {
            throw 'error';
          })
        )
      );
      const callback = vi.fn();
      service.get({}).subscribe(callback);
      expect(callback).toHaveBeenCalledWith(undefined);
    });
  });

  describe('getState', () => {
    it('should return an observable', () => {
      expect(service.getState({})).toBeInstanceOf(Observable);
    });

    it('should return an observable with a product state from adapter', () => {
      const callback = vi.fn();
      service.getState({ sku: '123' }).subscribe(callback);
      expect(callback).toHaveBeenCalledWith(
        expect.objectContaining({ data: { name: 'adapter 123' } })
      );
    });

    it('should call `get` method of adapter only for getting new product', () => {
      service.getState({ sku: '123' }).pipe(take(1)).subscribe();
      expect(adapter.get).toHaveBeenCalledTimes(1);
      service.getState({ sku: '123' }).pipe(take(1)).subscribe();
      expect(adapter.get).toHaveBeenCalledTimes(1);
      service.getState({ sku: '124' }).pipe(take(1)).subscribe();
      expect(adapter.get).toHaveBeenCalledTimes(2);
    });

    it('should return an observable with error state if error has been caught', () => {
      const testError = new Error();
      (adapter.get as unknown as SpyInstance).mockReturnValue(
        of(null).pipe(
          switchMap(() => {
            throw testError;
          })
        )
      );
      const callback = vi.fn();
      service.getState({}).subscribe(callback);
      expect(callback).toHaveBeenCalledWith(
        expect.objectContaining({ data: undefined, error: testError })
      );
    });
  });
});
