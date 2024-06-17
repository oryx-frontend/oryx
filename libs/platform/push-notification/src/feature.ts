import { AppFeature } from '@oryx-frontend/core';
import { pushNotificationProviders } from './services';

export class PushNotificationFeature implements AppFeature {
  providers = pushNotificationProviders;
}
