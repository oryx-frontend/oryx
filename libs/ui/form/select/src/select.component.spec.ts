import { fixture, html } from '@open-wc/testing-helpers';
import { useComponent } from '@spryker-oryx/core/utilities';
import '@spryker-oryx/testing';
import { a11yConfig } from '@spryker-oryx/typescript-utils';
import {
  ClearIconAppearance,
  ClearIconPosition,
  SearchIconPosition,
} from '../../../search/searchbox';
import { getControl } from '../../utilities/getControl';
import { selectComponent } from './component';
import { SelectComponent } from './select.component';

describe('SelectComponent', () => {
  let element: SelectComponent;

  beforeAll(async () => {
    await useComponent(selectComponent);
  });

  describe('when the value is set', () => {
    const callback = vi.fn();

    beforeEach(async () => {
      element = await fixture(
        html`<oryx-select>
          <select @change=${callback}>
            <option value="foo"></option>
            <option value="bar"></option>
          </select>
        </oryx-select>`
      );
      element.setValue('bar');
    });
    it('should set the value of the underlying select', () => {
      const select = element.querySelector('select');
      expect(select?.value).toBe('bar');
    });
    it('should dispatch a change event', () => {
      expect(callback).toHaveBeenCalled();
    });
  });

  describe('options', () => {
    const expectOptions = (
      suffixIcon: string,
      searchIconPosition: SearchIconPosition,
      clearIconPosition: ClearIconPosition,
      clearIconAppearance: ClearIconAppearance
    ): void => {
      it('should have default suffixIcon', () => {
        expect(element.suffixIcon).toBe(suffixIcon);
      });

      it('should have default searchIconPosition', () => {
        expect(element.searchIconPosition).toBe(searchIconPosition);
      });

      it('should have default clearIconPosition', () => {
        expect(element.clearIconPosition).toBe(clearIconPosition);
      });

      it('should have default clearIconAppearance', () => {
        expect(element.clearIconAppearance).toBe(clearIconAppearance);
      });
    };

    describe('when created without control', () => {
      beforeEach(async () => {
        element = await fixture(
          html`<oryx-select label="some label"></oryx-select>`
        );
      });

      it('passes the a11y audit', async () => {
        await expect(element).shadowDom.to.be.accessible(a11yConfig);
      });

      expectOptions(
        'dropdown',
        SearchIconPosition.NONE,
        ClearIconPosition.SUFFIX,
        ClearIconAppearance.HOVER
      );
    });

    describe('when created with an <input /> control', () => {
      beforeEach(async () => {
        element = await fixture(
          html`<oryx-select label="some label"><input /></oryx-select>`
        );
      });

      it('passes the a11y audit', async () => {
        await expect(element).shadowDom.to.be.accessible(a11yConfig);
      });

      expectOptions(
        'dropdown',
        SearchIconPosition.NONE,
        ClearIconPosition.SUFFIX,
        ClearIconAppearance.HOVER
      );
    });

    describe('when created with an <input /> control with empty values allowed', () => {
      beforeEach(async () => {
        element = await fixture(
          html`<oryx-select ?allowEmptyValue=${true} label="some label">
            <input />
          </oryx-select>`
        );
      });

      it('passes the a11y audit', async () => {
        await expect(element).shadowDom.to.be.accessible(a11yConfig);
      });

      expectOptions(
        'dropdown',
        SearchIconPosition.NONE,
        ClearIconPosition.SUFFIX,
        ClearIconAppearance.HOVER
      );
    });

    describe('when created with an <input /> control with empty values not allowed', () => {
      beforeEach(async () => {
        element = await fixture(
          html`<oryx-select label="some label">
            <input />
          </oryx-select>`
        );
      });

      it('passes the a11y audit', async () => {
        await expect(element).shadowDom.to.be.accessible(a11yConfig);
      });

      expectOptions(
        'dropdown',
        SearchIconPosition.NONE,
        ClearIconPosition.SUFFIX,
        ClearIconAppearance.HOVER
      );
    });

    describe('when created with a <select> control', () => {
      beforeEach(async () => {
        element = await fixture(
          html`<oryx-select label="some label"><select></select></oryx-select>`
        );
      });

      it('passes the a11y audit', async () => {
        await expect(element).shadowDom.to.be.accessible(a11yConfig);
      });

      expectOptions(
        'dropdown',
        SearchIconPosition.NONE,
        ClearIconPosition.NONE,
        ClearIconAppearance.HOVER
      );
    });
  });

  describe('focus', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<oryx-select><input value="foo" /></oryx-select>`
      );
    });

    describe('when the focusin event is dispatched', () => {
      beforeEach(() => {
        getControl(element).dispatchEvent(
          new Event('focusin', { bubbles: true })
        );
      });
      it('should not show the options', () => {
        expect(
          element.renderRoot.querySelector('oryx-popover')?.hasAttribute('show')
        ).toBe(false);
      });
    });
  });
});
