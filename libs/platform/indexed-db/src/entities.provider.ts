import { Provider } from '@oryx-frontend/di';
import { IndexedDbEntityType } from './models';

export type IndexedDbEntities = IndexedDbEntityType[];

export const IndexedDbEntities = 'oryx.IndexedDbEntitiesProvider*';

declare global {
  interface InjectionTokensContractMap {
    [IndexedDbEntities]: IndexedDbEntities;
  }
}

export function provideIndexedDbEntities(
  entityTypes?: IndexedDbEntities
): Provider<typeof IndexedDbEntities>[] {
  if (!entityTypes) {
    return [];
  }

  return [{ provide: IndexedDbEntities, useValue: entityTypes }];
}
