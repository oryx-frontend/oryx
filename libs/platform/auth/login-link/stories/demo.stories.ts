import { MockAuthService } from '@oryx-frontend/auth/mocks';
import { resolve } from '@oryx-frontend/di';
import { ButtonSize } from '@oryx-frontend/ui/button';
import { Meta, Story } from '@storybook/web-components';
import { TemplateResult, html } from 'lit';
import { take } from 'rxjs';
import { storybookPrefix } from '../../.constants';
import { LoginLinkOptions } from '../login-link.model';

export default {
  title: `${storybookPrefix}/Login Link`,
  args: {
    enableLogout: true,
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
} as Meta;

const toggleLogin = () => {
  const service = resolve(MockAuthService);
  service
    .isAuthenticated()
    .pipe(take(1))
    .subscribe((isAuthenticated) => service.setAuthenticated(!isAuthenticated));
};

const Template: Story<LoginLinkOptions> = (options): TemplateResult => {
  return html`
    <oryx-button .size=${ButtonSize.Sm} @click=${toggleLogin}
       style="display: block;margin-bottom: 16px" >
        Toggle auth state
      </button>
    </oryx-button>

    <div @click=${toggleLogin}>
      <oryx-auth-login-link .options=${options}></oryx-auth-login-link>
    </div>
  `;
};

export const Demo = Template.bind({});
