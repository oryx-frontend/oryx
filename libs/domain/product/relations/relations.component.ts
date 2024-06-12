import { resolve } from '@oryx-frontend/di';
import { LayoutMixin } from '@oryx-frontend/experience';
import {
  ProductMixin,
  ProductRelationsListService,
} from '@oryx-frontend/product';
import { computed, hydrate } from '@oryx-frontend/utilities';
import { LitElement, TemplateResult, html } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { of } from 'rxjs';

@hydrate()
export class ProductRelationsComponent extends ProductMixin(
  LayoutMixin(LitElement)
) {
  protected productRelativesListService = resolve(ProductRelationsListService);

  protected $list = computed(() => {
    const product = this.$product();
    return product?.sku
      ? this.productRelativesListService.get({ sku: product.sku })
      : of(undefined);
  });

  protected override render(): TemplateResult {
    return html`
      ${repeat(
        this.$list() ?? [],
        (p) => p.sku,
        (p) => html`<oryx-product-card .sku=${p.sku}></oryx-product-card>`
      )}
      ${unsafeHTML(`<style>${this.layoutStyles()}</style>`)}
    `;
  }
}
