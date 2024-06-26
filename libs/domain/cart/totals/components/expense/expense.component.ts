import {
  hydrate,
  I18nMixin,
  signal,
  signalAware,
} from '@oryx-frontend/utilities';
import { html, LitElement, TemplateResult } from 'lit';
import { TotalsController } from '../../../src/controllers';

@hydrate({ event: 'window:load' })
@signalAware()
export class CartTotalsExpenseComponent extends I18nMixin(LitElement) {
  protected totalsController = new TotalsController(this);

  protected $totals = signal(this.totalsController.getTotals());

  protected override render(): TemplateResult | void {
    const { expenseTotal, currency } = this.$totals() ?? {};
    if (expenseTotal) {
      return html`
        <span>${this.i18n('cart.totals.expense')}</span>
        <oryx-site-price
          .value=${expenseTotal}
          .currency=${currency}
        ></oryx-site-price>
      `;
    }
  }
}
