import { AppFeature } from '@oryx-frontend/core';
import { Provider } from '@oryx-frontend/di';
import { provideIndexedDbEntities } from '@oryx-frontend/indexed-db';
import {
  SyncEntity,
  SyncSchedulerDefaultService,
  SyncSchedulerService,
} from '@oryx-frontend/offline/sync';
import { NetworkStateDefaultService, NetworkStateService } from './services';

export class OfflineFeature implements AppFeature {
  providers: Provider[] = this.getProviders();

  protected getProviders(): Provider[] {
    return [
      ...provideIndexedDbEntities([SyncEntity]),
      {
        provide: SyncSchedulerService,
        useClass: SyncSchedulerDefaultService,
      },
      {
        provide: NetworkStateService,
        useClass: NetworkStateDefaultService,
      },
    ];
  }
}
