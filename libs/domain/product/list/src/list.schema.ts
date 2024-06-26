import { ContentComponentSchema } from '@oryx-frontend/experience';
import { FormFieldType } from '@oryx-frontend/form';
import { SortParamNames } from '@oryx-frontend/product';
import { IconTypes } from '@oryx-frontend/ui/icon';
import { ProductListComponent } from './list.component';

export const productListSchema: ContentComponentSchema<ProductListComponent> = {
  name: 'Product List',
  group: 'Product',
  icon: IconTypes.ViewList,
  options: {
    heading: { type: FormFieldType.Text, label: 'List heading', width: 100 },

    q: { type: FormFieldType.Text, label: 'Search query', width: 100 },
    category: { type: FormFieldType.Text },
    brand: { type: FormFieldType.Text },

    minPrice: { type: FormFieldType.Number },
    maxPrice: { type: FormFieldType.Number },

    minRating: { type: FormFieldType.Number },
    weight: { type: FormFieldType.Text },
    color: { type: FormFieldType.Text },

    sort: {
      type: FormFieldType.Select,
      options: Object.values(SortParamNames).map((value) => ({ value })),
    },
    page: { type: FormFieldType.Number },
    ipp: {
      type: FormFieldType.Select,
      options: [{ value: '12' }, { value: '24' }, { value: '36' }],
      label: 'Items per page',
    },
  },
};
