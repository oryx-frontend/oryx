import { ContentComponentSchema } from '@oryx-frontend/experience';
import { FormFieldType } from '@oryx-frontend/form';
import { IconTypes } from '@oryx-frontend/ui/icon';
import { SuggestionField } from '../src/services';
import { SearchBoxComponent } from './box.component';

export const searchBoxComponentSchema: ContentComponentSchema<SearchBoxComponent> =
  {
    name: 'Site search',
    group: 'Search',
    icon: IconTypes.Search,
    options: {
      minChars: {
        type: FormFieldType.Number,
        min: 0,
      },
      float: {
        type: FormFieldType.Boolean,
      },
      // TODO: improve form for object options
      [`${SuggestionField.Suggestions}Count`]: {
        type: FormFieldType.Number,
        min: 0,
      },
      [`${SuggestionField.Products}Count`]: {
        type: FormFieldType.Number,
        min: 0,
      },
      [`${SuggestionField.Categories}Count`]: {
        type: FormFieldType.Number,
        min: 0,
      },
      [`${SuggestionField.Contents}Count`]: {
        type: FormFieldType.Number,
        min: 0,
      },
    },
  };
