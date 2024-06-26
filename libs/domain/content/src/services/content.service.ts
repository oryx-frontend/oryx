import { QueryState } from '@oryx-frontend/core';
import { Observable } from 'rxjs';
import { Content, ContentQualifier } from '../models';

export interface ContentService {
  get<T>(
    qualifier: ContentQualifier
  ): Observable<Content<T> | null | undefined>;
  get<T = Record<string, unknown>>(
    qualifier: ContentQualifier
  ): Observable<Content<T> | null | undefined>;
  get(qualifier: ContentQualifier): Observable<Content | null | undefined>;

  getAll<T>(
    qualifier: ContentQualifier
  ): Observable<Content<T>[] | null | undefined>;
  getAll<T = Record<string, unknown>>(
    qualifier: ContentQualifier
  ): Observable<Content<T>[] | null | undefined>;
  getAll(qualifier: ContentQualifier): Observable<Content[] | null | undefined>;

  /**
   * @deprecated Since version 1.1. Will be removed.
   */
  getState(qualifier: ContentQualifier): Observable<QueryState<Content | null>>;
}

export const ContentService = 'oryx.ContentService';

declare global {
  interface InjectionTokensContractMap {
    [ContentService]: ContentService;
  }
}
