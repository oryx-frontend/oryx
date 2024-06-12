import { ContentComponentSchema } from '@oryx-frontend/experience';
import { FormFieldType } from '@oryx-frontend/form';
import { IconTypes } from '@oryx-frontend/ui/icon';
import { PasswordVisibilityStrategy } from '@oryx-frontend/ui/password';
import { AuthLoginComponent } from './login.component';

export const loginComponentSchema: ContentComponentSchema<AuthLoginComponent> =
  {
    name: 'Auth Login',
    group: 'Auth',
    icon: IconTypes.Login,
    options: {
      enableRememberMe: { type: FormFieldType.Boolean },
      forgotPasswordLink: { type: FormFieldType.Boolean },
      enableRedirect: { type: FormFieldType.Boolean },
      passwordVisibility: {
        type: FormFieldType.Select,
        options: [
          { value: PasswordVisibilityStrategy.None },
          { value: PasswordVisibilityStrategy.Mousedown },
          { value: PasswordVisibilityStrategy.Click },
          { value: PasswordVisibilityStrategy.Hover },
        ],
      },
      redirectUrl: { type: FormFieldType.Text },
    },
  };
