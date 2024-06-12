import { ContentComponentSchema } from '@oryx-frontend/experience';
import { IconTypes } from '@oryx-frontend/ui/icon';
import { ProductRelationsComponent } from './relations.component';

export const relationsSchema: ContentComponentSchema<ProductRelationsComponent> =
  {
    name: 'Product Relations',
    group: 'Product',
    icon: IconTypes.ViewList,
  };
