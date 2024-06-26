import { ContentMixin } from '@oryx-frontend/experience';
import {
  PRODUCT,
  ProductContext,
  ProductLabel,
  ProductMixin,
} from '@oryx-frontend/product';
import { computed, featureVersion, hydrate } from '@oryx-frontend/utilities';
import { LitElement, TemplateResult } from 'lit';
import { html } from 'lit/static-html.js';
import { ProductLabelsOptions } from './label.model';
import { labelStyles } from './label.styles';

@hydrate({ context: featureVersion >= '1.4' ? PRODUCT : ProductContext.SKU })
export class ProductLabelsComponent extends ProductMixin(
  ContentMixin<ProductLabelsOptions>(LitElement)
) {
  static styles = [labelStyles];

  protected $labels = computed(() => this.filterLabels());

  protected override render(): TemplateResult | void {
    const labels = this.$labels();
    if (!labels) return;

    return html`${labels.map(
      (label) => html`<oryx-chip
        .appearance=${label.appearance}
        ?invert=${!!this.$options()?.invert}
      >
        ${label.name}
      </oryx-chip>`
    )}`;
  }

  /**
   * Filters labels based on the included and excluded options. Included and excluded
   * labels are compared by (label) name.
   *
   * The labels and in/exclusions are case insensitive.
   */
  protected filterLabels(): ProductLabel[] | undefined {
    const options = this.$options();
    const labels = this.$product()?.labels;

    if (!options || !labels) return labels;

    return labels?.filter(
      (label) =>
        (!options.included && !options.excluded) ||
        options.included?.toLowerCase().includes(label.name.toLowerCase()) ||
        (options.excluded &&
          !options.excluded.toLowerCase().includes(label.name.toLowerCase()))
    );
  }
}
