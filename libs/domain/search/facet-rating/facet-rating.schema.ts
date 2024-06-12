import { ContentComponentSchema } from '@oryx-frontend/experience';
import { FormFieldType } from '@oryx-frontend/form';
import { IconTypes } from '@oryx-frontend/ui/icon';
import { SearchRatingFacetComponent } from './facet-rating.component';

export const facetRatingComponentSchema: ContentComponentSchema<SearchRatingFacetComponent> =
  {
    name: 'Site search',
    group: 'Search',
    icon: IconTypes.Search,
    options: {
      min: {
        type: FormFieldType.Number,
        min: 1,
      },
      max: {
        type: FormFieldType.Number,
      },
      scale: {
        type: FormFieldType.Number,
      },
    },
  };
