import { QueryState } from '@oryx-frontend/core';
import { Observable } from 'rxjs';
import { Suggestion, SuggestionQualifier } from '../../models';

export interface SuggestionService {
  get(qualifier: SuggestionQualifier): Observable<Suggestion | undefined>;
  getState(qualifier: SuggestionQualifier): Observable<QueryState<Suggestion>>;
}

export const SuggestionService = 'oryx.SuggestionService';

declare global {
  interface InjectionTokensContractMap {
    [SuggestionService]: SuggestionService;
  }
}
