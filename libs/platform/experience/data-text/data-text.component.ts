import { EntityService } from '@oryx-frontend/core';
import { resolve } from '@oryx-frontend/di';
import { ContentMixin } from '@oryx-frontend/experience';
import { LinkService } from '@oryx-frontend/router';
import { TextMixin } from '@oryx-frontend/ui/text';
import { computed, hydrate } from '@oryx-frontend/utilities';
import { LitElement, TemplateResult } from 'lit';
import { DirectiveResult } from 'lit/directive';
import { UnsafeHTMLDirective } from 'lit/directives/unsafe-html';
import { html } from 'lit/static-html.js';
import { catchError, of } from 'rxjs';
import { DataTextComponentOptions } from './data-text.model';

@hydrate()
export class DataTextComponent extends TextMixin(
  ContentMixin<DataTextComponentOptions>(LitElement)
) {
  protected entityService = resolve(EntityService);
  protected linkService = resolve(LinkService);

  protected $data = computed<string | undefined>(() => {
    const { entity: type, field } = this.$options();
    return this.entityService
      .getField<string>({ element: this, type, field })
      .pipe(catchError(() => of()));
  });

  protected $text = computed(() => {
    const text = this.$data();
    if (!text) return;
    return this.convertText(text);
  });

  protected $linkQualifier = computed(() =>
    this.entityService
      .getQualifier({ element: this, type: this.$options().entity })
      .pipe(catchError(() => of()))
  );

  protected $link = computed(() => {
    const qualifier = this.$linkQualifier();
    return qualifier ? this.linkService.get(qualifier) : undefined;
  });

  protected override render(): TemplateResult | void {
    const content = this.renderContent();
    const { tag } = this.$options();
    return tag && content
      ? html`<oryx-heading .tag=${tag}>${content}</oryx-heading>`
      : content;
  }

  protected renderContent(): TemplateResult | void {
    const text = this.$text();
    if (!text) return;
    const { link } = this.$options();
    return html`${this.renderPrefix()}${link
      ? this.renderLink()
      : this.$text()} `;
  }

  protected renderLink():
    | TemplateResult
    | DirectiveResult<typeof UnsafeHTMLDirective>
    | void {
    const text = this.$text();
    const link = this.$link();

    if (!link) return text;

    return html` <oryx-link><a href=${this.$link()}>${text}</a> </oryx-link> `;
  }

  protected renderPrefix(): TemplateResult | void {
    const { prefix } = this.$options();
    if (!prefix) return;
    return html`<span part="prefix" styling="padding-inline-end: 8px;"
      >${prefix}</span
    >`;
  }
}
