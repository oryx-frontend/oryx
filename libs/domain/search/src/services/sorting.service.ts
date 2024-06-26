import { ProductListSort } from '@oryx-frontend/product';
import { Observable } from 'rxjs';

export interface SortingService {
  get(): Observable<ProductListSort | null>;
}

export const SortingService = 'oryx.SortingService';

declare global {
  interface InjectionTokensContractMap {
    [SortingService]: SortingService;
  }
}
