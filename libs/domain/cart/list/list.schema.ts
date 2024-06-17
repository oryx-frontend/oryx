import { ContentComponentSchema } from '@oryx-frontend/experience';
import { IconTypes } from '@oryx-frontend/ui/icon';
import { CartListComponent } from './list.component';

export const cartListComponentSchema: ContentComponentSchema<CartListComponent> =
  {
    name: 'List',
    group: 'Cart',
    icon: IconTypes.List,
  };
