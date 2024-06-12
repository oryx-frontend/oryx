import { ContentComponentSchema } from '@oryx-frontend/experience';
import { FormFieldType } from '@oryx-frontend/form';
import { IconTypes } from '@oryx-frontend/ui/icon';
import { LoginLinkComponent } from './login-link.component';

export const loginLinkComponentSchema: ContentComponentSchema<LoginLinkComponent> =
  {
    name: 'Login Link',
    group: 'Auth',
    icon: IconTypes.Input,
    options: {
      logoutRedirectUrl: {
        type: FormFieldType.Text,
      },
    },
  };
