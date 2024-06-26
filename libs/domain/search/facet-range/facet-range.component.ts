import { RangeFacet } from '@oryx-frontend/product';
import { SelectRangeFacetValues } from '@oryx-frontend/search';
import { FacetController } from '@oryx-frontend/search/facet';
import { MultiRangeChangeEvent } from '@oryx-frontend/ui/multi-range';
import {
  computed,
  effect,
  elementEffect,
  featureVersion,
  signalProperty,
} from '@oryx-frontend/utilities';
import { LitElement, TemplateResult, html } from 'lit';
import { state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import {
  SearchFacetRangeComponentAttributes,
  SearchFacetRangeComponentValues,
} from './facet-range.model';
import { searchRangeFacetStyles } from './facet-range.styles';

export class SearchRangeFacetComponent
  extends LitElement
  implements SearchFacetRangeComponentAttributes
{
  static styles = [searchRangeFacetStyles];

  protected controller = new FacetController(this);

  @signalProperty() name?: string;
  @signalProperty({ type: Boolean }) open?: boolean;
  @signalProperty({ type: Boolean }) disableClear?: boolean;
  @signalProperty({ type: Number, reflect: true }) step = 1;
  @signalProperty() labelMin?: string;
  @signalProperty() labelMax?: string;

  @state() min?: number;
  @state() max?: number;

  protected $facet = computed(() => this.controller.getFacet<RangeFacet>());

  protected $isDirty = computed(() => {
    const facet = this.$facet();

    if (!facet) return false;

    const {
      values: { min, max, selected },
    } = facet;

    return selected?.min !== min || selected?.max !== max;
  });

  @elementEffect()
  protected $syncValues = effect(() => {
    const facet = this.$facet();

    if (!facet) return;

    const {
      values: { min, max, selected },
    } = facet;

    this.min = selected?.min ?? min;
    this.max = selected?.max ?? max;

    this.syncInputsValues(this.min!, this.max!);
  });

  protected onRangeChange(e: CustomEvent<MultiRangeChangeEvent>): void {
    const { minValue: min, maxValue: max } = e.detail;
    const selected = { min, max };

    if (this.hasChangedValue(selected)) {
      this.controller.dispatchSelectEvent({ selected });
    }
  }

  protected onRangeDrag(e: CustomEvent<MultiRangeChangeEvent>): void {
    const { minValue, maxValue } = e.detail;

    this.syncInputsValues(minValue, maxValue);
  }

  protected onBlur(e: InputEvent): void {
    const { value, name } = e.target as HTMLInputElement;
    this[name as keyof SearchFacetRangeComponentValues] = Number(value);
  }

  protected onKeydown(e: KeyboardEvent): void {
    if (e.key === 'Enter') {
      (e.target as HTMLInputElement).blur();
    }
  }

  protected hasChangedValue({ min, max }: SelectRangeFacetValues): boolean {
    const {
      values: { selected },
    } = this.$facet()!;
    return selected?.min !== min || selected?.max !== max;
  }

  protected syncInputsValues(min: number, max: number): void {
    const minInput =
      this.renderRoot.querySelector<HTMLInputElement>(`input[name="min"]`);

    const maxInput =
      this.renderRoot.querySelector<HTMLInputElement>(`input[name="max"]`);

    if (minInput) {
      minInput.value = String(min);
    }

    if (maxInput) {
      maxInput.value = String(max);
    }

    this.requestUpdate();
  }

  protected override render(): TemplateResult | void {
    const facet = this.$facet();

    if (!facet) return;

    return html`<oryx-search-facet-value-navigation
      ?open=${this.open}
      ?enableClear=${!this.disableClear}
      ?dirty=${this.$isDirty()}
      .heading=${this.name}
      .key=${featureVersion >= '1.4' ? facet.parameter : undefined}
    >
      <section>${this.renderControls(facet)}</section>
    </oryx-search-facet-value-navigation>`;
  }

  protected renderInput(
    name: keyof SearchFacetRangeComponentValues,
    min: number,
    max: number,
    label: string = name
  ): TemplateResult {
    return html`
      <oryx-input .label=${label}>
        <input
          aria-label=${ifDefined(label)}
          name=${name}
          type="number"
          value=${String(this[name])}
          min=${min}
          max=${max}
          step=${this.step}
          @blur=${this.onBlur}
          @keydown=${this.onKeydown}
        />
      </oryx-input>
    `;
  }

  protected renderControls(facet: RangeFacet): TemplateResult {
    const {
      values: { min, max },
    } = facet;
    return html`
      ${this.renderInput('min', min, max - 1, this.labelMin)}

      <hr />

      ${this.renderInput('max', min + 1, max, this.labelMax)}

      <oryx-multi-range
        .min="${min}"
        .max="${max}"
        .maxValue="${this.max}"
        .minValue="${this.min}"
        .step="${this.step}"
        @drag="${this.onRangeDrag}"
        @change="${this.onRangeChange}"
      ></oryx-multi-range>
    `;
  }
}
