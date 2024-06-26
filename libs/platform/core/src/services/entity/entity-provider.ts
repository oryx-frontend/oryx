import { Provider } from '@oryx-frontend/di';
import { Observable } from 'rxjs';

export const EntityProvider = 'oryx.EntityProvider*';

export interface ServiceEntityProvider<E = unknown, Q = unknown> {
  service: string;
  context?: string;
}

export interface CustomEntityProvider<E = unknown, Q = unknown> {
  service?: string;
  get: (service: unknown, qualifier?: Q) => Observable<E>;
  getList?: (service: unknown, qualifier?: Q) => Observable<E[]>;
  context?: string;
}

export type EntityProvider<E = unknown, Q = unknown> =
  | ServiceEntityProvider<E, Q>
  | CustomEntityProvider<E, Q>;

export function provideEntity<E = unknown, Q = unknown>(
  type: string,
  config: EntityProvider<E, Q>
): Provider {
  return {
    provide: `${EntityProvider}${type}`,
    useValue: config,
  };
}

export function isCustomEntityProvider<E, Q>(
  provider: EntityProvider<E, Q>
): provider is CustomEntityProvider<E, Q> {
  return 'get' in provider;
}

declare global {
  interface InjectionTokensContractMap {
    [EntityProvider]: EntityProvider;
  }
}
