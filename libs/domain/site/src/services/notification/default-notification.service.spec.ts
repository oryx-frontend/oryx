import { createInjector, destroyInjector } from '@oryx-frontend/di';
import { AlertType } from '@oryx-frontend/ui';
import { NotificationPosition } from '@oryx-frontend/ui/notification-center';
import { DefaultNotificationService } from './default-notification.service';
import { NotificationService } from './notification.service';

const mockNotification = {
  type: AlertType.Info,
  content: 'mock title',
  subtext: 'content',
  position: NotificationPosition.BottomStart,
};

describe('DefaultNotificationService', () => {
  let service: DefaultNotificationService;

  beforeEach(() => {
    const testInjector = createInjector({
      providers: [
        {
          provide: NotificationService,
          useClass: DefaultNotificationService,
        },
      ],
    });

    service = testInjector.inject(
      NotificationService
    ) as DefaultNotificationService;
  });

  afterEach(() => {
    vi.clearAllMocks();
    destroyInjector();
  });

  it('should be provided', () => {
    expect(service).toBeInstanceOf(DefaultNotificationService);
  });

  describe('when pushing a notification', () => {
    beforeEach(() => {
      service.push(mockNotification);
    });

    it('should return the notification', () => {
      const callback = vi.fn();
      service.get().subscribe(callback);
      expect(callback).toHaveBeenCalledWith(mockNotification);
    });
  });
});
