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
import { variantListStyle } from './variant-selector.styles';

@hydrate({ context: PRODUCT })
@signalAware()
export class ProductVariantSelectorComponent extends ProductMixin(
  LayoutMixin(LitElement)
) {
  static styles = variantListStyle;

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
    console.log('this.$product():');


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
        (key, index) =>
          html`<h3>${attributeNames?.[key]}</h3>
          ${repeat(
            variantDefinition[key],
            (value) => html`
              <oryx-toggle-icon>
                <input
                  type="radio"
                  .placeholder=${key}
                  .name=${key}
                  .value=${value}
                  ?checked=${this.isChecked(key, value)}
                  ?disabled=${this.isDisabled(key, value, index)}
                />
                <span>${value}</span>
              </oryx-toggle-icon>
            `
          )}`
      )}
    </form>`;
  }

  protected isChecked(key: string, value: string) {
    const product = this.$product();
    return product?.attributes?.[key] === value;
  }

  /**
   * Determines if a given attribute is disabled based on the product's variant attribute info.
   */
  protected isDisabled(
    attributeKey: string,
    attributeValue: string,
    index: number
  ): boolean {
    const product = this.$product();

    if (!product?.variants) {
      return false;
    }

    // Extract all active variant attribute keys except the one at the given index
    const allKeys = Object.keys(product.variantDefinition || {});
    const activeKeys = allKeys.filter((_, i) => i !== index);

    // Check if any variant matches the selected attribute values
    const isVariantDisabled = !Object.values(product.variants).some(
      (variant) => {
        // Check if all selected attribute values (except the one at the index) match the variant
        return (
          activeKeys.every(
            (key) => variant[key] === this.$product()?.attributes?.[key]
          ) && variant[attributeKey] === attributeValue
        );
      }
    );

    return isVariantDisabled;
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
