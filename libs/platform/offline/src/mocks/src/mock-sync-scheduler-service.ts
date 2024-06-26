import { SyncSchedulerService } from '@oryx-frontend/offline/sync';
import { Observable, of } from 'rxjs';

export class MockSyncSchedulerService implements Partial<SyncSchedulerService> {
  hasPending(): Observable<boolean> {
    return of(true);
  }
}
