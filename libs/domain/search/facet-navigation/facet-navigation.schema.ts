import { ContentComponentSchema } from '@oryx-frontend/experience';
import { FormFieldType } from '@oryx-frontend/form';
import { IconTypes } from '@oryx-frontend/ui/icon';
import { SearchFacetNavigationComponent } from './facet-navigation.component';

export const searchFacetNavigationSchema: ContentComponentSchema<SearchFacetNavigationComponent> =
  {
    name: 'Facets Navigation',
    group: 'Search',
    icon: IconTypes.Filters,
    options: {
      expandedItemsCount: {
        type: FormFieldType.Number,
      },
      valueRenderLimit: {
        type: FormFieldType.Number,
      },
      minForSearch: {
        type: FormFieldType.Number,
      },
    },
  };
