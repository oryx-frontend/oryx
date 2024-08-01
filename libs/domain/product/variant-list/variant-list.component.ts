import { resolve } from '@oryx-frontend/di';
import { LayoutMixin } from '@oryx-frontend/experience';
import {
  PRODUCT,
  ProductListPageService,
  ProductListService,
  ProductMixin,
} from '@oryx-frontend/product';
import { LinkService, RouteType, RouterService } from '@oryx-frontend/router';
import { computed, hydrate, signalAware } from '@oryx-frontend/utilities';
import {
  createSignal,
  effect,
} from '@oryx-frontend/utilities/src/signals/core';
import { LitElement, TemplateResult, html } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { variantListStyle } from './variant-list.styles';

@hydrate({ context: PRODUCT })
@signalAware()
export class ProductVariantListComponent extends ProductMixin(
  LayoutMixin(LitElement)
) {
  static styles = variantListStyle;

  protected productListService = resolve(ProductListService);
  protected productListPageService = resolve(ProductListPageService);

  protected routerService = resolve(RouterService);
  protected linkService = resolve(LinkService);

  protected $variant = createSignal<string | undefined>(undefined);

  protected $link = computed(() => {
    const variantSku = this.$variant();
    if (!variantSku) return;
    return this.linkService.get({
      type: RouteType.Product,
      qualifier: { sku: variantSku },
    });
  });

  protected route = effect(() => {
    const link = this.$link();
    if (link) {
      this.routerService.navigate(link as any as string);
    }
  });

  protected render(): TemplateResult | void {
    const variants = this.$product()?.variants;

    if (!variants || Object.keys(variants).length < 2) return;

    return this.renderAttributeSelectors();
  }

  protected renderAttributeSelectors() {
    const { variantDefinition, attributeNames } = this.$product() ?? {};
    if (!variantDefinition) return;
    const keys = Object.keys(variantDefinition);

    return html` <form @change=${this.handleVariantChange}>
      ${repeat(
        keys,
        (key) =>
          html`<h3>${attributeNames?.[key]}</h3>
          ${repeat(
            variantDefinition[key],
            (value) => html`
              <oryx-toggle-icon>
                <input
                  type="radio"
                  placeholder="make a11y happy"
                  .name=${key}
                  .value=${value}
                  ?checked=${this.isChecked(key, value)}
                />
                <span>${value}</span>
              </oryx-toggle-icon>
            `
          )}</form>`
      )}
    </form>`;
  }

  protected isChecked(key: string, value: string) {
    const product = this.$product();
    return product?.attributes?.[key] === value;
  }

  protected handleVariantChange(e: Event) {
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    const selectedAttributes: Record<string, string> = {};
    formData.forEach((value, key) => {
      selectedAttributes[key] = value as string;
    });

    const { variants } = this.$product() ?? {};

    if (!variants) return;
    const matchingVariant = Object.keys(variants).find((sku) => {
      const values = variants[sku];

      return Object.keys(selectedAttributes).every(
        (attrKey) => values![attrKey] === selectedAttributes[attrKey]
      );
    });
    if (matchingVariant) this.$variant.set(matchingVariant);
  }
}
