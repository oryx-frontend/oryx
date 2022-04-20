import { fixture, html } from '@open-wc/testing-helpers';
import '@spryker-oryx/testing/a11y';
import { LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { SpyInstanceFn } from 'vitest';
import { a11yConfig } from '../../../a11y';
import '../../../option/';
import { PopoverSelectEvent } from '../../../popover';
import { SearchEvent } from '../../../search';
import { FilterStrategyType, TypeaheadOptions } from '../typeahead.model';
import { TypeaheadController } from './typeahead.controller';

@customElement('fake-typeahead')
class FakeComponent extends LitElement implements TypeaheadOptions {
  @property({ type: Boolean }) filter?: boolean;
  @property() filterStrategy?: FilterStrategyType;
  @property({ type: Boolean }) isLoading?: boolean;
  @property({ type: Boolean }) isEmpty?: boolean;
  @property() emptyMessage?: string;

  protected popoverController = new TypeaheadController(this);

  render(): TemplateResult {
    return html`
      <slot><input value="foo" /></slot>
      <div>inner-value</div>
      <oryx-option value="option-value"></oryx-option>
    `;
  }
}

describe('TypeaheadController', () => {
  let element: FakeComponent;

  beforeEach(async () => {
    element = await fixture(html`<fake-typeahead></fake-typeahead>`);
  });

  describe('slot', () => {
    describe('when oryx-option elements without a slot are provided', () => {
      beforeEach(async () => {
        element = await fixture(
          html`<fake-typeahead>
            <input value="foo" aria-label="make a11y happy" />
            <oryx-option>first</oryx-option>
            <oryx-option>second</oryx-option>
            <oryx-option>third</oryx-option>
          </fake-typeahead>`
        );
      });

      it('passes the a11y audit', async () => {
        await expect(element).shadowDom.to.be.accessible(a11yConfig);
      });

      it('should add the option slot to it', () => {
        expect(
          element.querySelectorAll('oryx-option[slot=option]').length
        ).toEqual(3);
      });
    });

    describe('when oryx-option elements with a slot are provided', () => {
      beforeEach(async () => {
        element = await fixture(
          html`<fake-typeahead>
            <input value="foo" aria-label="make a11y happy" />
            <oryx-option slot="other">first</oryx-option>
            <oryx-option slot="other">second</oryx-option>
            <oryx-option slot="other">third</oryx-option>
          </fake-typeahead>`
        );
      });

      it('passes the a11y audit', async () => {
        await expect(element).shadowDom.to.be.accessible(a11yConfig);
      });

      it('should add the option slot to it', () => {
        expect(
          element.querySelectorAll('oryx-option[slot=option').length
        ).toEqual(0);
      });
    });
  });

  describe('when an input is dispatched', () => {
    let result: SearchEvent;

    beforeEach(async () => {
      element.addEventListener('oryx.typeahead', ((
        ev: CustomEvent<SearchEvent>
      ) => {
        result = ev.detail;
      }) as EventListener);
      element.dispatchEvent(new Event('input', { bubbles: true }));
    });

    it('should dispatch a "oryx.typeahead" event', () => {
      expect(result.query).toEqual('foo');
    });
  });

  describe('"oryx.select" event', () => {
    let onChange: SpyInstanceFn;
    let onInput: SpyInstanceFn;

    afterEach(() => {
      vi.clearAllMocks();
    });

    const dispatchSelectEvent = (): void => {
      const selected = element.shadowRoot?.querySelector(
        'oryx-option'
      ) as HTMLElement;
      const event = new CustomEvent<PopoverSelectEvent>('oryx.select', {
        detail: { selected },
        bubbles: true,
        composed: true,
      });
      element.dispatchEvent(event);
    };

    const prepareComponent = async (control: TemplateResult): Promise<void> => {
      onChange = vi.fn();
      onInput = vi.fn();

      element = await fixture(
        html`<fake-typeahead @change=${onChange} @input=${onInput}>
          ${control}
        </fake-typeahead>`
      );
    };

    describe('when a select is used', () => {
      describe('and the selected option is reselected', () => {
        beforeEach(async () => {
          prepareComponent(
            html`<select>
              <option value="option-value"></option>
            </select>`
          );
        });
        describe('and the "oryx.select" event is dispatched', () => {
          beforeEach(() => {
            dispatchSelectEvent();
          });
          it('should not dispatch the change event', () => {
            expect(onChange).not.toHaveBeenCalled();
          });
          it('should not dispatch the input event for select element', () => {
            expect(onInput).not.toHaveBeenCalled();
          });
        });
      });

      describe('and a new option is selected', () => {
        beforeEach(async () => {
          await prepareComponent(
            html`<select>
              <option value="new-value"></option>
            </select>`
          );
        });
        describe('and the "oryx.select" event is dispatched', () => {
          beforeEach(() => {
            dispatchSelectEvent();
          });
          it('should dispatch the change event', () => {
            expect(onChange).toHaveBeenCalled();
          });
          it('should not dispatch the input event for select element', () => {
            expect(onInput).not.toHaveBeenCalled();
          });
        });
      });
    });

    describe('when an input is used', () => {
      describe('and there is no initial value for the input', () => {
        beforeEach(async () => {
          await prepareComponent(html`<input />`);
        });
        describe('and the "oryx.select" event is dispatched', () => {
          beforeEach(() => {
            dispatchSelectEvent();
          });
          it('should dispatch the input event', () => {
            expect(onInput).toHaveBeenCalled();
          });
          it('should not dispatch the change event for input element', () => {
            expect(onChange).not.toHaveBeenCalled();
          });
        });
      });

      describe('and the input value is not equal to the selected value', () => {
        beforeEach(async () => {
          await prepareComponent(html`<input value="different" />`);
        });
        describe('and the "oryx.select" event is dispatched', () => {
          beforeEach(() => {
            dispatchSelectEvent();
          });
          it('should dispatch the input event', () => {
            expect(onInput).toHaveBeenCalled();
          });
          it('should not dispatch the change event for input element', () => {
            expect(onChange).not.toHaveBeenCalled();
          });
        });
      });

      describe('and the input value is already the selected value', () => {
        beforeEach(async () => {
          await prepareComponent(html`<input value="option-value" />`);
        });
        describe('and the "oryx.select" event is dispatched', () => {
          beforeEach(() => {
            dispatchSelectEvent();
          });
          it('should not dispatch the input event', () => {
            expect(onInput).not.toHaveBeenCalled();
          });
          it('should not dispatch the change event for input element', () => {
            expect(onChange).not.toHaveBeenCalled();
          });
        });
      });
    });
  });
});
