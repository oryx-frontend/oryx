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
import { DayComponentAttributes } from './day.model';

@hydrate()
@signalAware()
export class SiteDayComponent extends ContentMixin<DayComponentAttributes>(
  LitElement
) {
  protected localeService = resolve(LocaleService);

  @signalProperty() day?: string;
  @signalProperty() i18nToken?: string;

  protected $day = computed(() =>
    this.day ? this.localeService.formatDay(this.day) : undefined
  );

  protected override render(): TemplateResult | void {
    if (!this.$day()) return;
    if (this.i18nToken) {
      return html`${this.i18n(this.i18nToken, { day: this.$day() })}`;
    } else {
      return html`${this.$day()}`;
    }
  }
}
