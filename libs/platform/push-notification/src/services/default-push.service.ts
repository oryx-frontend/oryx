import { inject } from '@oryx-frontend/di';
import { Observable } from 'rxjs';
import { PushProvider } from './providers';
import { PushService } from './push.service';

export class DefaultPushService implements PushService {
  constructor(protected provider = inject(PushProvider)) {}

  init(): Observable<void> {
    return this.provider.init();
  }

  subscribe(): Observable<unknown> {
    return this.provider.getSubscription();
  }

  unsubscribe(): Observable<boolean> {
    return this.provider.deleteSubscription();
  }
}
