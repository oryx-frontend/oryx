import { ContentMixin } from '@oryx-frontend/experience';
import { OrderMixin } from '@oryx-frontend/order';
import { HeadingTag } from '@oryx-frontend/ui/heading';
import { LitElement, TemplateResult, html } from 'lit';

export class OrderHeadingComponent extends OrderMixin(
  ContentMixin(LitElement)
) {
  protected override render(): TemplateResult | void {
    if (!this.$order()) return;

    return html`<oryx-heading
      .tag=${HeadingTag.H3}
      .typography=${HeadingTag.H6}
    >
      ${this.i18n('order.<count>-items', {
        count: this.$order().items.length,
      })}
    </oryx-heading>`;
  }
}
