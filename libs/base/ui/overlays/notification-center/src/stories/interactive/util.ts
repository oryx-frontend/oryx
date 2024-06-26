import { NotificationComponent } from '@oryx-frontend/ui/notification';
import { Notification } from '../../../../notification';
import { NotificationCenterComponent, NotificationService } from '../../index';
import { generateNotification } from '../util';

export const open = (strategy: Notification = {}): void =>
  new NotificationService().getCenter().open(generateNotification(strategy));
export const getNotification = (
  center: NotificationCenterComponent,
  index = 0
): NotificationComponent | null => {
  return (center.renderRoot.children[index] as NotificationComponent) ?? null;
};
