import { resolve } from '@oryx-frontend/di';
import { ContentMixin } from '@oryx-frontend/experience';
import { LocaleService } from '@oryx-frontend/i18n';
import { computed, hydrate, signalAware } from '@oryx-frontend/utilities';
import { LitElement, TemplateResult, html } from 'lit';
import { property } from 'lit/decorators.js';
import { SiteTimeComponentAttributes } from './time.model';

@hydrate()
@signalAware()
export class SiteTimeComponent
  extends ContentMixin(LitElement)
  implements SiteTimeComponentAttributes
{
  protected localeService = resolve(LocaleService);

  @property() stamp?: string | number | Date;
  @property() i18nToken?: string;

  protected $time = computed(() =>
    this.stamp ? this.localeService.formatTime(this.stamp) : undefined
  );

  protected override render(): TemplateResult | void {
    const time = this.$time();
    if (!time) return;

    if (this.i18nToken) {
      return html`${this.i18n(this.i18nToken, { time })}`;
    } else {
      return html`${time}`;
    }
  }
}
