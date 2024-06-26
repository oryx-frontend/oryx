import { inject } from '@oryx-frontend/di';
import {
  catchMessage,
  ExperienceDataRevealer,
  MessageType,
  postMessage,
} from '@oryx-frontend/experience';
import { Observable, of, switchMap, tap } from 'rxjs';
import { Suggestion } from '../../models';
import { SuggestionField } from '../adapter';
import { SuggestionService } from '../suggestion';

/**
 * @deprecated since 1.1 use SuggestionExperienceDataRevealer instead.
 */
export class ProductsExperienceDataRevealer implements ExperienceDataRevealer {
  constructor(protected suggestionService = inject(SuggestionService, null)) {}

  protected products$ = catchMessage(MessageType.Query).pipe(
    switchMap(
      (query) =>
        this.suggestionService?.get({
          query,
          entities: [SuggestionField.Products],
        }) ?? of(undefined)
    ),
    tap((suggestions?: Suggestion) => {
      postMessage({
        type: MessageType.Products,
        data: (suggestions?.products ?? []).map(({ name, sku }) => ({
          name,
          sku,
        })),
      });
    })
  );

  reveal(): Observable<unknown> {
    return this.products$;
  }
}
