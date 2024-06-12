import { ContentComponentSchema } from '@oryx-frontend/experience';
import { OrderSummaryComponent } from './summary.component';

export const orderSummarySchema: ContentComponentSchema<OrderSummaryComponent> =
  {
    name: 'Order Summary',
    group: 'Order',
  };
