import { ContentMixin } from '@oryx-frontend/experience';
import { ProductMixin } from '@oryx-frontend/product';
import { elementEffect, hydrate } from '@oryx-frontend/utilities';
import { LitElement } from 'lit';
import { loadBvScript } from '../script';
import { bzRatingStyles } from '../styles';
import { BazaarvoiceRatingOptions } from './rating.model';
@hydrate()
export class BazaarvoiceRatingComponent extends ProductMixin(
  ContentMixin<BazaarvoiceRatingOptions>(LitElement)
) {
  static styles = [bzRatingStyles];

  @elementEffect()
  protected loadScript = (): void => {
    const productId = this.$product()?.sku;
    if (productId) {
      loadBvScript().then((bv) => {
        const summaryRefId = `${this.uid}-average-rating`;
        this.createContainer(summaryRefId);
        bv.ui('rr', 'show_reviews', {
          productId,
          summaryContainerDiv: summaryRefId,
        });
      });
    }
  };

  protected createContainer(id: string): void {
    if (!document.getElementById(id)) {
      const container: HTMLElement = document.createElement('div');
      container.setAttribute('id', id);
      document.body.appendChild(container);

      const move = () => {
        const el = document.getElementById(id);
        if (el) {
          this.shadowRoot?.appendChild(el);
        }
        observer.disconnect();
      };
      const observer = new MutationObserver((mutations) => {
        mutations.forEach(() => move());
      });

      observer.observe(container, { childList: true });
    }
  }
}
