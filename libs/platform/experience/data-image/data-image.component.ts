import { EntityService } from '@oryx-frontend/core';
import { resolve } from '@oryx-frontend/di';
import { ContentAsset, ContentMixin } from '@oryx-frontend/experience';
import { computed, hydrate } from '@oryx-frontend/utilities';
import { LitElement, TemplateResult } from 'lit';
import { html } from 'lit/static-html.js';
import { catchError, of } from 'rxjs';
import { DataImageComponentOptions } from './data-image.model';

@hydrate()
export class DataImageComponent extends ContentMixin<DataImageComponentOptions>(
  LitElement
) {
  protected entityService = resolve(EntityService);

  protected $data = computed<string | ContentAsset | undefined>(() => {
    const { entity: type, field } = this.$options();
    return this.entityService
      .getField<string>({ element: this, type, field })
      .pipe(catchError(() => of()));
  });

  protected override render(): TemplateResult | void {
    const image = this.$data();

    if (!image && !this.$options().renderFallback) return;

    return html`<oryx-image
      .src=${(image as ContentAsset)?.src ?? image}
      .alt=${(image as ContentAsset)?.alt}
    ></oryx-image>`;
  }
}
