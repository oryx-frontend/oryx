import { Provider } from '@oryx-frontend/di';
import { PushProvider } from '@oryx-frontend/push-notification';
import { WebPushProvider } from './web-push';

export const webPushProviders: Provider[] = [
  {
    provide: PushProvider,
    useClass: WebPushProvider,
  },
];
