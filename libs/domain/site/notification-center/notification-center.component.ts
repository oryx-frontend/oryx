import { resolve } from '@oryx-frontend/di';
import { ContentMixin, defaultOptions } from '@oryx-frontend/experience';
import { NotificationService } from '@oryx-frontend/site';
import {
  NotificationCenterComponent,
  NotificationPosition,
} from '@oryx-frontend/ui/notification-center';
import { elementEffect, hydrate, signal } from '@oryx-frontend/utilities';
import { html, LitElement, TemplateResult } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import { SiteNotificationCenterOptions } from './notification-center.model';

@defaultOptions({
  position: NotificationPosition.BottomStart,
  enableStacking: true,
  autoCloseTime: 8,
})
@hydrate({ event: 'window:oryx-notify' })
export class SiteNotificationCenterComponent extends ContentMixin<SiteNotificationCenterOptions>(
  LitElement
) {
  protected siteNotificationService = resolve(NotificationService);
  protected centerRef = createRef<NotificationCenterComponent>();

  protected $notification = signal(this.siteNotificationService.get(), {
    equal: () => false,
  });

  @elementEffect()
  protected notification$ = async (): Promise<void> => {
    const notification = this.$notification();

    if (!notification || Object.keys(notification).length === 0) return;
    if (!(this.centerRef.value && 'open' in this.centerRef.value)) {
      await customElements.whenDefined('oryx-notification-center');
    }
    const autoCloseTime = this.$options().autoCloseTime;
    if (autoCloseTime) {
      notification.autoCloseTime ??= autoCloseTime * 1000;
    }

    this.centerRef.value?.open(notification);
  };

  protected override render(): TemplateResult {
    const { position, enableStacking } = this.$options();

    return html`<oryx-notification-center
      .position=${position}
      ${ref(this.centerRef)}
      ?stackable=${enableStacking}
    ></oryx-notification-center>`;
  }
}
