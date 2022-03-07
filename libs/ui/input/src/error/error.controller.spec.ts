import { expect, fixture, html } from '@open-wc/testing';
import { LitElement, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { ErrorMessageComponent } from '../../../error-message/index';
import { OryxElement } from '../../../utilities';
import { ErrorController } from './error.controller';
import { ErrorOptions } from './error.model';

export class ErrorMixinComponent
  extends LitElement
  implements OryxElement<ErrorOptions>
{
  @property({ type: Object }) options: ErrorOptions = {};
  protected errorController = new ErrorController(this);
  render(): TemplateResult {
    return this.errorController.render();
  }
}
customElements.define('fake-el', ErrorMixinComponent);

describe('ErrorMixin', () => {
  let element: ErrorMixinComponent;
  describe('error', () => {
    describe('when an error message is provided', () => {
      beforeEach(async () => {
        element = await fixture(
          html`<fake-el
            .options=${{ errorMessage: 'error message' }}
          ></fake-el>`
        );
      });

      it('should pass the message to the errorMessage component', () => {
        const errorMessage = element?.renderRoot.querySelector(
          'oryx-error-message'
        ) as ErrorMessageComponent;
        expect(errorMessage?.message).to.equal('error message');
      });

      it('should have a has-error class', () => {
        expect(element.classList.contains('has-error')).to.true;
      });
    });
  });

  describe('when no error message is provided', () => {
    beforeEach(async () => {
      element = await fixture(html`<fake-el></fake-el>`);
    });

    it('should not have an errorMessage element', () => {
      const errorMessage = element.shadowRoot?.querySelector(
        'oryx-error-message'
      ) as ErrorMessageComponent;
      expect(errorMessage).not.to.exist;
    });

    it('should not have a has-error class', () => {
      expect(element.classList.contains('has-error')).to.be.false;
    });
  });

  describe('when no error message is provided', () => {
    beforeEach(async () => {
      element = await fixture(html`<fake-el .showError=${true}></fake-el>`);
    });

    it('should not have an errorMessage element', () => {
      const errorMessage = element?.shadowRoot?.querySelector(
        'oryx-error-message'
      ) as ErrorMessageComponent;
      expect(errorMessage).to.not.exist;
    });

    it('should not have a has-error class', () => {
      expect(element.classList.contains('has-error')).to.be.false;
    });
  });

  describe('when error content is slotted in', () => {
    beforeEach(async () => {
      element = await fixture(html`<fake-el>
        <div slot="error">error</div>
      </fake-el>`);
    });

    it('should have an has-error class', () => {
      expect(element.classList.contains('has-error')).to.be.true;
    });
  });
});