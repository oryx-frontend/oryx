import {
  AuthService,
  AuthTokenService,
  IdentityService,
} from '@oryx-frontend/auth';
import { inject, Provider } from '@oryx-frontend/di';
import { MockAuthService } from './mock-auth.service';

export const mockAuthProviders: Provider[] = [
  { provide: MockAuthService, useClass: MockAuthService },
  { provide: AuthService, useFactory: () => inject(MockAuthService) },
  {
    provide: AuthTokenService,
    useFactory: () => inject(MockAuthService),
  },
  { provide: IdentityService, useFactory: () => inject(MockAuthService) },
];
