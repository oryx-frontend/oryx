import { Provider } from '@oryx-frontend/di';
import { DefaultPushService } from './default-push.service';
import { PushService } from './push.service';

export const pushNotificationProviders: Provider[] = [
  {
    provide: PushService,
    useClass: DefaultPushService,
  },
];
