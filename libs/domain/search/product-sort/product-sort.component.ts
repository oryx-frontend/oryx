import { resolve } from '@oryx-frontend/di';
import { RouterService } from '@oryx-frontend/router';
import { SortingService } from '@oryx-frontend/search';
import {
  computed,
  hydrate,
  I18nMixin,
  signal,
  signalAware,
} from '@oryx-frontend/utilities';
import { html, LitElement, TemplateResult } from 'lit';
import { when } from 'lit/directives/when.js';
import { tap } from 'rxjs/operators';

@hydrate({ event: ['mouseover', 'focus'] })
@signalAware()
export class SearchProductSortComponent extends I18nMixin(LitElement) {
  protected routerService = resolve(RouterService);
  protected sortingService = resolve(SortingService);

  protected sortingOptions = signal(this.sortingService.get());
  protected hasOptions = computed(
    () => !!this.sortingOptions()?.sortValues?.length
  );

  protected querySortValue = signal(this.routerService.currentQuery());

  protected override render(): TemplateResult {
    return html`
      <oryx-select>
        <select
          @change=${this.sortingNavigation}
          aria-label="${this.i18n('oryx.search.select-sorting')}"
        >
          <option value="" hidden>
            ${this.i18n('oryx.search.select-sort-parameter')}
          </option>

          ${when(this.hasOptions(), () =>
            this.sortingOptions()?.sortValues.map(
              ({ sortKey, sortName }) =>
                html`<option
                  value="${sortKey}"
                  ?selected="${this.querySortValue()?.sort === sortKey}"
                >
                  ${sortName}
                </option>`
            )
          )}
        </select>
      </oryx-select>
    `;
  }

  protected sortingNavigation(e: InputEvent): void {
    this.routerService
      .getUrl('', {
        queryParams: {
          sort: (e.target as HTMLSelectElement).value,
        },
        queryParamsHandling: 'merge',
        ignoreQueryParams: ['page'],
      })
      .pipe(tap((url) => this.routerService.navigate(url)))
      .subscribe();
  }
}
