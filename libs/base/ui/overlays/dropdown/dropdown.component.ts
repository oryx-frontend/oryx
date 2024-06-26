import { ButtonType } from '@oryx-frontend/ui/button';
import { IconTypes } from '@oryx-frontend/ui/icon';
import { PopoverController } from '@oryx-frontend/ui/popover';
import {
  I18nMixin,
  Size,
  featureVersion,
  hydrate,
  queryFirstFocusable,
} from '@oryx-frontend/utilities';
import { LitElement, TemplateResult, html } from 'lit';
import { property } from 'lit/decorators.js';
import { DropdownProperties, Position } from './dropdown.model';
import { dropdownBaseStyles } from './dropdown.styles';

@hydrate({ event: ['mouseover', 'focusin'] })
export class DropdownComponent
  extends I18nMixin(LitElement)
  implements DropdownProperties
{
  static styles = dropdownBaseStyles;

  /**
   * @deprecated not needed to keep a reference to the controller.
   */
  protected controller?: PopoverController = new PopoverController(this, {
    boundingElement: this,
  });

  @property({ reflect: true, type: Boolean }) open?: boolean;
  @property({ type: Boolean }) showOnFocus?: boolean;
  @property({ type: Boolean }) openOnHover?: boolean;
  @property({ reflect: true }) position?: Position;
  @property({ type: Boolean, attribute: 'vertical-align' })
  verticalAlign?: boolean;
  @property() triggerIconSize = Size.Md;

  /**
   * @deprecated since version 1.4 use the i18n token 'ui.toggle-dropdown' instead
   */
  @property() toggleButtonAriaLabel = 'Toggle dropdown';

  protected override render(): TemplateResult {
    return html`
      <slot name="trigger">
        <oryx-button
          .type=${ButtonType.Icon}
          .active=${this.open}
          .size=${this.triggerIconSize}
          .label=${featureVersion >= '1.4'
            ? this.i18n('ui.toggle-dropdown')
            : this.toggleButtonAriaLabel}
          .icon=${IconTypes.Actions}
        ></oryx-button>
      </slot>

      <oryx-popover
        ?show=${this.open}
        @oryx.close=${(): void => this.onClose()}
        ?inert=${!this.open}
      >
        <slot></slot>
      </oryx-popover>
    `;
  }

  protected get trigger(): Element | null | undefined {
    return this.renderRoot?.querySelector('slot[name="trigger"]');
  }

  /**
   * Restoring focus on the trigger when dropdown is closing
   */
  protected onClose(): void {
    if (
      this.matches(':focus-within') &&
      !this.trigger?.matches(':focus-within')
    ) {
      queryFirstFocusable(this.trigger as HTMLElement)?.focus();
    }
  }
}
