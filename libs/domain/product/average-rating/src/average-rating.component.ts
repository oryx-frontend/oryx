import { ContentMixin, defaultOptions } from '@oryx-frontend/experience';
import { PRODUCT, ProductContext, ProductMixin } from '@oryx-frontend/product';
import {
  Size,
  computed,
  featureVersion,
  hydrate,
} from '@oryx-frontend/utilities';
import { LitElement, TemplateResult, html } from 'lit';
import { ProductAverageRatingOptions } from './average-rating.model';

@defaultOptions({ enableCount: true, size: Size.Lg })
@hydrate({ context: featureVersion >= '1.4' ? PRODUCT : ProductContext.SKU })
export class ProductAverageRatingComponent extends ProductMixin(
  ContentMixin<ProductAverageRatingOptions>(LitElement)
) {
  protected $reviewCount = computed(() => {
    if (!this.$options().enableCount) return;
    return this.$product()?.reviewCount ?? 0;
  });

  protected override render(): TemplateResult | void {
    return html`
      <oryx-rating
        readonly
        .size=${this.$options().size}
        .value=${this.$product()?.averageRating}
        .reviewCount=${this.$reviewCount()}
      ></oryx-rating>
    `;
  }
}
