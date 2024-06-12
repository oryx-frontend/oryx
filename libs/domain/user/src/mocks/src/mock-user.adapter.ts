import { User, UserAdapter } from '@oryx-frontend/user';
import { Observable, of } from 'rxjs';
import { mockUser } from './mock-user';

export class MockDefaultUserAdapter implements UserAdapter {
  get(): Observable<User> {
    return of(mockUser);
  }
}
