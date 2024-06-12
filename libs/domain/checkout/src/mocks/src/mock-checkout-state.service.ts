import { DefaultCheckoutStateService } from '@oryx-frontend/checkout/services';
import { StorageService } from '@oryx-frontend/core';
import { inject } from '@oryx-frontend/di';
import { Observable, of } from 'rxjs';

class MockStorageService implements StorageService {
  get(): Observable<any> {
    return of('');
  }
  set(): Observable<void> {
    return of();
  }
  remove(): Observable<void> {
    return of();
  }
  clear(): Observable<void> {
    return of();
  }
}

export class MockCheckoutStateService extends DefaultCheckoutStateService {
  constructor(protected storage = inject(MockStorageService)) {
    super();
  }
}
