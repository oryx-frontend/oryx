import { resolve } from '@spryker-oryx/injector';
import { LitElement } from 'lit';
import { of } from 'rxjs';
import { ProductContext } from '../models';
import { ProductService } from '../services';
import { ProductController } from './product.controller';

const mockSku = 'mockSku';
const mockThis = {} as LitElement;
const mockWithProduct = { product: { name: 'test' } } as unknown as LitElement;
const mockContextGet = vi.fn();
const mockInclude = ['includeA', 'includeB'];

vi.mock('@spryker-oryx/core', () => ({
  ContextController: class {
    get = mockContextGet.mockReturnValue(of(mockSku));
  },
}));

const mockObserveGet = vi.fn();
const mockObserveReturn = 'mockObserveReturn';

vi.mock('@spryker-oryx/lit-rxjs', () => ({
  ObserveController: vi.fn((data) => {
    if (data.product) {
      return {
        get: mockObserveGet.mockReturnValue(of(data.product)),
      };
    }

    return {
      get: mockObserveGet.mockImplementation((key) =>
        key !== 'product' ? mockObserveReturn : of(null)
      ),
    };
  }),
}));

const mockGet = vi.fn();
const mockProduct = {
  product: 'product',
};

vi.mock('@spryker-oryx/injector', () => ({
  resolve: vi.fn().mockReturnValue({
    get: (data: unknown) => mockGet.mockReturnValue(of(mockProduct))(data),
  }),
}));

describe('ProductController', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should expose the product based on the context', () => {
    const productController = new ProductController(mockThis, mockInclude);
    const callback = vi.fn();
    productController.getProduct().subscribe(callback);

    expect(resolve).toHaveBeenCalledWith(productController, ProductService);
    expect(mockObserveGet).toHaveBeenNthCalledWith(1, 'product');
    expect(mockObserveGet).toHaveBeenNthCalledWith(2, 'sku');
    expect(mockContextGet).toHaveBeenCalledWith(
      ProductContext.Code,
      mockObserveReturn
    );
    expect(mockGet).toHaveBeenCalledWith({
      sku: mockSku,
      include: mockInclude,
    });
    expect(callback).toHaveBeenCalledWith(mockProduct);
  });

  it('should expose the product from the host "product" property', () => {
    const productController = new ProductController(mockWithProduct);
    const callback = vi.fn();
    productController.getProduct().subscribe(callback);

    expect(mockObserveGet).toHaveBeenCalledWith('product');
    expect(mockContextGet).not.toHaveBeenCalled();
    expect(callback).toHaveBeenCalledWith((mockWithProduct as any).product);
  });
});