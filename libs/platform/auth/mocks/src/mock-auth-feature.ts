import {
  authLoginComponent,
  loginLinkComponent,
  oauthHandlerComponent,
} from '@oryx-frontend/auth';
import { AppFeature } from '@oryx-frontend/core';
import { Provider } from '@oryx-frontend/di';
import { ComponentsInfo } from '@oryx-frontend/utilities';
import { mockAuthProviders } from './mock-auth.providers';

export class MockAuthFeature implements AppFeature {
  components: ComponentsInfo = [
    authLoginComponent,
    loginLinkComponent,
    oauthHandlerComponent,
  ];

  providers: Provider[] = [...mockAuthProviders];
}
