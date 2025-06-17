import { Observable } from 'rxjs';
import {
  IndexedDbEntityType,
  IndexedDbInstanceType,
  InferIndexedDbStore,
} from '../models';

export interface IndexedDbService<TdbInstance = IndexedDbInstanceType> {
  registerEntities(entityTypes: IndexedDbEntityType[]): Observable<void>;
  getDb(): Observable<TdbInstance>;
  getStoreName(entityType: IndexedDbEntityType): string;
  getStore<TEntity extends IndexedDbEntityType>(
    entityType: TEntity
  ): Observable<InferIndexedDbStore<TEntity>>;
}

export const IndexedDbService = 'oryx.IndexedDbService';

declare global {
  export interface InjectionTokensContractMap {
    [IndexedDbService]: IndexedDbService;
  }
}
