import '@/tools/testing';
import { fixture, html } from '@open-wc/testing-helpers';
import { i18n, useComponent } from '@oryx-frontend/utilities';
import { ButtonComponent, ButtonType } from '../../action/button';
import { CollapsibleTextComponent } from './collapsible-text.component';
import { collapsibleTextComponent } from './collapsible-text.def';
import { CollapsibleTextToggle } from './collapsible-text.model';

describe('CollapsibleTextComponent', () => {
  let element: CollapsibleTextComponent;

  beforeAll(async () => {
    await useComponent(collapsibleTextComponent);
  });

  describe('when the component is created', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<oryx-collapsible-text></oryx-collapsible-text>`
      );
    });

    it('should defined', () => {
      expect(element).toBeInstanceOf(CollapsibleTextComponent);
    });

    it('should pass the a11y audit', async () => {
      await expect(element).shadowDom.to.be.accessible();
    });
  });

  describe('CollapsibleTextToggle property', () => {
    describe('when toggle property not provided', () => {
      beforeEach(async () => {
        element = await fixture(
          html`<oryx-collapsible-text></oryx-collapsible-text>`
        );
      });

      it('should not have a toggle button', () => {
        expect(element).not.toContainElement('button');
      });
    });

    describe('when toggle property = none', () => {
      beforeEach(async () => {
        element = await fixture(
          html`<oryx-collapsible-text
            .toggle=${CollapsibleTextToggle.None}
          ></oryx-collapsible-text>`
        );
      });

      it('should not have a toggle button', () => {
        expect(element).not.toContainElement('button');
      });
    });

    describe('when enableToggle property = icon', () => {
      beforeEach(async () => {
        element = await fixture(
          html`<oryx-collapsible-text
            .toggle=${CollapsibleTextToggle.Icon}
          ></oryx-collapsible-text>`
        );
      });

      it('should have a toggle button', () => {
        expect(element).toContainElement('oryx-button');
      });

      it('should have Read more text', () => {
        const button = element.renderRoot.querySelector('oryx-button');
        expect(button).toHaveProperty('label', 'Read more');
      });

      describe('and when the button is clicked', () => {
        beforeEach(() => {
          element.renderRoot.querySelector<HTMLElement>('oryx-button')?.click();
        });

        it('should have Read less text', () => {
          const button = element.renderRoot.querySelector('oryx-button');
          expect(button).toHaveProperty('label', 'Read less');
        });
      });
    });

    describe('when enableToggle property = text', () => {
      beforeEach(async () => {
        element = await fixture(
          html`<oryx-collapsible-text
            .toggle=${CollapsibleTextToggle.Text}
          ></oryx-collapsible-text>`
        );
      });

      it('should have a text button', () => {
        const button =
          element.renderRoot.querySelector<ButtonComponent>('oryx-button');
        expect(button?.type).toBe(ButtonType.Text);
      });

      it('should have Read more text', () => {
        expect(
          element.renderRoot.querySelector('oryx-button')?.textContent?.trim()
        ).toBe(i18n('read-more'));
      });

      describe('and when the button is clicked', () => {
        beforeEach(() => {
          element.renderRoot.querySelector<HTMLElement>('oryx-button')?.click();
        });

        it('should have Read less text', () => {
          expect(
            element.renderRoot.querySelector('oryx-button')?.textContent?.trim()
          ).toBe(i18n('read-less'));
        });
      });
    });
  });

  describe('lineClamp property', () => {
    describe('when the clamp property is 3', () => {
      beforeEach(async () => {
        element = await fixture(
          html`<oryx-collapsible-text .lineClamp=${3}></oryx-collapsible-text>`
        );
      });

      it('should have a --line-clamp property', () => {
        const slot = element.renderRoot.querySelector('slot') as HTMLElement;
        expect(slot.style.getPropertyValue('--line-clamp')).toBe('3');
      });
    });
  });
});
