import {
  ContextController,
  EntityContext,
  EntityService,
} from '@oryx-frontend/core';
import { resolve } from '@oryx-frontend/di';
import { ContentMixin, LayoutMixin } from '@oryx-frontend/experience';
import {
  computed,
  elementEffect,
  hydrate,
  signalAware,
} from '@oryx-frontend/utilities';
import { LitElement, TemplateResult, html } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { of } from 'rxjs';
import { DataListOptions } from './data-list.model';

@hydrate()
@signalAware()
export class DataListComponent extends LayoutMixin(
  ContentMixin<DataListOptions>(LitElement)
) {
  protected contextController: ContextController = new ContextController(this);

  @elementEffect()
  protected setContext = (): void => {
    this.contextController.provide(EntityContext, this.$options().entity);
  };

  protected entityService = resolve(EntityService);

  protected $list = computed(() =>
    this.$options().entity
      ? this.entityService.getListQualifiers({ type: this.$options().entity })
      : of([]).pipe()
  );

  protected override render(): TemplateResult | void {
    const list = this.$list();

    if (!list?.length) return;

    return this.renderLayout({
      template: html`${repeat(
        list,
        (item) =>
          html`<oryx-data-wrapper
            .options=${{ link: this.$options().link }}
            .qualifier=${item}
          >
            <oryx-composition .uid=${this.uid}></oryx-composition>
          </oryx-data-wrapper>`
      )}`,
    });
  }
}
