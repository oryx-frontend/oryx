import { resolve } from '@oryx-frontend/di';
import { RangeFacet } from '@oryx-frontend/product';
import { SelectRangeFacetValues } from '@oryx-frontend/search';
import { SearchRangeFacetComponent } from '@oryx-frontend/search/facet-range';
import { CurrencyService } from '@oryx-frontend/site';
import { MultiRangeChangeEvent } from '@oryx-frontend/ui/multi-range';
import {
  I18nMixin,
  computed,
  signal,
  signalProperty,
} from '@oryx-frontend/utilities';
import { TemplateResult, html } from 'lit';
import { keyed } from 'lit/directives/keyed.js';

export class SearchPriceFacetComponent extends I18nMixin(
  SearchRangeFacetComponent
) {
  @signalProperty() labelMin = 'price.label.min-<currency>';
  @signalProperty() labelMax = 'price.label.max-<currency>';

  protected currencyService = resolve(CurrencyService);
  protected override $facet = computed(() =>
    this.convertValues(this.controller.getFacet<RangeFacet>())
  );
  protected $currencySymbol = signal(this.currencyService.getCurrencySymbol());

  protected convertValues(facet: RangeFacet | null): RangeFacet | null {
    if (!facet) return null;

    const { min, max, selected } = facet.values;

    return {
      ...facet,
      values: {
        min: Math.floor(min / 100),
        max: Math.ceil(max / 100),
        selected: {
          min: Math.floor(selected!.min / 100),
          max: Math.ceil(selected!.max / 100),
        },
      },
    };
  }

  protected onRangeChange(e: CustomEvent<MultiRangeChangeEvent>): void {
    const { min, max } = this.$facet()!.values;
    const { minValue, maxValue } = e.detail;
    const selected = {
      min: minValue !== min ? minValue : undefined,
      max: maxValue !== max ? maxValue : undefined,
    } as SelectRangeFacetValues;

    if (this.hasChangedValue(selected)) {
      this.controller.dispatchSelectEvent({ selected });
    }
  }

  protected renderControls(facet: RangeFacet): TemplateResult {
    const currency = this.$currencySymbol();
    const labelMin = this.i18n(this.labelMin, { currency }) as string;
    const labelMax = this.i18n(this.labelMax, { currency }) as string;

    const {
      values: { min, max },
    } = facet;

    return html`
      ${this.renderInput('min', min, max - 1, labelMin)}

      <hr />

      ${this.renderInput('max', min + 1, max, labelMax)}
      ${keyed(
        `${min}-${max}`,
        html`
          <oryx-multi-range
            .min="${min}"
            .max="${max}"
            .maxValue="${this.max}"
            .minValue="${this.min}"
            .step="${this.step}"
            @drag="${this.onRangeDrag}"
            @change="${this.onRangeChange}"
          ></oryx-multi-range>
        `
      )}
    `;
  }
}
