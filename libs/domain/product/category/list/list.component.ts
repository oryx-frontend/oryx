import { resolve } from '@oryx-frontend/di';
import { ContentMixin, LayoutMixin } from '@oryx-frontend/experience';
import { ProductCategoryService } from '@oryx-frontend/product';
import { computed, hydrate } from '@oryx-frontend/utilities';
import { LitElement, TemplateResult, html } from 'lit';
import { property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import {
  ProductCategoryListAttributes,
  ProductCategoryListOptions,
} from './list.model';

@hydrate()
export class ProductCategoryListComponent
  extends LayoutMixin(ContentMixin<ProductCategoryListOptions>(LitElement))
  implements ProductCategoryListAttributes
{
  @property() categoryId?: string;

  protected productCategoryService = resolve(ProductCategoryService);

  protected $list = computed(() => {
    const { id, exclude } = this.$options();
    return this.productCategoryService.getList({
      parent: id || this.categoryId,
      exclude,
    });
  });

  protected override render(): TemplateResult {
    return this.renderLayout({
      template: html`
        ${repeat(
          this.$list() ?? [],
          (category) => category.id,
          (category) => this.renderItem(category.id)
        )}
      `,
    });
  }

  protected renderItem(id: string): TemplateResult {
    return html`<oryx-content-link
      .options=${{ id, type: 'category' }}
    ></oryx-content-link>`;
  }
}
