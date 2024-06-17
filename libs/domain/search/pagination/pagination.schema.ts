import { ContentComponentSchema } from '@oryx-frontend/experience';
import { FormFieldType } from '@oryx-frontend/form';
import { IconTypes } from '@oryx-frontend/ui/icon';
import { SearchPaginationComponent } from './pagination.component';

export const searchPaginationComponentSchema: ContentComponentSchema<SearchPaginationComponent> =
  {
    name: 'Pagination',
    group: 'Search',
    icon: IconTypes.ArrowsOutward,
    options: {
      max: {
        type: FormFieldType.Number,
        label: 'Max number of visible pages',
        width: 100,
      },
      enableControls: {
        type: FormFieldType.Boolean,
      },
    },
  };
