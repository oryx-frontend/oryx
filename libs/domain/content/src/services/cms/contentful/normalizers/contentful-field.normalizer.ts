import { Transformer } from '@oryx-frontend/core';
import { Provider } from '@oryx-frontend/di';
import { ContentAsset } from '@oryx-frontend/experience';
import { marked } from 'marked';
import { ContentfulCmsModel } from '../contentful.api.model';

export interface ContentfulContentField {
  type: string;
  key: string;
  value: unknown;
  assets?: Record<string, ContentAsset>;
}

export const ContentfulFieldNormalizer = 'oryx.ContentfulFieldNormalizer*';

export function contentfulFieldNormalizer(
  data: ContentfulContentField
): ContentfulContentField {
  if (data.type === 'Text') {
    return {
      ...data,
      value: marked.parse(data.value as string),
    };
  }

  if (isAsset(data.type, data.value)) {
    return {
      ...data,
      value: data.assets?.[data.value.sys.id],
    };
  }

  return data;
}

const isAsset = (
  type: string,
  value: unknown
): value is ContentfulCmsModel.LinkAsset => {
  return (
    type === 'Link' &&
    (value as ContentfulCmsModel.LinkAsset).sys.linkType === 'Asset'
  );
};

export const contentfulFieldNormalizers: Provider[] = [
  {
    provide: ContentfulFieldNormalizer,
    useValue: contentfulFieldNormalizer,
  },
];

declare global {
  interface InjectionTokensContractMap {
    [ContentfulFieldNormalizer]: Transformer<ContentfulContentField>;
  }
}
