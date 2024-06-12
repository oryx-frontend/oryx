import { ContentComponentSchema } from '@oryx-frontend/experience';
import { FormFieldType } from '@oryx-frontend/form';
import { UserAddressEditButtonComponent } from './address-edit-button.component';

export const userAddressEditTriggerSchema: ContentComponentSchema<UserAddressEditButtonComponent> =
  {
    name: 'Address Edit Button',
    group: 'User',
    icon: 'edit',
    options: {
      target: {
        type: FormFieldType.Select,
        options: [{ value: 'link' }, { value: 'modal' }, { value: 'inline' }],
      },
    },
  };
