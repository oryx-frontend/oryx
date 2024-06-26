import { isFirefox } from '@oryx-frontend/ui';
import { ButtonColor, ButtonSize, ButtonType } from '@oryx-frontend/ui/button';
import { HeadingTag } from '@oryx-frontend/ui/heading';
import { IconTypes } from '@oryx-frontend/ui/icon';
import { I18nMixin, featureVersion } from '@oryx-frontend/utilities';
import { LitElement, PropertyValues, TemplateResult, html } from 'lit';
import { property } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import {
  BACK_EVENT,
  BACK_MODAL_EVENT,
  CLOSED_MODAL_EVENT,
  CLOSE_EVENT,
  CLOSE_MODAL_EVENT,
  ModalProperties,
} from './modal.model';
import { styles } from './modal.styles';

export class ModalComponent
  extends I18nMixin(LitElement)
  implements ModalProperties
{
  static styles = [styles];

  protected backdropTargetTag = 'dialog';
  protected initialBodyOverflow?: string;

  @property({ type: Boolean, attribute: 'open' }) isOpen?: boolean;
  @property({ type: Boolean, reflect: true }) minimal?: boolean;
  @property({ type: Boolean }) footerButtonFullWidth?: boolean;
  @property() heading?: string;
  @property({ type: Boolean }) preventCloseByEscape?: boolean;
  @property({ type: Boolean }) preventCloseByBackdrop?: boolean;
  @property({ type: Boolean }) enableCloseButtonInHeader?: boolean;
  @property({ type: Boolean }) enableFooter?: boolean;
  @property({ type: Boolean }) enableNavigateBack?: boolean;

  requestUpdate(name?: PropertyKey, oldValue?: unknown): void {
    if (name === 'isOpen' && this.isOpen !== oldValue) {
      this.setDialogState();
    }

    super.requestUpdate(name, oldValue);
  }

  protected firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);

    this.setDialogState();
  }

  connectedCallback(): void {
    if (featureVersion >= '1.4') {
      this.addEventListener(CLOSE_MODAL_EVENT, this.close);
    }

    super.connectedCallback();
  }

  disconnectedCallback(): void {
    if (this.isOpen) {
      this.toggleScrollLock();
    }

    if (featureVersion >= '1.4') {
      this.removeEventListener(CLOSE_MODAL_EVENT, this.close);
    }

    super.disconnectedCallback();
  }

  protected setDialogState(): void {
    if (this.isOpen) {
      this.dialog?.showModal();
    } else {
      this.dialog?.close();
    }

    this.toggleScrollLock(this.isOpen);
  }

  protected toggleScrollLock(lock = false): void {
    if (lock) {
      this.initialBodyOverflow = document.body.style.overflow;
      document.body.style.overflow = 'clip';
      return;
    }

    // Need to restore initial value of body overflow property
    // in case if it predefined as style property
    // Also firefox has a bug with overflow: clip. It required default value
    // to make it work correctly. "auto" is using as default
    document.body.style.overflow =
      this.initialBodyOverflow || isFirefox() ? 'auto' : '';
  }

  close(): void {
    const event = featureVersion >= '1.4' ? CLOSED_MODAL_EVENT : CLOSE_EVENT;
    this.dispatchEvent(
      new CustomEvent(event, { bubbles: true, composed: true })
    );
    this.removeAttribute('open');
  }

  open(): void {
    this.toggleAttribute('open');
  }

  protected onBackdropClick(e: MouseEvent): void {
    e.stopImmediatePropagation();
    e.stopPropagation();
    if (this.preventCloseByBackdrop) return;

    const target = e.composedPath()[0] as HTMLElement;
    if (target.tagName.toLowerCase() === this.backdropTargetTag) {
      if (this.enableNavigateBack) {
        this.onGoBack();
      } else {
        this.close();
      }
    }
  }

  protected onCancel(e: Event): void {
    e.preventDefault();

    if (this.enableNavigateBack) {
      this.onGoBack();
      return;
    }
    if (!this.preventCloseByEscape) {
      this.close();
    }
  }

  protected onGoBack(): void {
    const event = featureVersion >= '1.4' ? BACK_MODAL_EVENT : BACK_EVENT;
    this.dispatchEvent(
      new CustomEvent(event, { bubbles: true, composed: true })
    );
  }

  protected get dialog(): HTMLDialogElement | null | undefined {
    return this.shadowRoot?.querySelector('dialog');
  }

  protected override render(): TemplateResult {
    return html`
      <dialog
        @click="${(e: MouseEvent): void => this.onBackdropClick(e)}"
        @cancel=${(e: Event): void => this.onCancel(e)}
        @close=${this.close}
      >
        <form method="dialog" @submit=${this.onSubmit}>
          ${this.renderBody()}
        </form>
      </dialog>
    `;
  }

  protected onSubmit(e: Event): void {
    if (this.enableNavigateBack) {
      this.onGoBack();
      e.preventDefault();
    }
  }

  protected renderHeading(): TemplateResult {
    return html`
      <header slot="heading">
        ${when(
          this.enableNavigateBack,
          () => html`
            <slot name="navigate-back" @click=${this.onGoBack}>
              <oryx-button
                .type=${ButtonType.Icon}
                .size=${ButtonSize.Md}
                .color=${ButtonColor.Neutral}
                .icon=${IconTypes.ArrowBackward}
                .label=${this.i18n('modal.back')}
              ></oryx-button>
            </slot>
          `
        )}
        <slot name="heading">${this.__renderHeading()}</slot>

        ${when(
          this.enableCloseButtonInHeader,
          () => html`
            <oryx-button
              .type=${ButtonType.Icon}
              .size=${ButtonSize.Md}
              .color=${ButtonColor.Neutral}
            >
              <button
                slot="custom"
                value="cancel"
                aria-label=${this.i18n('modal.close')}
              >
                <oryx-icon .type=${IconTypes.Close}></oryx-icon>
              </button>
            </oryx-button>
          `
        )}
      </header>
    `;
  }

  // temporary implementation for backwards compatibility
  private __renderHeading(): TemplateResult {
    if (featureVersion >= '1.4') {
      return html`<oryx-heading .tag=${HeadingTag.H5}
        >${this.heading}</oryx-heading
      >`;
    } else {
      return html`<oryx-heading><h5>${this.heading}</h5></oryx-heading>`;
    }
  }

  protected renderBody(): TemplateResult {
    return html`
      <oryx-card>
        ${this.renderHeading()}

        <slot></slot>

        ${when(
          this.enableFooter,
          () => html`
            <footer slot="footer">
              <slot name="footer">
                <oryx-button
                  .type=${ButtonType.Outline}
                  .color=${ButtonColor.Neutral}
                  .size=${ButtonSize.Md}
                >
                  <button slot="custom" value="cancel">
                    ${this.i18n(
                      this.enableNavigateBack ? 'modal.back' : 'modal.cancel'
                    )}
                  </button>
                </oryx-button>
                <slot name="footer-more"></slot>
              </slot>
            </footer>
          `
        )}
      </oryx-card>
    `;
  }
}
