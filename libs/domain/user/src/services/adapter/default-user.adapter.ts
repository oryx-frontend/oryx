import { IdentityService } from '@oryx-frontend/auth';
import { HttpService, JsonAPITransformerService } from '@oryx-frontend/core';
import { inject } from '@oryx-frontend/di';
import { ApiUserModel, User } from '@oryx-frontend/user';
import { Observable, switchMap, take } from 'rxjs';
import { UserNormalizer } from './normalizers/user';
import { UserAdapter } from './user.adapter';

export class DefaultUserAdapter implements UserAdapter {
  constructor(
    protected identityService = inject(IdentityService),
    protected SCOS_BASE_URL = inject('SCOS_BASE_URL'),
    protected transformer = inject(JsonAPITransformerService),
    protected httpService = inject(HttpService)
  ) {}

  get(): Observable<User> {
    return this.identityService.get().pipe(
      take(1),
      switchMap((identity) =>
        this.httpService.get<ApiUserModel.Response>(
          `${this.SCOS_BASE_URL}/customers/${identity.userId}`
        )
      ),
      this.transformer.do(UserNormalizer)
    );
  }
}
