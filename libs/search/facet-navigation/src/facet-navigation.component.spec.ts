import { fixture } from '@open-wc/testing-helpers';
import { useComponent } from '@spryker-oryx/core/utilities';
import { NavigationExtras, RouterService } from '@spryker-oryx/experience';
import { createInjector, destroyInjector } from '@spryker-oryx/injector';
import { html } from 'lit';
import { of } from 'rxjs';
import { beforeEach } from 'vitest';
import { FacetListService } from '../../src/services/facet-list.service';
import { SearchFacetNavigationComponent } from './facet-navigation.component';
import { facetsComponent } from './facet-navigation.def';

const mockFacetList = [
  {
    name: 'Categories',
    parameter: 'category',
    values: [
      {
        value: 2,
        selected: false,
        count: 28,
        name: 'Cameras & Camcorders',
        children: [
          {
            value: 4,
            selected: false,
            count: 27,
            name: 'Digital Cameras',
            children: [],
          },
          {
            value: 3,
            selected: false,
            count: 1,
            name: 'Camcorders',
            children: [],
          },
        ],
      },
    ],
  },
  {
    name: 'Color',
    parameter: 'color',
    count: null,
    values: [
      {
        value: 'Black',
        selected: false,
        count: 11,
      },
      {
        value: 'Silver',
        selected: false,
        count: 7,
      },
      {
        value: 'Red',
        selected: false,
        count: 6,
      },
      {
        value: 'Blue',
        selected: false,
        count: 2,
      },
      {
        value: 'Brown',
        selected: false,
        count: 1,
      },
      {
        value: 'Purple',
        selected: false,
        count: 1,
      },
      {
        value: 'White',
        selected: false,
        count: 1,
      },
    ],
  },
  {
    name: 'Mock',
    parameter: 'mock',
    count: null,
    values: [
      {
        value: 'Black',
        selected: false,
        count: 11,
      },
    ],
  },
  {
    name: 'Mock1',
    parameter: 'mock1',
    count: null,
    values: [
      {
        value: 'Black',
        selected: false,
        count: 11,
      },
    ],
  },
  {
    name: 'Mock2',
    parameter: 'mock2',
    count: null,
    values: [
      {
        value: 'Black',
        selected: false,
        count: 11,
      },
    ],
  },
  {
    name: 'Mock3',
    parameter: 'mock3',
    count: null,
    values: [
      {
        value: 'Black',
        selected: false,
        count: 11,
      },
    ],
  },
];

class MockFacetListService implements Partial<FacetListService> {
  get = vi.fn().mockReturnValue(of(mockFacetList));
}

class MockRouterService implements Partial<RouterService> {
  currentQuery = vi.fn().mockReturnValue(of({}));
  currentRoute = vi.fn().mockReturnValue(of({}));
  activatedRouter = vi.fn().mockReturnValue(of({}));

  getUrl(route: string, extras?: NavigationExtras): string {
    const queryParams = this.createUrlParams(extras?.queryParams);
    return `${route}${queryParams ? `?${queryParams}` : ''}`;
  }

  createUrlParams(params?: {
    [x: string]: string | undefined;
  }): URLSearchParams | undefined {
    if (!params) {
      return;
    }

    const encodedParams = Object.fromEntries(
      Object.entries(params).map(([k, v]) => [k, encodeURIComponent(v ?? '')])
    );

    return new URLSearchParams(encodedParams);
  }
}

describe('SearchFacetNavigationComponent', () => {
  let element: SearchFacetNavigationComponent;

  beforeAll(async () => {
    await useComponent(facetsComponent);
  });

  beforeEach(async () => {
    const testInjector = createInjector({
      providers: [
        {
          provide: FacetListService,
          useClass: MockFacetListService,
        },
        {
          provide: RouterService,
          useClass: MockRouterService,
        },
      ],
    });

    element = await fixture(
      html`<search-facet-navigation></search-facet-navigation>`
    );
  });

  afterEach(() => {
    destroyInjector();
  });

  it('is defined', () => {
    expect(element).toBeInstanceOf(SearchFacetNavigationComponent);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  it('should render collapsible element for every mock facet', () => {
    expect(element.renderRoot.querySelectorAll('oryx-collapsible').length).toBe(
      6
    );
  });

  describe('when "valueRenderLimit" is provided', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<search-facet-navigation
          .options=${{ valueRenderLimit: 3 }}
        ></search-facet-navigation>`
      );
    });

    it('should render the specified amount in the option', () => {
      expect(
        element.renderRoot
          .querySelectorAll('oryx-collapsible')[1]
          .getElementsByTagName('li').length
      ).toBe(3);
    });
  });

  describe('when "expandedItemsCount" is provided', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<search-facet-navigation
          .options=${{ expandedItemsCount: 1 }}
        ></search-facet-navigation>`
      );
    });

    it('should expand collapsible items with specified amount in the option', () => {
      expect(
        element.renderRoot
          .querySelectorAll('oryx-collapsible')[0]
          .hasAttribute('open')
      ).toBeTruthy();
      expect(
        element.renderRoot
          .querySelectorAll('oryx-collapsible')[1]
          .hasAttribute('open')
      ).toBeFalsy();
    });
  });

  describe('when "expandedItemsCount" is provided as 0', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<search-facet-navigation
          .options=${{ expandedItemsCount: 0 }}
        ></search-facet-navigation>`
      );
    });

    it('all collapsible should be closed', () => {
      element.renderRoot.querySelectorAll('oryx-collapsible').forEach((c) => {
        expect(c.getAttribute('open')).toBeNull();
      });
    });
  });

  describe('when "valueRenderLimit" is not provided', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<search-facet-navigation .options=${{}}></search-facet-navigation>`
      );
    });

    it('should render the default amount in the option', () => {
      expect(
        element.renderRoot
          .querySelectorAll('oryx-collapsible')[1]
          .getElementsByTagName('li').length
      ).toBe(5);
    });
  });

  describe('when "expandedItemsCount" is not provided', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<search-facet-navigation .options=${{}}></search-facet-navigation>`
      );
    });

    it('should expand default amount of items', () => {
      element.renderRoot
        .querySelectorAll('oryx-collapsible')
        .forEach((c, index) => {
          if (index < 5) {
            expect(c.hasAttribute('open')).toBeTruthy();
          } else {
            expect(c.hasAttribute('open')).toBeFalsy();
          }
        });
    });
  });
});
