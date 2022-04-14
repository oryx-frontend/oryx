import { html, LitElement, PropertyValues, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { DialogElement, ModalProperties } from './modal.model';
import { styles } from './modal.styles';

export class ModalComponent extends LitElement implements ModalProperties {
  backdropTargetTag = 'dialog';
  static styles = styles;

  @property({ type: Boolean, attribute: 'open' }) isOpen?: boolean;
  @property() header?: string;
  @property({ type: Boolean }) disableCloseOnEscape?: boolean;
  @property({ type: Boolean }) disableCloseOnBackdrop?: boolean;

  requestUpdate(name: PropertyKey, oldValue?: unknown): void {
    if (name === 'isOpen' && this.isOpen !== oldValue) {
      this.setDialogState();
    }

    super.requestUpdate(name, oldValue);
  }

  protected firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);

    this.setDialogState();
  }

  protected setDialogState(): void {
    if (this.isOpen) {
      this.dialog?.showModal();
    } else {
      this.dialog?.close();
    }
  }

  close(): void {
    this.removeAttribute('open');
  }

  open(): void {
    this.toggleAttribute('open');
  }

  protected backdropClickHandler(e: MouseEvent): void {
    if (this.disableCloseOnBackdrop) {
      return;
    }
    e.stopPropagation();

    const target = e.composedPath()[0] as HTMLElement;
    if (target.tagName.toLowerCase() === this.backdropTargetTag) {
      this.close();
    }
  }

  protected cancelEventHandler(e: Event): void {
    e.preventDefault();
    e.stopImmediatePropagation();

    if (!this.disableCloseOnEscape) {
      this.close();
    }
  }

  protected get dialog(): DialogElement {
    return this.shadowRoot?.querySelector('dialog') as DialogElement;
  }

  protected override render(): TemplateResult {
    return html`
      <dialog
        @click="${(e: MouseEvent): void => this.backdropClickHandler(e)}"
        @cancel=${(e: Event): void => this.cancelEventHandler(e)}
        @close=${this.close}
      >
        <form method="dialog">
          <oryx-card>
            <slot name="header" slot="header"> ${this.header} </slot>
            <slot></slot>
            <div slot="footer">
              <slot name="footer">
                <oryx-button type="secondary" outline size="small">
                  <button value="cancel">Cancel</button>
                </oryx-button>
              </slot>
            </div>
          </oryx-card>
        </form>
      </dialog>
    `;
  }
}