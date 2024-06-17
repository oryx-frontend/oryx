import { resolve } from '@oryx-frontend/di';
import { ContentMixin, defaultOptions } from '@oryx-frontend/experience';
import { BreadcrumbItem, BreadcrumbService } from '@oryx-frontend/site';
import { IconTypes } from '@oryx-frontend/ui/icon';
import {
  I18nMixin,
  I18nRawContent,
  Size,
  hydrate,
  signal,
  signalAware,
} from '@oryx-frontend/utilities';
import { LitElement, TemplateResult, html } from 'lit';
import { DirectiveResult } from 'lit/directive';
import { ifDefined } from 'lit/directives/if-defined.js';
import { when } from 'lit/directives/when.js';
import { SiteBreadcrumbOptions } from './breadcrumb.model';
import { siteBreadcrumbStyles } from './breadcrumb.styles';

@hydrate()
@signalAware()
@defaultOptions({ divider: IconTypes.Forward })
export class SiteBreadcrumbComponent extends I18nMixin(
  ContentMixin<SiteBreadcrumbOptions>(LitElement)
) {
  static styles = siteBreadcrumbStyles;

  protected breadcrumbService = resolve(BreadcrumbService);

  protected $breadcrumb = signal(this.breadcrumbService.get());

  protected override render(): TemplateResult[] {
    const breadcrumb = this.$breadcrumb();

    return breadcrumb?.map((b, index) => {
      const isLastItem = index + 1 === breadcrumb.length;
      return html`${this.renderBreadcrumb(b, isLastItem)}
      ${when(this.$options().divider && !isLastItem, () =>
        this.renderDivider()
      )}`;
    });
  }

  protected renderText({
    text,
  }: BreadcrumbItem): string | DirectiveResult | void {
    return text && 'token' in text
      ? this.i18n(text.token, text?.values)
      : (text as I18nRawContent)?.raw;
  }

  protected renderBreadcrumb(
    breadcrumb: BreadcrumbItem,
    isLastItem: boolean
  ): TemplateResult {
    if (isLastItem) {
      return html`<span>${this.renderText(breadcrumb)}</span>`;
    }

    return html`<a href="${ifDefined(breadcrumb.url)}">
      ${this.renderText(breadcrumb)}
    </a>`;
  }

  protected renderDivider(): TemplateResult {
    return html`<oryx-icon
      .type="${this.$options().divider}"
      .size="${Size.Sm}"
    ></oryx-icon>`;
  }
}
