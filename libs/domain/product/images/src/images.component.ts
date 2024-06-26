import {
  CarouselLayoutProperties,
  ContentMixin,
  defaultOptions,
} from '@oryx-frontend/experience';
import {
  PRODUCT,
  ProductContext,
  ProductMedia,
  ProductMediaContainerSize,
  ProductMixin,
} from '@oryx-frontend/product';
import { OBJECT_FIT } from '@oryx-frontend/ui';
import { featureVersion, hydrate } from '@oryx-frontend/utilities';
import { LitElement, TemplateResult, html } from 'lit';
import { state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { when } from 'lit/directives/when.js';
import {
  ProductImagesNavigationLayout as NavigationLayout,
  ProductImagesNavigationPosition as NavigationPosition,
  ProductImagesComponentOptions,
  ProductImagesMainLayout,
  ProductImagesNavigationDisplay,
  ProductImagesNavigationMouseEvent,
} from './images.model';
import { productImageStyles } from './images.styles';

const defaultImagesOptions: ProductImagesComponentOptions = {
  imageLayout: ProductImagesMainLayout.Carousel,
  navigationLayout: NavigationLayout.Carousel,
  navigationPosition: NavigationPosition.Bottom,
  imageObjectFit: 'contain',
  navigationObjectFit: 'contain',
  imageHeight: '300px',
  navigationHeight: '80px',
  imagesColumns: 1,
};

@defaultOptions(defaultImagesOptions)
@hydrate({
  event: 'mouseover',
  context: featureVersion >= '1.4' ? PRODUCT : ProductContext.SKU,
})
export class ProductImagesComponent extends ProductMixin(
  ContentMixin<ProductImagesComponentOptions>(LitElement)
) {
  static styles = productImageStyles;

  @state() active?: number;

  protected override render(): TemplateResult | void {
    if (!this.$product()) return;

    const {
      navigationPosition = defaultImagesOptions.navigationPosition,
      navigationDisplay,
      imageHeight = defaultImagesOptions.imageHeight,
    } = this.$options();

    const media = this.resolveImages();
    const main = this.renderMainLayout(media);
    const navigation = this.renderNavigationLayout(media);
    const isFloating =
      navigationDisplay === ProductImagesNavigationDisplay.Floating;

    return html`
      <oryx-layout
        navigation=${navigationPosition}
        ?floating=${isFloating}
        style="--product-image-height: ${imageHeight};"
      >
        ${when(
          navigationPosition === NavigationPosition.Top ||
            navigationPosition === NavigationPosition.Start,
          () => html`${navigation}${main}`,
          () => html`${main}${navigation}`
        )}
      </oryx-layout>
    `;
  }

  protected renderMainLayout(media: ProductMedia[]): TemplateResult | void {
    const {
      imageLayout = defaultImagesOptions.imageLayout,
      imageObjectFit: objectFit = defaultImagesOptions.imageObjectFit,
      imagesColumns: cols = defaultImagesOptions.imagesColumns,
      scrollBehavior,
    } = this.$options();

    if (!media.length || imageLayout === ProductImagesMainLayout.None) {
      return;
    }

    const options =
      featureVersion >= '1.2'
        ? ({
            rules: [{ layout: { showArrows: false, showIndicators: false } }],
          } as CarouselLayoutProperties)
        : undefined;

    return html`<oryx-layout
      class="main"
      layout=${ifDefined(imageLayout)}
      behavior=${ifDefined(scrollBehavior)}
      .options=${options}
      style="--oryx-column-count: 1;${OBJECT_FIT}:${objectFit};--cols: ${cols}"
    >
      ${media.map(
        (_, i) => html`
          <oryx-product-media
            .sku=${this.sku}
            .options=${{
              mediaIndex: i,
              containerSize: ProductMediaContainerSize.Thumbnail,
              loading: this.active !== i ? 'lazy' : undefined,
            }}
            ?active=${this.active === i}
          ></oryx-product-media>
        `
      )}
    </oryx-layout>`;
  }

  protected renderNavigationLayout(
    media: ProductMedia[]
  ): TemplateResult | void {
    const {
      navigationDisplay: display,
      navigationLayout: layout,
      navigationPosition: position,
      navigationHeight: height = defaultImagesOptions.navigationHeight,
      navigationWidth: width,
      navigationObjectFit: objectFit = defaultImagesOptions.navigationObjectFit,
    } = this.$options();

    if (media.length < 2 || display === ProductImagesNavigationDisplay.None) {
      return;
    }

    const isVertical =
      position === NavigationPosition.Start ||
      position === NavigationPosition.End;

    const options =
      featureVersion >= '1.2'
        ? ({
            rules: [{ layout: { showArrows: false, showIndicators: false } }],
          } as CarouselLayoutProperties)
        : undefined;

    return html`<oryx-layout
      class="navigation"
      layout=${layout || NavigationLayout.Carousel}
      ?layout-vertical=${isVertical}
      style="--oryx-grid-item-size:${height};${OBJECT_FIT}:${objectFit};"
      .options=${options}
    >
      ${media.map(
        (_, i) => html`
          <label aria-label=${`image ${i}`}>
            <input
              value=${i}
              type="radio"
              name=${ifDefined(this.uid)}
              ?checked=${i === 0}
              @input=${this.onInput}
              @mouseover=${this.onMouseover}
            />

            <oryx-product-media
              .sku=${this.sku}
              .options=${{
                mediaIndex: i,
                containerSize: ProductMediaContainerSize.Thumbnail,
                loading: this.active !== i ? 'lazy' : undefined,
              }}
              ?active=${this.active === i}
            ></oryx-product-media>
          </label>
        `
      )}
    </oryx-layout>`;
  }

  protected onInput(e: InputEvent): void {
    const target = e.target as HTMLInputElement;
    this.active = Number(target.value);
    this.scrollToImage(Number(target.value));
  }

  protected onMouseover(e: Event): void {
    if (
      this.$options().navigationMouseEvent ===
      ProductImagesNavigationMouseEvent.Mouseover
    ) {
      const target = e.target as HTMLInputElement;
      this.active = Number(target.value);
      this.scrollToImage(Number(target.value));
    }
  }

  protected scrollToImage(value: number): void {
    const media = this.shadowRoot?.querySelectorAll<HTMLElement>(
      '.main oryx-product-media'
    )?.[value];
    (media?.parentNode as Element)?.scroll({
      left: media?.offsetLeft,
    });
  }

  protected resolveImages(): ProductMedia[] {
    const { mediaSet } = this.$options();
    return (
      (!mediaSet
        ? this.$product()?.mediaSet?.[0]
        : this.$product()?.mediaSet?.find((set) => set.name === mediaSet)
      )?.media ?? []
    );
  }
}
