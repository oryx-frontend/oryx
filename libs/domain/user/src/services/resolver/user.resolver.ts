import {
  BaseResolver,
  ResolvedToken,
  Resolver,
  TokenResourceResolvers,
} from '@oryx-frontend/core';
import { Provider, inject, resolve } from '@oryx-frontend/di';
import { featureVersion } from '@oryx-frontend/utilities';
import { map } from 'rxjs';
import { UserService } from '..';

export type UserResolvers = {
  NAME: Resolver;
  AUTHENTICATED: Resolver;
};

export class UserResolver extends BaseResolver<UserResolvers> {
  protected userService = inject(UserService);
  protected user$ = (featureVersion >= '1.1'
    ? this.userService
    : resolve(UserService)
  ).getUser();

  protected resolvers: UserResolvers = {
    NAME: (): ResolvedToken =>
      this.user$.pipe(map((user) => user?.firstName ?? '')),
    AUTHENTICATED: (): ResolvedToken => this.user$.pipe(map((user) => !!user)),
  };
}

export const UserResourceResolver: Provider = {
  provide: `${TokenResourceResolvers}USER`,
  useClass: UserResolver,
};
