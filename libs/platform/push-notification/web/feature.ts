import { PushNotificationFeature } from '@oryx-frontend/push-notification';
import { webPushProviders } from './web-push.providers';

export class WebPushNotificationFeature extends PushNotificationFeature {
  constructor() {
    super();
    this.providers = [...this.providers, ...webPushProviders];
  }
}
