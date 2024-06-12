import { ContentMixin, LayoutMixin } from '@oryx-frontend/experience';
import { featureVersion, hydrate } from '@oryx-frontend/utilities';
import { LitElement, TemplateResult, html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { LayoutAttributes } from './layout.model';

@hydrate()
export class LayoutComponent extends LayoutMixin(
  ContentMixin<LayoutAttributes>(LitElement)
) {
  protected override render(): TemplateResult {
    if (featureVersion >= '1.2') {
      return this.renderLayout({
        template: html`<slot></slot>`,
      });
    }

    return html`${unsafeHTML(`<style>${this.layoutStyles()}</style>`)}<slot
      ></slot>`;
  }
}
