import { ContentComponentSchema } from '@oryx-frontend/experience';
import { Position } from '@oryx-frontend/ui';
export const schema: ContentComponentSchema = {
  name: 'dropdown',
  group: 'layout',
  options: {
    dropdownPosition: {
      key: '',
      label: 'Position',
      type: 'select',
      options: [
        {
          value: Position.Start,
        },
        {
          value: Position.End,
        },
      ],
    },
    dropdownOnHover: {
      label: 'Show on hover',
      type: 'boolean',
    },
  },
};
