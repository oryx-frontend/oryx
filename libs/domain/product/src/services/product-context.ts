import {
  ContextFallback,
  ContextSerializer,
  ContextService,
  FieldContextSerializer,
} from '@oryx-frontend/core';
import { Provider, inject } from '@oryx-frontend/di';
import { RouteType, RouterService } from '@oryx-frontend/router';
import { featureVersion } from '@oryx-frontend/utilities';
import { Observable, map, of, take } from 'rxjs';
import { PRODUCT } from '../entity';
import { ProductQualifier } from '../models';

declare global {
  interface ContextValue {
    [ProductOldContext.SKU]?: ProductQualifier;
    [PRODUCT]?: ProductQualifier;
  }
}

/** @deprecated since 1.4, use PRODUCT instead */
enum ProductOldContext {
  /** @deprecated since 1.4, use PRODUCT instead */
  SKU = 'sku',
}
enum ProductNewContext {
  SKU = PRODUCT,
}

/** @deprecated since 1.4, use PRODUCT instead */
export const ProductContext =
  featureVersion >= '1.4' ? ProductNewContext : ProductOldContext;

export function productContextFallbackFactory(
  router = inject(RouterService),
  context = inject(ContextService)
): Observable<unknown> {
  return router.current().pipe(
    take(1),
    map((route) =>
      route.type === RouteType.Product ? route.params : undefined
    )
  );
}

export const ProductContextSerializerToken = `${ContextSerializer}${
  featureVersion >= '1.4' ? PRODUCT : ProductContext.SKU
}`;

/** @deprecated since 1.4, use FieldContextSerializer instead */
export class ProductContextSerializer
  implements ContextSerializer<ProductQualifier>
{
  serialize(value: ProductQualifier): Observable<string> {
    return value?.sku ? of(value.sku) : of('');
  }

  deserialize(value: string): Observable<ProductQualifier | undefined> {
    return value
      ? of({
          sku: value,
        })
      : of(undefined);
  }
}

/** @deprecated since 1.3, use productContextProviders instead */
export const ProductContextFallback: Provider = {
  provide: `${ContextFallback}${
    featureVersion >= '1.4' ? PRODUCT : ProductContext.SKU
  }`,
  useFactory: productContextFallbackFactory,
};

export const productContextProviders: Provider[] =
  featureVersion >= '1.4'
    ? [
        {
          provide: `${ContextFallback}${PRODUCT}`,
          useFactory: productContextFallbackFactory,
        },
        {
          provide: ProductContextSerializerToken,
          useFactory: () => new FieldContextSerializer('sku'),
        },
      ]
    : featureVersion >= '1.3'
    ? [
        {
          provide: `${ContextFallback}${ProductContext.SKU}`,
          useFactory: productContextFallbackFactory,
        },
        {
          provide: ProductContextSerializerToken,
          useClass: ProductContextSerializer,
        },
      ]
    : [ProductContextFallback];
