import { TotalsController } from '@oryx-frontend/cart';
import { ContentMixin } from '@oryx-frontend/experience';
import { hydrate, signal, signalAware } from '@oryx-frontend/utilities';
import { LitElement, TemplateResult, html } from 'lit';

@hydrate({ event: 'window:load' })
@signalAware()
export class OrderTotalsComponent extends ContentMixin(LitElement) {
  protected totalsController = new TotalsController(this);

  connectedCallback(): void {
    super.connectedCallback();

    this.totalsController.provideContext('ORDER');
  }

  protected $totals = signal(this.totalsController.getTotals());

  protected override render(): TemplateResult | void {
    if (this.$totals()) {
      return html`<h2>${this.i18n('order.totals.summary')}</h2>
        <oryx-composition .uid=${this.uid}></oryx-composition>`;
    }
  }
}
