import { AppFeature, AppPlugin } from '@oryx-frontend/core';
import { Provider } from '@oryx-frontend/di';
import { provideIndexedDbEntities } from '@oryx-frontend/indexed-db';
import {
  SyncActionRegistryDefaultService,
  SyncActionRegistryService,
  SyncEntity,
  SyncExecutorDefaultService,
  SyncExecutorService,
  SyncSchedulerDefaultService,
  SyncSchedulerService,
} from '@oryx-frontend/offline/sync';
import { OfflineServiceWorkerPlugin } from './plugin';

export class OfflineServiceWorkerFeature implements AppFeature {
  providers: Provider[] = this.getProviders();
  plugins: AppPlugin[] = this.getPlugins();

  protected getProviders(): Provider[] {
    return [
      ...provideIndexedDbEntities([SyncEntity]),
      {
        provide: SyncSchedulerService,
        useClass: SyncSchedulerDefaultService,
      },
      {
        provide: SyncExecutorService,
        useClass: SyncExecutorDefaultService,
      },
      {
        provide: SyncActionRegistryService,
        useClass: SyncActionRegistryDefaultService,
      },
    ];
  }

  protected getPlugins(): AppPlugin[] {
    return [new OfflineServiceWorkerPlugin()];
  }
}
