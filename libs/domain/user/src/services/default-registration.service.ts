import { resolve } from '@oryx-frontend/di';
import { User } from '@oryx-frontend/user';
import { Observable } from 'rxjs';
import { RegistrationAdapter } from './adapter/registration.adapter';
import { RegistrationService } from './registration.service';

export class DefaultRegistrationService implements RegistrationService {
  constructor(protected adapter = resolve(RegistrationAdapter)) {}

  register(data: User): Observable<unknown> {
    return this.adapter.register({ ...data, confirmPassword: data.password });
  }
}
