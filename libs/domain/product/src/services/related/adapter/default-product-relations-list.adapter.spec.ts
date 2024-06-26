import { HttpService, JsonAPITransformerService } from '@oryx-frontend/core';
import { HttpTestService } from '@oryx-frontend/core/testing';
import { createInjector, destroyInjector } from '@oryx-frontend/di';
import { of } from 'rxjs';
import { ProductQualifier } from '../../../models';
import { RelationsListNormalizer } from '../../adapter/normalizers/relations-list';
import { DefaultProductRelationsListAdapter } from './default-product-relations-list.adapter';
import { ProductRelationsListAdapter } from './product-relations-list.adapter';

const mockApiUrl = 'mockApiUrl';
const mockProducts = {
  data: [
    {
      attributes: {
        abstractProducts: [],
        concreteProducts: [],
      },
    },
  ],
};

const mockTransformer = {
  do: vi.fn().mockReturnValue(() => of(null)),
};

describe('DefaultProductRelationsListAdapter', () => {
  let adapter: ProductRelationsListAdapter;
  let http: HttpTestService;

  beforeEach(() => {
    const testInjector = createInjector({
      providers: [
        {
          provide: HttpService,
          useClass: HttpTestService,
        },
        {
          provide: ProductRelationsListAdapter,
          useClass: DefaultProductRelationsListAdapter,
        },
        {
          provide: 'SCOS_BASE_URL',
          useValue: mockApiUrl,
        },
        {
          provide: JsonAPITransformerService,
          useValue: mockTransformer,
        },
      ],
    });

    adapter = testInjector.inject(
      ProductRelationsListAdapter
    ) as DefaultProductRelationsListAdapter;
    http = testInjector.inject(HttpService) as HttpTestService;
  });

  afterEach(() => {
    vi.clearAllMocks();
    destroyInjector();
  });

  it('should be provided', () => {
    expect(adapter).toBeInstanceOf(DefaultProductRelationsListAdapter);
  });

  describe('get method', () => {
    const mockQualifier: ProductQualifier = { sku: 'test' };

    beforeEach(() => {
      http.flush(mockProducts);
    });

    afterEach(() => {
      vi.clearAllMocks();
    });

    it('should have correct http path', () => {
      adapter.get(mockQualifier);
      expect(http.url).toContain(
        `concrete-products/${mockQualifier.sku}/concrete-alternative-products`
      );
    });

    it('should call transformer with proper normalizer', () => {
      adapter.get(mockQualifier).subscribe();

      expect(mockTransformer.do).toHaveBeenCalledWith(RelationsListNormalizer);
    });

    it('should return transformed data', () => {
      const mockTransformerData = 'mockTransformerData';
      const callback = vi.fn();
      mockTransformer.do.mockReturnValue(() => of(mockTransformerData));

      adapter.get(mockQualifier).subscribe(callback);

      expect(callback).toHaveBeenCalledWith(mockTransformerData);
    });
  });
});
