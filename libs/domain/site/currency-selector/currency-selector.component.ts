import { resolve } from '@oryx-frontend/di';
import { ContentMixin } from '@oryx-frontend/experience';
import { LocaleService } from '@oryx-frontend/i18n';
import { CurrencyService } from '@oryx-frontend/site';
import { Position } from '@oryx-frontend/ui';
import { ButtonSize, ButtonType } from '@oryx-frontend/ui/button';
import { IconTypes } from '@oryx-frontend/ui/icon';
import { hydrate, signal } from '@oryx-frontend/utilities';
import { LitElement, TemplateResult } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { html } from 'lit/static-html.js';
import { siteCurrencySelectorStyles } from './currency-selector.styles';

@hydrate({ event: ['mouseover', 'focusin'] })
export class SiteCurrencySelectorComponent extends ContentMixin(LitElement) {
  static styles = [siteCurrencySelectorStyles];

  protected $currencyService = resolve(CurrencyService);

  protected $currencies = signal(this.$currencyService.getAll(), {
    initialValue: [],
  });
  protected $current = signal(this.$currencyService.get());
  protected $currentLocale = signal(resolve(LocaleService).get(), {
    initialValue: 'en',
  });

  protected override render(): TemplateResult | void {
    const currencies = this.$currencies();

    if (!this.$current() || !currencies?.length || currencies.length < 2) {
      return;
    }

    return html`
      <oryx-dropdown vertical-align .position=${Position.START}>
        <oryx-button
          slot="trigger"
          .size=${ButtonSize.Md}
          .type=${ButtonType.None}
        >
          ${this.$current()}
          <oryx-icon .type=${IconTypes.Dropdown}></oryx-icon>
        </oryx-button>
        ${repeat(
          this.$currencies(),
          (currency) => currency.code,
          (currency) =>
            html` <oryx-option
              close-popover
              value=${currency.code}
              ?active=${currency.code === this.$current()}
              @click=${() => this.onClick(currency.code)}
            >
              ${this.getLabel(currency.code)}
            </oryx-option>`
        )}
      </oryx-dropdown>
    `;
  }

  protected onClick(locale: string): void {
    this.$currencyService.set(locale);
  }

  protected getLabel(code: string): string {
    const currencyNames = new Intl.DisplayNames([this.$currentLocale()], {
      type: 'currency',
    });
    return currencyNames.of(code) ?? code;
  }
}
