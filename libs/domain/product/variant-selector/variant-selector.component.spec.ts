import { fixture } from '@open-wc/testing-helpers';
import { createInjector, destroyInjector } from '@oryx-frontend/di';
import { mockProductProviders, MockProductService } from '@oryx-frontend/product/mocks';
import { useComponent } from '@oryx-frontend/utilities';
import { html } from 'lit';
import { ProductVariantSelectorComponent } from './variant-selector.component';
import { productVariantSelectorComponent } from './variant-selector.def';
import { ProductService } from '@oryx-frontend/product';
import { ContextService, DefaultContextService } from '@oryx-frontend/core';
import { beforeEach } from 'vitest';

describe('ProductVariantSelectorComponent', () => {
  let element: ProductVariantSelectorComponent;
  let productService: MockProductService;

  beforeAll(async () => {
    await useComponent(productVariantSelectorComponent);
  });

  beforeEach(async () => {
    const injector = createInjector({
      providers: [
        {
          provide: ProductService,
          useClass: MockProductService
        },
        {
          provide: ContextService,
          useClass: DefaultContextService,
        },
      ],
    });

    productService = injector.inject<MockProductService>(ProductService);


  });

  afterEach(() => {
    destroyInjector();
  });

  describe('when the component is created', () => {
    beforeEach(async () => {
      element = await fixture(
        html`
          <oryx-product-variant-selector sku="variant-selector"></oryx-product-variant-selector>`
      );
    });

    it('should be defined', () => {
      expect(element).toBeInstanceOf(ProductVariantSelectorComponent);
    });

    it('passes the a11y audit', async () => {
      expect(element).shadowDom.to.be.accessible();
    });

    it('should render a toggle variants', () => {
      expect(element).toContainElement('oryx-toggle-icon');
    });
  });
});
