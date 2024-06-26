import { ButtonSize, ButtonType } from '@oryx-frontend/ui/button';
import {
  I18nMixin,
  Size,
  hydrate,
  preHydrate,
  throttle,
} from '@oryx-frontend/utilities';
import { LitElement, PropertyValues, TemplateResult, html } from 'lit';
import { property, query } from 'lit/decorators.js';
import { IconTypes } from '../../graphical/icon/src/icon.types';
import {
  CollapsibleTextProperties,
  CollapsibleTextToggle,
} from './collapsible-text.model';
import { collapsibleTextStyles } from './collapsible-text.styles';
import { truncateFix } from './pre-hydrate';

@hydrate({ event: ['mouseover', 'focus'] })
export class CollapsibleTextComponent
  extends I18nMixin(LitElement)
  implements CollapsibleTextProperties
{
  static styles = collapsibleTextStyles;

  @property() lineClamp?: number;
  @property() toggle?: CollapsibleTextToggle;
  @property({ reflect: true, type: Boolean }) expanded?: boolean;

  @query('slot') wrapper?: HTMLElement;

  protected resizeObserver?: ResizeObserver;

  protected updated(changedProperties: PropertyValues): void {
    if (!this.resizeObserver) {
      this.resizeObserver = new ResizeObserver(
        throttle(
          () =>
            window.requestAnimationFrame(() => {
              this.calc();
            }),
          100
        )
      );
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.resizeObserver.observe(this.wrapper!);
    }

    super.updated(changedProperties);
  }

  protected calc(): void {
    if (this.wrapper && this.lineClamp) {
      const lineHeight = parseInt(getComputedStyle(this.wrapper).lineHeight);
      const lineCount = this.wrapper.scrollHeight / lineHeight;
      this.style.setProperty('--line-count', lineCount.toString());
      this.toggleAttribute('requiresToggle', lineCount > this.lineClamp);
    }
  }

  protected override render(): TemplateResult {
    return html`<slot
        style="--line-clamp: ${this.lineClamp}"
        @slotchange=${this.onSlotChange}
      ></slot>
      ${this.renderToggle()}
      ${preHydrate(truncateFix, this.tagName.toLowerCase())} `;
  }

  protected renderToggle(): TemplateResult | void {
    const i18nToken = `collapsible.${
      this.expanded ? 'read-less' : 'read-more'
    }`;

    if (this.toggle === CollapsibleTextToggle.Icon) {
      return html`<oryx-button
        .type=${ButtonType.Icon}
        .size=${ButtonSize.Sm}
        .icon=${IconTypes.Dropdown}
        .label=${this.i18n(i18nToken)}
        @click=${this.onClick}
      ></oryx-button>`;
    }

    if (this.toggle === CollapsibleTextToggle.Text) {
      return html`<oryx-button
        .type=${ButtonType.Text}
        .size=${Size.Sm}
        @click=${this.onClick}
      >
        ${this.i18n(i18nToken)}
      </oryx-button>`;
    }
  }

  protected onSlotChange(): void {
    this.expanded = false;
    this.calc();
  }

  protected onClick(): void {
    this.expanded = !this.expanded;
  }
}
