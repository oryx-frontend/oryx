import { resolve } from '@oryx-frontend/di';
import { ContentMixin } from '@oryx-frontend/experience';
import { LocaleService } from '@oryx-frontend/i18n';
import {
  computed,
  hydrate,
  signalAware,
  signalProperty,
} from '@oryx-frontend/utilities';
import { LitElement, TemplateResult, html } from 'lit';
import { DateComponentAttributes } from './date.model';

@hydrate()
@signalAware()
export class DateComponent extends ContentMixin<DateComponentAttributes>(
  LitElement
) {
  protected localeService = resolve(LocaleService);

  @signalProperty() stamp?: string | number | Date;
  @signalProperty() i18nToken?: string;

  protected $date = computed(() =>
    this.stamp ? this.localeService.formatDate(this.stamp) : undefined
  );

  protected override render(): TemplateResult | void {
    if (!this.$date()) return;
    if (this.i18nToken) {
      return html`${this.i18n(this.i18nToken, { date: this.$date() })}`;
    } else {
      return html`${this.$date()}`;
    }
  }
}
