import { ContentService } from '@oryx-frontend/content';
import { EntityService } from '@oryx-frontend/core';
import { resolve } from '@oryx-frontend/di';
import { ContentMixin, LayoutMixin } from '@oryx-frontend/experience';
import {
  computed,
  hydrate,
  signalAware,
  signalProperty,
} from '@oryx-frontend/utilities';
import { LitElement, TemplateResult, html } from 'lit';
import { of } from 'rxjs';
import { ContentListOptions } from './list.model';

@signalAware()
@hydrate()
export class ContentListComponent extends LayoutMixin(
  ContentMixin<ContentListOptions>(LitElement)
) {
  @signalProperty({ reflect: true }) type?: string;
  @signalProperty({ reflect: true }) query?: string;
  @signalProperty({ reflect: true }) tags?: string;
  @signalProperty({ reflect: true }) context?: string;
  @signalProperty({ reflect: true }) field?: string;
  @signalProperty({ reflect: true }) behavior?: 'type' | 'query' | 'tags';

  protected contentService = resolve(ContentService);
  protected entityService = resolve(EntityService);

  protected $contextField = computed(() => {
    const options = this.$options();
    const type = this.context ?? options?.context;
    const field = this.field ?? options?.field;

    return type && field
      ? this.entityService.getField({ type, field })
      : of(null);
  });

  protected $data = computed(() => {
    const options = this.$options();
    const context = this.context ?? options?.context;
    const data = {
      type: this.type,
      query: this.query,
      tags: this.tags,
      ...options,
    };
    const behavior = this.behavior ?? options?.behavior ?? 'tags';
    const field = this.$contextField();
    const qualifier = {
      ...(data.type ? { type: data.type, entities: [data.type] } : {}),
      ...(data.query ? { query: data.query } : {}),
      ...(data.tags ? { tags: data.tags } : {}),
      ...(context && field
        ? {
            [behavior]: field,
            ...(behavior === 'type' ? { entities: [field as string] } : {}),
          }
        : {}),
    };

    return Object.keys(qualifier).length
      ? this.contentService.getAll(qualifier)
      : of(null);
  });

  protected override render(): TemplateResult | void {
    const data = this.$data();

    if (!data?.length) {
      return;
    }

    return this.renderLayout({
      template: html`${data.map(
        ({ _meta: { type, name }, id, heading }) => html`
          <oryx-content-link
            .options=${{ type, id }}
            .content=${{ text: heading ?? name }}
          ></oryx-content-link>
        `
      )}`,
    });
  }
}
