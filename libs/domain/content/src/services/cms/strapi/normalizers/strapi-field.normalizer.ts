import { Transformer } from '@oryx-frontend/core';
import { Provider } from '@oryx-frontend/di';
import { marked } from 'marked';

export interface StrapiContentField {
  type: string;
  key: string;
  value: unknown;
}

export const StrapiFieldNormalizer = 'oryx.StrapiFieldNormalizer*';

export function strapiFieldNormalizer(
  data: StrapiContentField
): StrapiContentField {
  if (data.type === 'text') {
    return {
      ...data,
      value: marked.parse(data.value as string),
    };
  }

  return data;
}

export const strapiFieldNormalizers: Provider[] = [
  {
    provide: StrapiFieldNormalizer,
    useValue: strapiFieldNormalizer,
  },
];

declare global {
  interface InjectionTokensContractMap {
    [StrapiFieldNormalizer]: Transformer<StrapiContentField>;
  }
}
