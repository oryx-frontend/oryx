import {
  IndexedDbInstanceType,
  IndexedDbMigrationArgsType,
} from './db-instance.model';

export interface IndexedDbVersioned {
  version?: number;
  unset?: boolean;
  migration?: IndexedDbMigrationFn;
}

export type IndexedDbMigrationFn = (
  db: IndexedDbInstanceType,
  ...args: IndexedDbMigrationArgsType
) => void | Promise<void>;
