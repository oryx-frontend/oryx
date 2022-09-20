import { fixture } from '@open-wc/testing-helpers';
import { CartService } from '@spryker-oryx/cart';
import { useComponent } from '@spryker-oryx/core/utilities';
import { createInjector, destroyInjector } from '@spryker-oryx/injector';
import '@spryker-oryx/testing';
import { html } from 'lit';
import { of } from 'rxjs';
import { cartEntriesComponent } from './component';
import { CartEntriesComponent } from './entries.component';

class MockCartService {
  getEntries = vi.fn().mockReturnValue(of(null));
  updateEntry = vi.fn().mockReturnValue(of(null));
  deleteEntry = vi.fn().mockReturnValue(of(null));
}

describe('CartEntriesComponent', () => {
  let element: CartEntriesComponent;
  let service: MockCartService;

  const entry = { groupKey: '1', sku: '1', quantity: 1 };

  beforeAll(async () => {
    await useComponent(cartEntriesComponent);
  });

  beforeEach(async () => {
    const testInjector = createInjector({
      providers: [
        {
          provide: CartService,
          useClass: MockCartService,
        },
      ],
    });
    element = await fixture(html`<cart-entries></cart-entries>`);

    service = testInjector.inject(CartService) as unknown as MockCartService;
  });

  afterEach(() => {
    destroyInjector();
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  describe('Empty cart state', () => {
    beforeEach(async () => {
      service.getEntries = vi.fn().mockReturnValue(of([]));
      element = await fixture(html`<cart-entries></cart-entries>`);
    });

    it('should render the section', () => {
      expect(element).toContainElement('section');
    });
  });

  describe('with entries', () => {
    let entryElement: HTMLElement | null;

    beforeEach(async () => {
      service.getEntries = vi.fn().mockReturnValue(of([entry]));
      element = await fixture(html`<cart-entries></cart-entries>`);
      entryElement = element.renderRoot.querySelector('cart-entry');
    });

    it('should render the entry', () => {
      expect(element).toContainElement('cart-entry');
    });

    it('should emit update when quantity is changed', () => {
      const quantity = 2;
      entryElement?.dispatchEvent(
        new CustomEvent('oryx.quantity', { detail: { quantity } })
      );

      expect(service.updateEntry).toHaveBeenCalledWith({ ...entry, quantity });
    });

    it('should emit remove when remove event is dispatched', () => {
      entryElement?.dispatchEvent(new CustomEvent('oryx.remove'));

      expect(service.deleteEntry).toHaveBeenCalledWith({
        groupKey: entry.groupKey,
      });
    });
  });
});