import { ContextService, DefaultContextService } from '@spryker-oryx/core';
import { siteProviders } from '@spryker-oryx/site';
import { delay, Observable, of } from 'rxjs';
import { ProductService } from '../services/product.service';
import { MockProductService } from './mock-product.service';

export const mockCartProviders = [
  {
    provide: 'FES.CartService',
    useValue: {
      addEntry: (): Observable<null> => of(null).pipe(delay(1000)),
    },
  },
];

export const semanticLinkProviders = [
  {
    provide: 'FES.SemanticLinkService',
    useValue: {
      get: (): Observable<string> =>
        of(window.parent?.location.href ?? window.location.href),
    },
  },
];

export const mockProductProviders = [
  {
    provide: ContextService,
    useClass: DefaultContextService,
  },
  {
    provide: ProductService,
    useClass: MockProductService,
  },
  ...siteProviders,
  ...semanticLinkProviders,
  ...mockCartProviders,
];
