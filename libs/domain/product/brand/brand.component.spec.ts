import { fixture } from '@open-wc/testing-helpers';
import { ContextService, DefaultContextService } from '@oryx-frontend/core';
import { createInjector, destroyInjector } from '@oryx-frontend/di';
import { imageComponent } from '@oryx-frontend/ui';
import { ImageComponent } from '@oryx-frontend/ui/image';
import { useComponent } from '@oryx-frontend/utilities';
import { html } from 'lit';
import { of } from 'rxjs';
import { ProductService } from '../src/services';
import { ProductBrandComponent } from './brand.component';
import { productBrandComponent } from './brand.def';

class MockProductService implements Partial<ProductService> {
  get = vi.fn();
}

describe('ProductBrandComponent', () => {
  let element: ProductBrandComponent;
  let productService: MockProductService;

  beforeAll(async () => {
    await useComponent([productBrandComponent, imageComponent]);
  });

  beforeEach(async () => {
    const injector = createInjector({
      providers: [
        {
          provide: ProductService,
          useClass: MockProductService,
        },
        {
          provide: ContextService,
          useClass: DefaultContextService,
        },
      ],
    });

    element = await fixture(html`
      <oryx-product-brand sku="1"></oryx-product-brand>
    `);
    productService = injector.inject<MockProductService>(ProductService);
  });

  afterEach(() => {
    destroyInjector();
  });

  it('should be defined', () => {
    expect(element).toBeInstanceOf(ProductBrandComponent);
  });

  describe('when brand attribute available in product', () => {
    beforeEach(async () => {
      productService.get.mockReturnValue(
        of({
          sku: '1',
          attributes: { brand: 'Brand1' },
          attributeNames: { brand: 'Brand' },
        })
      );

      element = await fixture(html`
        <oryx-product-brand sku="1"></oryx-product-brand>
      `);
    });

    it('should render the brand image', () => {
      const image = element.shadowRoot?.querySelector(
        'oryx-image'
      ) as ImageComponent;
      expect(image.resource).toBe('Brand1');
    });
  });

  describe('when no attributes available in product', () => {
    beforeEach(async () => {
      productService.get.mockReturnValue(of({ sku: '1' }));
      element = await fixture(html`
        <oryx-product-brand sku="1"></oryx-product-brand>
      `);
    });

    it('should not render the brand image', () => {
      expect(element).not.toContainElement('oryx-image');
    });
  });
});
