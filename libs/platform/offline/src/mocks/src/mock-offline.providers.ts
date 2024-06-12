import { Provider } from '@oryx-frontend/di';
import { SyncSchedulerService } from '@oryx-frontend/offline/sync';
import { MockSyncSchedulerService } from './mock-sync-scheduler-service';

export const mockOfflineProviders: Provider[] = [
  {
    provide: SyncSchedulerService,
    useClass: MockSyncSchedulerService,
  },
];
