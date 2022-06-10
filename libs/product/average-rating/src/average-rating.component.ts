import { hydratable } from '@spryker-oryx/core';
import {
  ContentComponentProperties,
  ContentController,
} from '@spryker-oryx/experience';
import { asyncValue } from '@spryker-oryx/lit-rxjs';
import {
  ProductComponentProperties,
  ProductController,
} from '@spryker-oryx/product';
import { LitElement, TemplateResult } from 'lit';
import { html } from 'lit-html';
import { property } from 'lit/decorators.js';
import { combineLatest, map } from 'rxjs';
import { AverageRatingModel } from './average-rating.model';

@hydratable()
export class AverageRatingComponent
  extends LitElement
  implements
    ProductComponentProperties,
    ContentComponentProperties<AverageRatingModel>
{
  @property() sku?: string;
  @property() uid?: string;
  @property({ type: Object }) content?: AverageRatingModel;

  protected product$ = new ProductController(this).product$;
  protected content$ = new ContentController<AverageRatingModel>(this).content$;

  protected rating$ = combineLatest([this.product$, this.content$]).pipe(
    map(([product, contents]) => {
      const reviewCountValue = contents?.hideReviewCount
        ? product?.reviewCount
        : undefined;
      return {
        rating: product?.averageRating,
        reviewCount: reviewCountValue,
      };
    })
  );

  protected override render(): TemplateResult {
    return html`
      ${asyncValue(this.rating$, ({ rating, reviewCount }) => {
        return html`
          <oryx-rating
            readonly
            .value=${Number(rating)}
            .reviewCount=${reviewCount}
          ></oryx-rating>
        `;
      })}
    `;
  }
}