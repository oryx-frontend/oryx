import { createQuery, QueryState } from '@oryx-frontend/core';
import { inject, INJECTOR } from '@oryx-frontend/di';
import { LocaleChanged } from '@oryx-frontend/i18n';
import {
  catchError,
  combineLatest,
  map,
  merge,
  Observable,
  of,
  scan,
  skip,
  startWith,
} from 'rxjs';
import { Content, ContentQualifier } from '../models';
import { ContentAdapter, ContentConfig } from './adapter/content.adapter';
import { ContentService } from './content.service';

export class DefaultContentService implements ContentService {
  protected contents: Record<string, string[]> = {};

  constructor(
    protected adapters = inject(ContentAdapter, [] as ContentAdapter[]),
    protected config = inject(ContentConfig, [] as ContentConfig[]),
    protected injector = inject(INJECTOR)
  ) {
    this.normalizeConfig();
  }

  protected contentQuery = createQuery<Content | null, ContentQualifier>({
    loader: (q: ContentQualifier) => {
      const adapters = this.getAdapters(q);
      return adapters.length
        ? merge(
            ...adapters.map((adapter) =>
              adapter.get(q).pipe(catchError(() => of(null)))
            )
          ).pipe(
            scan<Content | null, Content | null>(
              (acc, curr) => (curr ? { ...(acc ?? {}), ...curr } : acc),
              null
            )
          )
        : of(null);
    },
    refreshOn: [LocaleChanged],
  });

  protected contentsQuery = createQuery<Content[] | null, ContentQualifier>({
    loader: (q: ContentQualifier) => {
      const adapters = this.getAdapters(q);
      return adapters.length
        ? combineLatest(
            adapters.map((adapter) =>
              adapter.getAll(q).pipe(
                startWith(null),
                catchError(() => of(null))
              )
            )
          ).pipe(
            skip(1),
            map((data) =>
              data.flat()?.reduce((acc, curr) => {
                if (!curr) return acc;

                acc ??= [];

                const index = acc?.findIndex(
                  (content) => content.id === curr.id
                );

                if (index !== -1) {
                  acc?.splice(index, 1, curr);
                } else {
                  acc?.push(curr);
                }

                return acc;
              }, null as Content[] | null)
            )
          )
        : of(null);
    },
    refreshOn: [LocaleChanged],
  });

  getAll<T>(
    qualifier: ContentQualifier
  ): Observable<Content<T>[] | null | undefined>;
  getAll<T = Record<string, unknown>>(
    qualifier: ContentQualifier
  ): Observable<Content<T>[] | null | undefined>;
  getAll(
    qualifier: ContentQualifier
  ): Observable<Content[] | null | undefined> {
    return this.contentsQuery.get({ ...qualifier });
  }

  get<T>(
    qualifier: ContentQualifier
  ): Observable<Content<T> | null | undefined>;
  get<T = Record<string, unknown>>(
    qualifier: ContentQualifier
  ): Observable<Content<T> | null | undefined>;
  get(qualifier: ContentQualifier): Observable<Content | null | undefined> {
    return this.contentQuery.get({ ...qualifier });
  }

  /**
   * @deprecated Since version 1.1. Will be removed.
   */
  getState(
    qualifier: ContentQualifier
  ): Observable<QueryState<Content | null>> {
    return this.contentQuery.getState({ ...qualifier });
  }

  protected normalizeConfig(): void {
    this.contents = this.config.reduce(
      (config, data) => ({
        ...config,
        ...Object.entries(data).reduce(
          (acc, [key, value]) => ({
            ...acc,
            [key]: config[key] ? [...config[key], ...value.types] : value.types,
          }),
          {}
        ),
      }),
      {} as Record<string, string[]>
    );
  }

  protected getAdapters(qualifier: ContentQualifier): ContentAdapter[] {
    if (!qualifier.entities || !this.config.length) return this.adapters;

    return qualifier.entities.reduce((adapters: ContentAdapter[], entity) => {
      for (const [key, data] of Object.entries(this.contents)) {
        const isAdapter = data.includes(entity);

        if (!isAdapter) {
          continue;
        }

        const adapter = this.injector.inject<ContentAdapter | null>(
          `${ContentAdapter}${key}`,
          null
        );

        if (adapter && !adapters.includes(adapter)) {
          adapters.push(adapter);
        }
      }

      return adapters;
    }, []);
  }
}
