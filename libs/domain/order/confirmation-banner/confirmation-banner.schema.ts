import { ContentComponentSchema } from '@oryx-frontend/experience';
import { OrderConfirmationBannerComponent } from './confirmation-banner.component';

export const orderConfirmationBannerSchema: ContentComponentSchema<OrderConfirmationBannerComponent> =
  {
    name: 'Order Confirmation Banner',
    group: 'Order',
  };
