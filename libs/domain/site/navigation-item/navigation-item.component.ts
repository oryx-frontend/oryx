import { TokenResolver } from '@oryx-frontend/core';
import { resolve } from '@oryx-frontend/di';
import { ContentMixin, defaultOptions } from '@oryx-frontend/experience';
import { LinkService } from '@oryx-frontend/site';
import { ButtonType } from '@oryx-frontend/ui/button';
import { computed, hydrate } from '@oryx-frontend/utilities';
import { LitElement, TemplateResult } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { html } from 'lit/static-html.js';
import { of } from 'rxjs';
import {
  NavigationContentBehavior,
  NavigationTriggerBehavior,
  NavigationTriggerType,
  SiteNavigationItemOptions,
} from './navigation-item.model';
import { styles } from './navigation-item.styles';

@defaultOptions({
  triggerType: NavigationTriggerType.StorefrontButton,
  triggerBehavior: NavigationTriggerBehavior.Click,
  contentBehavior: NavigationContentBehavior.Navigation,
})
@hydrate({ event: 'window:load' })
export class SiteNavigationItemComponent extends ContentMixin<SiteNavigationItemOptions>(
  LitElement
) {
  static styles = styles;

  protected tokenResolver = resolve(TokenResolver);
  protected semanticLinkService = resolve(LinkService);

  protected $label = computed(() => {
    const label = this.$options().label;
    return label ? this.tokenResolver.resolveToken(label) : of(undefined);
  });

  protected $badge = computed(() => {
    const badge = this.$options().badge;
    return badge ? this.tokenResolver.resolveToken(badge) : of(undefined);
  });

  protected $url = computed(() => {
    const url = this.$options().url;
    return typeof url !== 'object'
      ? of(url)
      : this.semanticLinkService.get(url);
  });

  protected onTriggerClick(): void {
    if (this.$options().contentBehavior === NavigationContentBehavior.Modal) {
      this.renderRoot
        .querySelector('oryx-modal')
        ?.toggleAttribute('open', true);
    }
  }

  protected onTriggerHover(e: MouseEvent): void {
    if (this.$options().triggerBehavior !== NavigationTriggerBehavior.Hover) {
      return;
    }

    //imitate mousedown behavior
    const trigger = e.target as LitElement;
    trigger.focus();
    this.onTriggerClick();
  }

  protected override render(): TemplateResult {
    switch (this.$options()?.contentBehavior) {
      case NavigationContentBehavior.Dropdown:
        return this.renderContentDropdown();
      case NavigationContentBehavior.Modal:
        return this.renderContentModal();
      case NavigationContentBehavior.Navigation:
      default:
        return this.renderContentNavigation();
    }
  }

  protected renderComposition(): TemplateResult {
    return html`<oryx-composition
      uid=${ifDefined(this.uid)}
      close-popover
    ></oryx-composition>`;
  }

  protected renderButton(type?: ButtonType): TemplateResult {
    return html`
      <oryx-button
        slot="trigger"
        type=${ifDefined(type)}
        text=${ifDefined(this.$label())}
        href=${ifDefined(this.$url())}
        icon=${ifDefined(this.$options().icon)}
        @click=${this.onTriggerClick}
        @mouseenter=${this.onTriggerHover}
      ></oryx-button>
    `;
  }

  protected renderCustomButton(): TemplateResult {
    return html`
      <oryx-site-navigation-button
        slot="trigger"
        url=${ifDefined(this.$url())}
        icon=${ifDefined(this.$options().icon)}
        text=${ifDefined(this.$label())}
        badge=${ifDefined(this.$badge())}
        @click=${this.onTriggerClick}
        @mouseenter=${this.onTriggerHover}
      ></oryx-site-navigation-button>
    `;
  }

  protected renderTrigger(): TemplateResult {
    switch (this.$options().triggerType) {
      case NavigationTriggerType.Icon:
        return this.renderButton(ButtonType.Icon);
      case NavigationTriggerType.Button:
        return this.renderButton();
      case NavigationTriggerType.StorefrontButton:
      default:
        return this.renderCustomButton();
    }
  }

  protected renderContentNavigation(): TemplateResult {
    return this.renderTrigger();
  }

  protected renderContentModal(): TemplateResult {
    return html`
      ${this.renderTrigger()}
      <oryx-modal
        enableCloseButtonInHeader
        enableCloseByEscape
        enableCloseByBackdrop
        heading=${ifDefined(this.$options().label)}
      >
        ${this.renderComposition()}
      </oryx-modal>
    `;
  }

  protected renderContentDropdown(): TemplateResult {
    return html`
      <oryx-dropdown position="start" vertical-align>
        ${this.renderTrigger()} ${this.renderComposition()}
      </oryx-dropdown>
    `;
  }
}
