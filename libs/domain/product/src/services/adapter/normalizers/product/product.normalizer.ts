import { Transformer, TransformerService } from '@oryx-frontend/core';
import { camelize } from '@oryx-frontend/core/utilities';
import { Provider } from '@oryx-frontend/di';
import { Observable, map, of } from 'rxjs';
import { ApiProductModel, Product } from '../../../../models';
import { CategoryNormalizer } from '../../../category';
import { AvailabilityNormalizer } from '../availability';
import { CategoryIdNormalizer } from '../category-id';
import { ProductLabelsNormalizer } from '../labels/labels.normalizer';
import { ProductMediaSetNormalizer } from '../media';
import { PriceNormalizer } from '../price';
import { DeserializedProduct } from './model';

export const ProductNormalizer = 'oryx.ProductNormalizer*';

export function productAttributeNormalizer(
  data: DeserializedProduct
): Partial<Product> {
  const {
    sku,
    name,
    description,
    averageRating,
    reviewCount,
    attributes,
    attributeNames,
  } = data;

  return {
    sku,
    name,
    description,
    averageRating: averageRating ? Number(averageRating) : 0,
    reviewCount,
    attributes,
    attributeNames,
  };
}

export function productPriceNormalizer(
  data: DeserializedProduct,
  transformer: TransformerService
): Observable<Partial<Product>> {
  const priceKey = camelize(ApiProductModel.Includes.ConcreteProductPrices);
  const { [priceKey]: price } = data;

  return transformer
    .transform(price?.[0], PriceNormalizer)
    .pipe(map((price) => ({ price })));
}

export function productLabelsNormalizer(
  data: DeserializedProduct,
  transformer: TransformerService
): Observable<Partial<Product>> {
  const labelsKey = camelize(ApiProductModel.Includes.Labels);
  const { [labelsKey]: labels } = data;

  return transformer
    .transform(labels, ProductLabelsNormalizer)
    .pipe(map((labels) => ({ labels })));
}

export function productMediaSetNormalizer(
  data: DeserializedProduct,
  transformer: TransformerService
): Observable<Partial<Product>> {
  const imageKey = camelize(ApiProductModel.Includes.ConcreteProductImageSets);
  const { [imageKey]: images } = data;
  return transformer
    .transform(images?.[0].imageSets, ProductMediaSetNormalizer)
    .pipe(map((sets) => ({ mediaSet: sets })));
}

export function productAvailabilityNormalizer(
  data: DeserializedProduct,
  transformer: TransformerService
): Observable<Partial<Product>> {
  const stockKey = camelize(
    ApiProductModel.Includes.ConcreteProductAvailabilities
  );
  const { [stockKey]: availability } = data;
  return transformer
    .transform(availability?.[0], AvailabilityNormalizer)
    .pipe(map((availability) => ({ availability })));
}

export function productDiscontinuedNormalizer(
  data: DeserializedProduct,
  transformer: TransformerService
): Observable<Partial<Product>> {
  return of({
    discontinued: data.isDiscontinued,
    discontinuedNote: data.discontinuedNote,
  } as Product);
}

export function productNodeNormalizer(
  data: DeserializedProduct,
  transformer: TransformerService
): Observable<Partial<Product>> {
  const abstractKey = camelize(ApiProductModel.Includes.AbstractProducts);
  const nodeKey = camelize(ApiProductModel.Includes.CategoryNodes);
  const { [abstractKey]: abstract } = data;

  if (!abstract?.length) {
    return of({});
  }

  const { [nodeKey]: node } = abstract[0];

  return transformer.transform(node, CategoryIdNormalizer);
}

export function productCategoryNormalizer(
  data: DeserializedProduct,
  transformer: TransformerService
): Observable<Partial<Product>> {
  const abstractKey = camelize(ApiProductModel.Includes.AbstractProducts);
  const nodeKey = camelize(ApiProductModel.Includes.CategoryNodes);
  const { [abstractKey]: abstract } = data;

  if (!abstract?.length) {
    return of({});
  }

  const { [nodeKey]: node } = abstract[0];

  return transformer.transform(node, CategoryNormalizer);
}

export const productNormalizer: Provider[] = [
  {
    provide: ProductNormalizer,
    useValue: productAttributeNormalizer,
  },
  {
    provide: ProductNormalizer,
    useValue: productPriceNormalizer,
  },
  {
    provide: ProductNormalizer,
    useValue: productMediaSetNormalizer,
  },
  {
    provide: ProductNormalizer,
    useValue: productLabelsNormalizer,
  },
  {
    provide: ProductNormalizer,
    useValue: productAvailabilityNormalizer,
  },
  {
    provide: ProductNormalizer,
    useValue: productDiscontinuedNormalizer,
  },
  {
    provide: ProductNormalizer,
    useValue: productNodeNormalizer,
  },
  {
    provide: ProductNormalizer,
    useValue: productCategoryNormalizer,
  },
];

declare global {
  interface InjectionTokensContractMap {
    [ProductNormalizer]: Transformer<Product>[];
  }
}
