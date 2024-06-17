import { ContentComponentSchema } from '@oryx-frontend/experience';
import { IconTypes } from '@oryx-frontend/ui/icon';
import { ProductCategoryListComponent } from './list.component';

export const productCategoryListSchema: ContentComponentSchema<ProductCategoryListComponent> =
  {
    name: 'Product Category List',
    group: 'Product',
    icon: IconTypes.ViewList,
    options: {},
  };
