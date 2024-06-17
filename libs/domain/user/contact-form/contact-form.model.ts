import { FormFieldDefinition, FormFieldType } from '@oryx-frontend/form';

export const fields: FormFieldDefinition[] = [
  {
    id: 'firstName',
    type: FormFieldType.Text,
    label: 'First Name',
  },
  {
    id: 'lastName',
    type: FormFieldType.Text,
    label: 'Last Name',
  },
  {
    id: 'email',
    type: FormFieldType.Email,
    label: 'Email',
    required: true,
    width: 100,
  },
];
