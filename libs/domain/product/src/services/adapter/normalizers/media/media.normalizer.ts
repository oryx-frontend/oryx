import { Transformer } from '@oryx-frontend/core';
import { Size } from '@oryx-frontend/utilities';
import { ApiProductModel, ProductMedia } from '../../../../models';

export const ProductMediaNormalizer = 'oryx.ProductMediaNormalizer*';
export const DefaultProductMediaNormalizer = `${ProductMediaNormalizer}Default`;

export function mediaNormalizer(
  data?: ApiProductModel.Image | undefined
): ProductMedia {
  const sources: ProductMedia = {};
  if (data) {
    const { externalUrlSmall, externalUrlLarge } = data;

    if (externalUrlSmall) {
      sources[Size.Sm] = externalUrlSmall;
    }

    if (externalUrlLarge !== externalUrlSmall) {
      sources[Size.Lg] = externalUrlLarge;
    }
  }
  return sources;
}

declare global {
  interface InjectionTokensContractMap {
    [ProductMediaNormalizer]: Transformer<ProductMedia>[];
  }
}
