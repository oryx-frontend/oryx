import { ContextService, DefaultContextService } from '@oryx-frontend/core';
import { createInjector, destroyInjector } from '@oryx-frontend/di';
import { useComponent } from '@oryx-frontend/utilities';
import { of } from 'rxjs';
import { ProductCategoryService } from '../../src/services';

import { fixture } from '@open-wc/testing-helpers';
import { LayoutBuilder, LayoutService } from '@oryx-frontend/experience';
import { html } from 'lit';
import { mockProductProviders } from '../../src/mocks/src';
import { ProductCategoryListComponent } from './list.component';
import { productCategoryListComponent } from './list.def';

class MockProductCategoryService implements Partial<ProductCategoryService> {
  getList = vi
    .fn()
    .mockReturnValue(of([{ id: '1' }, { id: '3' }, { id: '5' }]));
}

class MockLayoutService implements Partial<LayoutService> {
  getStyles = vi.fn().mockReturnValue(of(null));
}

class MockLayoutBuilder implements Partial<LayoutBuilder> {
  createStylesFromOptions = vi.fn();
  getActiveLayoutRules = vi.fn().mockReturnValue(of());
}

describe('ProductCategoryListComponent', () => {
  let element: ProductCategoryListComponent;

  beforeAll(async () => {
    await useComponent(productCategoryListComponent);
  });

  beforeEach(async () => {
    createInjector({
      providers: [
        ...mockProductProviders,
        {
          provide: LayoutService,
          useClass: MockLayoutService,
        },
        {
          provide: LayoutBuilder,
          useClass: MockLayoutBuilder,
        },
        {
          provide: ProductCategoryService,
          useClass: MockProductCategoryService,
        },
        {
          provide: ContextService,
          useClass: DefaultContextService,
        },
      ],
    });
  });

  afterEach(() => {
    destroyInjector();
  });

  const createElement = async (exclude?: string | string[]) => {
    element = await fixture(
      html`<oryx-product-category-list
        .options=${{ exclude }}
      ></oryx-product-category-list>`
    );
  };

  describe('when a list of categories is provided ', () => {
    beforeEach(async () => await createElement());

    it('passes the a11y audit', async () => {
      await expect(element).shadowDom.to.be.accessible();
    });

    it('should render a oryx-content-link for each category', () => {
      expect(element).toContainElement('oryx-content-link:nth-child(3)');
    });
  });
});
