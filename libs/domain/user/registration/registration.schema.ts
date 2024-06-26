import { ContentComponentSchema } from '@oryx-frontend/experience';
import { FormFieldType } from '@oryx-frontend/form';
import { IconTypes } from '@oryx-frontend/ui/icon';
import { PasswordVisibilityStrategy } from '@oryx-frontend/ui/password';
import { UserRegistrationComponent } from './registration.component';

export const registrationComponentSchema: ContentComponentSchema<UserRegistrationComponent> =
  {
    name: 'Auth Registration',
    group: 'Auth',
    icon: IconTypes.Login,
    options: {
      passwordVisibility: {
        type: FormFieldType.Select,
        options: [
          { value: PasswordVisibilityStrategy.None },
          { value: PasswordVisibilityStrategy.Mousedown },
          { value: PasswordVisibilityStrategy.Click },
          { value: PasswordVisibilityStrategy.Hover },
        ],
      },
      minLength: { type: FormFieldType.Number },
      maxLength: { type: FormFieldType.Number },
      minUppercaseChars: { type: FormFieldType.Number },
      minNumbers: { type: FormFieldType.Number },
      minSpecialChars: { type: FormFieldType.Number },
    },
  };
