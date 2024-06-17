import { ContentComponentSchema } from '@oryx-frontend/experience';
import { IconTypes } from '@oryx-frontend/ui/icon';
import { CartTotalsComponent } from './totals.component';

export const cartTotalsComponentSchema: ContentComponentSchema<CartTotalsComponent> =
  {
    name: 'Cart totals',
    group: 'Cart',
    icon: IconTypes.BulletList,
    composition: true,
  };
