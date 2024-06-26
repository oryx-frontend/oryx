import { fixture } from '@open-wc/testing-helpers';
import { createInjector, destroyInjector } from '@oryx-frontend/di';
import { I18nService } from '@oryx-frontend/i18n';
import { RouteType, RouterService } from '@oryx-frontend/router';
import { SuggestionRendererService } from '@oryx-frontend/search';
import { LinkService } from '@oryx-frontend/site';
import { typeheadComponent } from '@oryx-frontend/ui';
import { useComponent } from '@oryx-frontend/utilities';
import { html } from 'lit';
import { of } from 'rxjs';
import { SearchBoxComponent } from './box.component';
import { searchBoxComponent } from './box.def';

class MockRouterService implements Partial<RouterService> {
  navigate = vi.fn();
}

class MockLinkService implements Partial<LinkService> {
  get = vi.fn().mockReturnValue(of(''));
}

class MockSuggestionRendererService
  implements Partial<SuggestionRendererService>
{
  render = vi.fn().mockReturnValue(html`Lorem`);
  get = vi.fn().mockReturnValue(of({ data: ['data'] }));
}

class MockI18NService implements Partial<I18nService> {
  translate = vi.fn().mockReturnValue(of('search'));
}

const query = 'pro';

describe('SearchBoxComponent', () => {
  let element: SearchBoxComponent;
  let linkService: MockLinkService;
  let routerService: MockRouterService;
  let suggestionService: MockSuggestionRendererService;

  const update = async (): Promise<void> => {
    element.requestUpdate();
    await element.updateComplete;
  };

  const getInput = (): HTMLInputElement => {
    return element.renderRoot.querySelector('input') as HTMLInputElement;
  };

  const simulateTyping = async (query: string): Promise<void> => {
    const input = getInput();

    input.value = query;
    input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    await update();
  };

  const hasResults = async (expectation = true): Promise<void> => {
    await update();

    const container = element.renderRoot.querySelector('[slot="option"]');

    if (expectation) {
      expect(container).not.toBeNull();
      return;
    }

    expect(container).toBeNull();
  };

  beforeAll(async () => {
    await useComponent([searchBoxComponent, typeheadComponent]);
  });

  beforeEach(async () => {
    const testInjector = createInjector({
      providers: [
        {
          provide: RouterService,
          useClass: MockRouterService,
        },
        {
          provide: LinkService,
          useClass: MockLinkService,
        },
        {
          provide: I18nService,
          useClass: MockI18NService,
        },
        {
          provide: SuggestionRendererService,
          useClass: MockSuggestionRendererService,
        },
      ],
    });
    linkService = testInjector.inject<MockLinkService>(LinkService);
    routerService = testInjector.inject<MockRouterService>(RouterService);
    suggestionService = testInjector.inject<MockSuggestionRendererService>(
      SuggestionRendererService
    );
    element = await fixture(html`<oryx-search-box></oryx-search-box>`);
  });

  afterEach(() => {
    destroyInjector();
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  describe('when query is not provided', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<oryx-search-box query=""></oryx-search-box>`
      );

      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.clearAllTimers();
    });

    it('should not render result`s container', async () => {
      await hasResults(false);
    });
  });

  describe('when query is containing spaces only', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<oryx-search-box query="     "></oryx-search-box>`
      );

      vi.useFakeTimers();

      //debounce the typeahead event dispatching
      vi.advanceTimersByTime(301);
    });

    afterEach(() => {
      vi.clearAllTimers();
    });

    it('should not render result`s container', async () => {
      await hasResults(false);
    });
  });

  describe('when query is to short', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<oryx-search-box query="p"></oryx-search-box>`
      );

      vi.useFakeTimers();

      //debounce the typeahead event dispatching
      vi.advanceTimersByTime(301);
    });

    afterEach(() => {
      vi.clearAllTimers();
    });

    it('should not render result`s container', async () => {
      await hasResults(false);
    });
  });

  describe('when query is provided', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<oryx-search-box query="prod"></oryx-search-box>`
      );

      vi.useFakeTimers();

      //debounce the typeahead event dispatching
      vi.advanceTimersByTime(301);
    });

    afterEach(() => {
      vi.clearAllTimers();
    });

    it('should render result`s container with results', async () => {
      await hasResults();
    });
  });

  describe('when not found', () => {
    beforeEach(async () => {
      suggestionService.get.mockReturnValueOnce(of({ data: [] }));

      element = await fixture(
        html`<oryx-search-box query="abracadabra"></oryx-search-box>`
      );

      vi.useFakeTimers();

      //debounce the typeahead event dispatching
      vi.advanceTimersByTime(301);

      await update();
    });

    afterEach(() => {
      vi.clearAllTimers();
    });

    it('should render `not found` container', async () => {
      expect(element.renderRoot.querySelector('[slot="empty"]')).not.toBeNull();
    });
  });

  describe('when typing a query string', () => {
    beforeEach(async () => {
      element = await fixture(html`<oryx-search-box></oryx-search-box>`);

      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.clearAllTimers();
    });

    it('should update the query param', async () => {
      await simulateTyping(query);
      vi.advanceTimersByTime(301);
      expect(element.query).toBe(query);
    });

    it('should receive the results', async () => {
      await hasResults(false);
      await simulateTyping(query);
      vi.advanceTimersByTime(301);
      await hasResults();
    });
  });

  describe('when search is submitted', () => {
    describe('and query is empty string', () => {
      beforeEach(async () => {
        element = await fixture(html`<oryx-search-box></oryx-search-box>`);
        linkService.get.mockReturnValue(of('link'));

        const typeahead = element.renderRoot.querySelector('oryx-typeahead');

        typeahead?.toggleAttribute('open', true);
        typeahead?.dispatchEvent(new CustomEvent('oryx.search'));
      });

      it('should get the link from service without params', () => {
        expect(linkService.get).toHaveBeenCalledWith({
          type: RouteType.ProductList,
        });
      });

      it('should navigate by link', () => {
        expect(routerService.navigate).toHaveBeenCalledWith('link');
      });
    });

    describe('and query is provided', () => {
      const q = 'test';
      beforeEach(async () => {
        element = await fixture(
          html`<oryx-search-box .query=${q}></oryx-search-box>`
        );
        element.renderRoot
          .querySelector('oryx-typeahead')
          ?.dispatchEvent(new CustomEvent('oryx.search'));
      });

      it('should get the link from service with params', () => {
        expect(linkService.get).toHaveBeenCalledWith({
          type: RouteType.ProductList,
          params: { q },
        });
      });
    });
  });
});
