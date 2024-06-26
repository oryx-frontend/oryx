import { ContentComponentSchema } from '@oryx-frontend/experience';
import { FormFieldType } from '@oryx-frontend/form';
import { UserAddressListComponent } from './address-list.component';

export const userAddressListSchema: ContentComponentSchema<UserAddressListComponent> =
  {
    name: 'Address List',
    group: 'User',
    icon: 'import_contacts',
    options: {
      addressDefaults: {
        type: FormFieldType.Select,
        options: [
          { value: 'all' },
          { value: 'shipping' },
          { value: 'billing' },
        ],
        width: 100,
      },
      removable: { type: FormFieldType.Boolean },
      selectable: { type: FormFieldType.Boolean },
      editable: { type: FormFieldType.Boolean },
      editTarget: {
        type: FormFieldType.Select,
        options: [{ value: 'link' }, { value: 'modal' }, { value: 'inline' }],
        width: 100,
      },
    },
  };
