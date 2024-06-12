import { ContentComponentSchema } from '@oryx-frontend/experience';
import { IconTypes } from '@oryx-frontend/ui/icon';
import { OrderTotalsComponent } from './totals.component';

export const orderTotalsComponentSchema: ContentComponentSchema<OrderTotalsComponent> =
  {
    name: 'Order totals',
    group: 'Order',
    icon: IconTypes.BulletList,
  };
