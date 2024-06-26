import { ButtonSize, ButtonType } from '@oryx-frontend/ui/button';
import { IconTypes } from '@oryx-frontend/ui/icon';
import { I18nMixin, Size, featureVersion } from '@oryx-frontend/utilities';
import { LitElement, TemplateResult, html } from 'lit';
import { property, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { UiStateController } from '../../src/';
import {
  CollapsibleAppearance,
  CollapsibleAttributes,
  ToggleEventDetail,
} from './collapsible.model';
import { collapsibleStyles } from './collapsible.styles';
import { collapsibleBaseStyle } from './styles';

export class CollapsibleComponent
  extends I18nMixin(LitElement)
  implements CollapsibleAttributes
{
  static styles =
    featureVersion >= '1.4' ? collapsibleStyles : [collapsibleBaseStyle];

  protected uiController = new UiStateController(this);

  @property({ reflect: true }) appearance = CollapsibleAppearance.Block;
  @property({ type: Boolean, reflect: true }) open?: boolean;
  @property() heading?: string;
  @property() persistedStateKey?: string;
  @property({ type: Boolean }) nonTabbable?: boolean;

  @query('details') protected details?: HTMLDetailsElement;

  protected firstUpdated(): void {
    this.syncState();
  }

  /**
   * Indicates that the collapsible was opened by a user. We need this info since
   * we need to scroll the collapsible into the view port whenever it is opened by
   * the user. We do not like to do this when it's (initially) rendered `open`.
   */
  protected isManuallyOpened = false;

  protected override render(): TemplateResult {
    const nonTabbable =
      this.nonTabbable || this.appearance === CollapsibleAppearance.Inline;

    return html`
      <details
        ?open=${this.open}
        @click=${this.onClick}
        @toggle=${this.onToggle}
      >
        <summary
          part=${ifDefined(featureVersion >= '1.4' ? undefined : 'heading')}
          tabindex=${ifDefined(nonTabbable ? -1 : undefined)}
        >
          <slot name="heading"> ${this.heading} </slot>
          ${this.renderToggleControl()}
          <slot name="aside"></slot>
        </summary>
        <slot
          name=${ifDefined(featureVersion >= '1.4' ? undefined : 'content')}
        ></slot>
      </details>
    `;
  }

  protected onClick(event: PointerEvent): void {
    this.isManuallyOpened = true;
    this.dispatchEvent(
      new CustomEvent<ToggleEventDetail>('toggle', {
        bubbles: true,
        composed: true,
        detail: { toggleAll: event.altKey },
      })
    );
  }

  protected onToggle(event: Event): void {
    this.open = this.details?.open;
    if (featureVersion >= '1.4') this.syncState(true);
    if (!this.isManuallyOpened) {
      this.dispatchEvent(
        new CustomEvent('toggle', { bubbles: true, composed: true })
      );
    }
    if (featureVersion >= '1.2') {
      if (this.isManuallyOpened && this.open) {
        this.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      this.isManuallyOpened = false;
    }
  }

  protected syncState(store = false): void {
    if (!this.persistedStateKey) return;

    if (store) {
      if (this.isManuallyOpened) {
        this.uiController.set(this.persistedStateKey, this.open);
      }
    } else if (this.uiController.has(this.persistedStateKey)) {
      this.open = this.uiController.get<boolean>(this.persistedStateKey);
    }
  }

  protected renderToggleControl(): TemplateResult {
    const icon =
      featureVersion >= '1.4'
        ? this.open
          ? IconTypes.DropUp
          : IconTypes.Dropdown
        : this.open
        ? IconTypes.Minus
        : IconTypes.Add;

    if (
      featureVersion >= '1.4' &&
      this.appearance === CollapsibleAppearance.Block
    ) {
      return html`<oryx-icon .type=${icon} .size=${Size.Md}></oryx-icon>`;
    }

    const i18nToken = `collapsible.${this.details?.open ? 'hide' : 'show'}`;

    return html`
      <oryx-button
        .type=${ButtonType.Icon}
        .size=${ButtonSize.Sm}
        .icon=${icon}
        .label=${this.i18n(i18nToken)}
        tabindex=${ifDefined(this.nonTabbable ? -1 : undefined)}
        @click=${() => this.details?.toggleAttribute('open')}
      >
      </oryx-button>
    `;
  }
}
