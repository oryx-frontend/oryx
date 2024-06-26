import { ContextController } from '@oryx-frontend/core';
import { resolve } from '@oryx-frontend/di';
import { ContentMixin, defaultOptions } from '@oryx-frontend/experience';
import {
  PRODUCT,
  ProductContext,
  ProductMediaContainerSize,
  ProductMixin,
} from '@oryx-frontend/product';
import { RouteType } from '@oryx-frontend/router';
import { LinkService } from '@oryx-frontend/site';
import { HeadingTag } from '@oryx-frontend/ui/heading';
import {
  Size,
  computed,
  elementEffect,
  featureVersion,
  hydrate,
  ssrShim,
} from '@oryx-frontend/utilities';
import { LitElement, TemplateResult, html } from 'lit';
import { ProductPriceOptions } from '../../price/src/price.model.js';
import { ProductTitleOptions } from '../../title/src/title.model.js';
import { ProductCardOptions } from './card.model';
import { ProductCardStyles } from './card.styles';

@defaultOptions({
  template: 'grid',
  enableTitle: true,
  enableMedia: true,
  enablePrice: true,
  enableWishlist: true,
  enableLabels: true,
  enableRating: true,
  enableAddToCart: true,
})
@ssrShim('style')
@hydrate()
export class ProductCardComponent extends ProductMixin(
  ContentMixin<ProductCardOptions>(LitElement)
) {
  static styles = [ProductCardStyles];

  protected contextController = new ContextController(this);
  protected semanticLinkService = resolve(LinkService);

  @elementEffect()
  protected setTemplate = (): void => {
    this.setAttribute('template', this.$options().template ?? 'grid');
  };

  @elementEffect()
  protected skuController = (): void => {
    const sku = this.$options().sku;
    if (sku !== undefined) {
      this.contextController.provide(
        featureVersion >= '1.4' ? PRODUCT : ProductContext.SKU,
        featureVersion >= '1.3' ? { sku } : sku
      );
    }
  };

  @elementEffect()
  protected setProductContext = (): void => {
    if (this.sku) {
      this.contextController.provide(
        featureVersion >= '1.4' ? PRODUCT : ProductContext.SKU,
        featureVersion >= '1.3' ? { sku: this.sku } : this.sku
      );
    }
  };

  protected override render(): TemplateResult | void {
    const { template } = this.$options();

    if (template === 'grid') return this.renderGridItem();
    if (template === 'list') return this.renderListItem();
  }

  protected renderGridItem(): TemplateResult | void {
    const product = this.$product();
    if (!product) return;
    return html`<a href=${this.$link()} aria-label=${product?.name}>
      ${[this.renderLabels(), this.renderMedia()]}
      <div class="details">
        ${[
          this.renderTitle(),
          this.renderRating(),
          this.renderPrice(),
          this.renderAddToCart(),
        ]}
      </div>
    </a>`;
  }

  protected $link = computed(() =>
    this.semanticLinkService.get({
      type: RouteType.Product,
      id: featureVersion >= '1.4' ? undefined : this.$product()?.sku,
      qualifier: this.$productQualifier(),
    })
  );
  protected renderListItem(): TemplateResult {
    const product = this.$product();

    return html`<a
      href=${this.$link()}
      aria-label=${product?.name}
      template="list"
    >
      ${[
        this.renderMedia(ProductMediaContainerSize.Icon),
        this.renderTitle(),
        this.renderPrice(),
        this.renderAddToCart(),
      ]}
    </a>`;
  }

  protected renderLabels(): TemplateResult | void {
    if (this.$options().enableLabels) {
      return html`<oryx-product-labels></oryx-product-labels>`;
    }
  }

  // TODO: move to wishlist component
  // private renderWishlist(): TemplateResult | void {
  //   if (this.$options().enableWishlist) {
  //     return html`<div class="actions">
  //       <oryx-button
  //          .type=${ButtonType.Icon} .icon=${IconTypes.Wishlist}
  //          @click=${(e: Event) => e.preventDefault()}>
  //       </oryx-icon-button>
  //     </div>`;
  //   }
  // }

  protected renderMedia(
    containerSize = ProductMediaContainerSize.Thumbnail
  ): TemplateResult | void {
    if (this.$options().enableMedia) {
      return html`
        <oryx-product-media
          .options=${{
            containerSize,
          }}
        ></oryx-product-media>
      `;
    }
  }

  protected renderTitle(): TemplateResult | void {
    if (this.$options().enableTitle) {
      return html`<oryx-product-title
        .options="${{
          tag: HeadingTag.Caption,
          maxLines: featureVersion >= '1.4' ? 2 : undefined,
        } as ProductTitleOptions}"
      ></oryx-product-title>`;
    }
  }

  protected renderRating(): TemplateResult | void {
    if (this.$options().enableRating) {
      return html`<oryx-product-average-rating
        .options=${{ size: Size.Sm, enableCount: false }}
      ></oryx-product-average-rating>`;
    }
  }

  protected renderPrice(): TemplateResult | void {
    if (this.$options().enablePrice) {
      return html`<oryx-product-price
        .options=${{ enableTaxMessage: false } as ProductPriceOptions}
      ></oryx-product-price>`;
    }
  }

  protected renderAddToCart(): TemplateResult | void {
    const { enableAddToCart, template } = this.$options();
    if (!enableAddToCart) return;

    return html`<oryx-cart-add
      tabindex="-1"
      .options=${{
        outlined: true,
        hideQuantityInput: true,
        enableLabel: template === 'grid',
      }}
    ></oryx-cart-add>`;
  }
}
