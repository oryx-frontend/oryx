import { html, TemplateResult } from 'lit';
import { when } from 'lit/directives/when.js';

export const getModal = (isOpen: boolean): TemplateResult => {
  return html`
    <oryx-modal ?open=${isOpen} header="Title">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua
      </p>
    </oryx-modal>
  `;
};

export const getModalWithNestedModal = (
  isNestedModalOpen: boolean
): TemplateResult => {
  return html`
    <oryx-modal open header="First modal">
      <div>
        <p>
          First modal content First modal content First modal content First
          modal content First modal content First modal content
        </p>
        ${when(
          !isNestedModalOpen,
          () => html`<button id="openNestedModalBtn">Open nested modal</button>`
        )}

        <oryx-modal ?open=${isNestedModalOpen} header="Nested modal">
          <p>Nested modal content</p>
        </oryx-modal>
      </div>
    </oryx-modal>
  `;
};
