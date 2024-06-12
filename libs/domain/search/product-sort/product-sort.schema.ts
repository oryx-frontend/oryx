import { ContentComponentSchema } from '@oryx-frontend/experience';
import { IconTypes } from '@oryx-frontend/ui/icon';
import { SearchProductSortComponent } from './product-sort.component';

export const searchProductSortSchema: ContentComponentSchema<SearchProductSortComponent> =
  {
    name: 'Product List Sort',
    group: 'Search',
    icon: IconTypes.Sort,
  };
