import { HttpService, TransformerService } from '@oryx-frontend/core';
import { INJECTOR, inject } from '@oryx-frontend/di';
import { LocaleService } from '@oryx-frontend/i18n';
import {
  Observable,
  combineLatest,
  forkJoin,
  from,
  map,
  of,
  reduce,
  switchMap,
} from 'rxjs';
import { Content, ContentMeta, ContentQualifier } from '../../../models';
import { ContentAdapter } from '../../adapter';
import { StoryblokFieldNormalizer } from './normalizers';
import { StoryblokCmsModel } from './storyblok.api.model';
import { StoryblokSpace, StoryblokToken } from './storyblok.model';

export interface StoryblokEntry {
  fields: StoryblokCmsModel.StoryContent;
  _meta: ContentMeta;
}

export class DefaultStoryblokContentAdapter implements ContentAdapter {
  protected token = inject(StoryblokToken);
  protected space = inject(StoryblokSpace);
  protected http = inject(HttpService);
  protected transformer = inject(TransformerService);
  protected locale = inject(LocaleService);
  protected injector = inject(INJECTOR);
  protected url = `https://mapi.storyblok.com/v1/spaces/${this.space}`;
  protected readonlyUrl = `https://api.storyblok.com/v2/cdn/stories/`;
  protected isPreview = false;
  /**
   * @deprecated Since version 1.1. Will be removed.
   */
  getKey(qualifier: ContentQualifier): string {
    return qualifier.id ?? qualifier.query ?? '';
  }

  get(qualifier: ContentQualifier): Observable<Content | null> {
    return combineLatest([
      this.search<StoryblokCmsModel.EntryResponse>(
        qualifier.type
          ? `${qualifier.type}/${qualifier.id}?`
          : `${qualifier.id}?`
      ),
      this.getSpaceData<StoryblokCmsModel.ComponentResponse>(
        `/components/${qualifier.type}`
      ),
    ]).pipe(
      switchMap(([{ story }, { component }]) =>
        this.parseEntry(
          {
            fields: story.content,
            _meta: {
              type: story.content.component ?? qualifier.type,
              id: String(story.id),
              name: story.name,
            },
          },
          component.schema
        )
      )
    );
  }

  getAll(qualifier: ContentQualifier): Observable<Content[] | null> {
    let endpoint = '?';

    if (qualifier.query) endpoint += `&search_term=${qualifier.query}`;
    if (qualifier.type) endpoint += `&by_slugs=${qualifier.type}/*`;
    if (qualifier.tags)
      endpoint += `&with_tag=${
        Array.isArray(qualifier.tags)
          ? qualifier.tags.join(',')
          : qualifier.tags
      }`;

    return this.search<StoryblokCmsModel.EntriesResponse>(endpoint).pipe(
      switchMap((stories) => {
        const entities: StoryblokEntry[] = [];
        const types$: Record<string, Observable<StoryblokCmsModel.Schema>> = {};

        for (const entry of stories.stories) {
          entities.push({
            fields: entry.content,
            _meta: {
              id: String(entry.id),
              type: entry.content.component,
              name: entry.name,
            },
          });

          types$[entry.content.component] ??=
            this.getSpaceData<StoryblokCmsModel.ComponentResponse>(
              `/components/${entry.content.component}`
            ).pipe(map((data) => data.component.schema));
        }

        return combineLatest([
          of(entities),
          stories.stories.length
            ? forkJoin(types$)
            : of({} as Record<string, StoryblokCmsModel.Schema>),
        ]);
      }),
      switchMap(([entities, types]) => {
        return from(entities).pipe(
          switchMap((entry) =>
            this.parseEntry(entry, types[entry.fields.component])
          ),
          reduce((a, c) => [...a, c], [] as Content[])
        );
      })
    );
  }

  protected parseEntry(
    entry: StoryblokEntry,
    types: StoryblokCmsModel.Schema
  ): Observable<Content> {
    return combineLatest([
      this.parseEntryFields(entry.fields, types),
      of(entry),
    ]).pipe(
      map(([fields, data]) => ({ _meta: data._meta, ...fields } as Content))
    );
  }

  protected parseEntryFields(
    content: StoryblokCmsModel.StoryContent,
    types: Record<string, StoryblokCmsModel.Field>
  ): Observable<Record<string, unknown>> {
    return combineLatest(
      Object.entries(types).map(([key, data]) => {
        const { type } = data;
        const value = content?.[key];
        const field = { key, value, type };

        return this.transformer.transform(field, StoryblokFieldNormalizer);
      })
    ).pipe(
      map((fields) =>
        fields.reduce((acc, { key, value }) => ({ ...acc, [key]: value }), {})
      )
    );
  }

  protected search<T>(endpoint: string): Observable<T> {
    const preview = this.isPreview ? 'draft' : 'published';

    return combineLatest([this.locale.get(), this.getSpaceData()]).pipe(
      switchMap(([locale, { space }]) =>
        this.http.get<T>(
          `${this.readonlyUrl}${endpoint}&version=${preview}&token=${space.first_token}&language=${locale}`
        )
      )
    );
  }

  protected getSpaceData<T = StoryblokCmsModel.SpaceResponse>(
    endpoint = ''
  ): Observable<T> {
    return this.http.get<T>(`${this.url}${endpoint}`, {
      headers: { Authorization: this.token },
    });
  }
}
