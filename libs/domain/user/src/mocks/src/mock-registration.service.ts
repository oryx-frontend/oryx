import { RegistrationService, User } from '@oryx-frontend/user';
import { Observable, of } from 'rxjs';

export class MockRegistrationService implements RegistrationService {
  register(data: User): Observable<unknown> {
    return of(null);
  }
}
